/**
 * Prepara os assets ilustrados da seção "O Espaço".
 *
 * As pranchas vêm como slides 1777x2369 com a ilustração centrada num campo de
 * papel e muita margem morta. Recortar pela margem real é o que permite usá-las
 * grandes sem desperdiçar viewport.
 *
 * `trim()` do sharp não serve: a textura do papel gera ruído acima de qualquer
 * limiar seguro. Aqui a caixa de conteúdo é detectada por distância de cor até
 * o papel, com um mínimo de pixels por linha/coluna para ignorar granulado.
 */
import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ORIGEM = '/home/ian/Downloads/espaços clube-20260817T212011Z-1-001/espaços clube'
const DESTINO = new URL('../src/assets/espaco/', import.meta.url).pathname

// O celular renderiza estas pranchas num slot de ~300 a 380 px. Servir só o
// arquivo grande faz o aparelho baixar de 1,7x a 2,5x mais pixels do que a tela
// mostra. Cada prancha sai em três larguras e o `srcset` deixa o navegador
// escolher: 480 cobre 1dpr, 768 cobre 2dpr, e a maior serve tablet, desktop e
// telas de densidade alta.
//
// A largura entra no nome do arquivo porque é ela que vira o descritor `w` do
// srcset — assim o catálogo em src/data/pranchas.js se monta sozinho a partir
// dos arquivos, sem uma segunda lista para manter em dia.
const LARGURAS_EXTRA = [480, 768]

// distancia: quão diferente do papel um pixel precisa ser para contar como tinta
// minPix: quantos pixels de tinta uma linha/coluna precisa ter para entrar na caixa
// `distancia` calibrada por prancha: abaixo de ~60 o granulado do papel entra
// na caixa e o recorte devolve a folha inteira.
const PRANCHAS = [
  { src: 'lugares/3a (4).png', out: 'tenis', distancia: 75, minPix: 7, margem: 0.06 },
  { src: 'lugares/2a (2).png', out: 'padel', distancia: 75, minPix: 7, margem: 0.06 },
  { src: 'lugares/1a (2).png', out: 'cafe', distancia: 75, minPix: 7, margem: 0.06 },
  { src: 'lugares/3a (3).png', out: 'giardino', distancia: 75, minPix: 7, margem: 0.06 },
  // As duas aquarelas de página inteira ocupam a folha toda e a textura do
  // papel comprime mal: a 1600px passavam de 800 KB cada. A 1400px o slot
  // renderizado (~740px) ainda recebe quase 2x, e o peso cai pela metade.
  { src: '1a (3).png', out: 'abertura', distancia: 45, minPix: 7, margem: 0.03, largura: 1400, qWebp: 82, qAvif: 55 },
  { src: '1w (1).png', out: 'quadra-coberta', distancia: 45, minPix: 7, margem: 0.02, largura: 1400, qWebp: 82, qAvif: 55 },
  { src: 'slide 130.png', out: 'planta', distancia: 40, minPix: 6, margem: 0.02 },
]

async function corDoPapel(img) {
  const { data, info } = await img.clone().extract({ left: 4, top: 4, width: 40, height: 40 }).raw().toBuffer({ resolveWithObject: true })
  const soma = [0, 0, 0]
  const n = info.width * info.height
  for (let i = 0; i < n; i++) for (let c = 0; c < 3; c++) soma[c] += data[i * info.channels + c]
  return soma.map((s) => s / n)
}

async function caixaDeConteudo(img, papel, distancia, minPix) {
  const { data, info } = await img.clone().raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h, channels: ch } = info
  const linhas = new Uint32Array(h)
  const colunas = new Uint32Array(w)

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * ch
      const d = Math.abs(data[i] - papel[0]) + Math.abs(data[i + 1] - papel[1]) + Math.abs(data[i + 2] - papel[2])
      if (d > distancia) {
        linhas[y]++
        colunas[x]++
      }
    }
  }

  const primeiro = (arr) => arr.findIndex((v) => v >= minPix)
  const ultimo = (arr) => {
    for (let i = arr.length - 1; i >= 0; i--) if (arr[i] >= minPix) return i
    return -1
  }

  const top = primeiro(linhas)
  const bottom = ultimo(linhas)
  const left = primeiro(colunas)
  const right = ultimo(colunas)
  if (top < 0 || left < 0) return null
  return { left, top, width: right - left + 1, height: bottom - top + 1 }
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

async function run() {
  await mkdir(DESTINO, { recursive: true })

  for (const p of PRANCHAS) {
    const entrada = path.join(ORIGEM, p.src)
    const img = sharp(entrada)
    const meta = await img.metadata()
    const papel = await corDoPapel(img)
    const caixa = await caixaDeConteudo(img, papel, p.distancia, p.minPix)
    if (!caixa) {
      console.log(`· ${p.out}: não achei conteúdo, pulando`)
      continue
    }

    // respiro proporcional em volta da arte
    const folga = Math.round(Math.max(caixa.width, caixa.height) * p.margem)
    const rec = {
      left: Math.max(0, caixa.left - folga),
      top: Math.max(0, caixa.top - folga),
      width: Math.min(meta.width, caixa.width + folga * 2),
      height: Math.min(meta.height, caixa.height + folga * 2),
    }
    rec.width = Math.min(rec.width, meta.width - rec.left)
    rec.height = Math.min(rec.height, meta.height - rec.top)

    const recortada = sharp(entrada).extract(rec)
    const maior = await recortada
      .clone()
      .resize({ width: p.largura ?? 1600, withoutEnlargement: true })
      .toBuffer()
    const larguraMaior = (await sharp(maior).metadata()).width

    // Nunca ampliar: uma variante mais larga que o recorte só repetiria bytes.
    const larguras = [...new Set([...LARGURAS_EXTRA, larguraMaior])]
      .filter((l) => l <= larguraMaior)
      .sort((a, b) => a - b)

    const linhas = []
    for (const largura of larguras) {
      const nomeWebp = `${p.out}-${largura}.webp`
      const nomeAvif = `${p.out}-${largura}.avif`
      const redim = sharp(maior).resize({ width: largura, withoutEnlargement: true })
      await redim.clone().webp({ quality: p.qWebp ?? 86, effort: 6 }).toFile(path.join(DESTINO, nomeWebp))
      await redim.clone().avif({ quality: p.qAvif ?? 62, effort: 5 }).toFile(path.join(DESTINO, nomeAvif))
      linhas.push(
        `${String(largura).padStart(5)}w  webp ${kb((await stat(path.join(DESTINO, nomeWebp))).size).padStart(7)}` +
          ` · avif ${kb((await stat(path.join(DESTINO, nomeAvif))).size).padStart(7)}`,
      )
    }

    const antes = (await stat(entrada)).size
    console.log(`✓ ${p.out.padEnd(15)} ${meta.width}x${meta.height} → recorte ${larguraMaior}px  (origem ${kb(antes)})`)
    linhas.forEach((l) => console.log(`     ${l}`))
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
