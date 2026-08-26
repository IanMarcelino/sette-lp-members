/**
 * Prepara os dois conjuntos de assets em que aparece gente: as aquarelas de
 * "Um dia no Sette", em Experiência, e os retratos do elenco, em O Clube.
 *
 * São materiais de naturezas diferentes, e cada um precisa de um recorte
 * próprio:
 *
 * 1. As **aquarelas de pessoas** (`ppl/`) vêm como slides 1777x2369 com a
 *    figura pequena no meio de uma folha de papel quase vazia. Elas foram
 *    pintadas na mesma folha e na mesma escala umas das outras, então o recorte
 *    é o MESMO retângulo para as quatro — recortar cada uma pela sua própria
 *    caixa de conteúdo destruiria a relação de escala e a linha de chão que as
 *    faz funcionar como sequência. O papel remanescente assenta sobre `paper`
 *    (#F5EEDC) sem borda visível: o papel do original mede #F8F0DF, a três
 *    pontos de distância em cada canal.
 *
 * 2. Os **retratos do elenco** (`professores/`) já vêm recortados sobre um
 *    losango branco com fundo transparente. Aqui só se corta a moldura vazia
 *    em volta do alfa — as cinco caixas resultam em 2001x2000, o que mantém os
 *    losangos do mesmo tamanho no trilho de seleção. O alfa é preservado na
 *    saída: é ele que faz o losango pousar sobre o navy sem retângulo.
 *
 * A largura entra no nome do arquivo porque é ela que vira o descritor `w` do
 * srcset — o catálogo em src/data/ se monta sozinho a partir dos arquivos,
 * sem uma segunda lista para manter em dia. É a mesma convenção de
 * `prepare-espaco.mjs`.
 */
import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ORIGEM = 'C:/Users/User/Desktop/Voltz/SetteClub'
const AQUARELAS = path.join(ORIGEM, 'ppl-20260826T183513Z-1-001/ppl')
const RETRATOS = path.join(ORIGEM, 'professores-20260826T183513Z-1-001/professores')

const DESTINO_FIGURAS = fileURLToPath(new URL('../src/assets/tempos/', import.meta.url))
const DESTINO_ELENCO = fileURLToPath(new URL('../src/assets/elenco/', import.meta.url))

// Caixa comum às quatro aquarelas, em coordenadas da folha original.
// Contém as quatro caixas de conteúdo medidas — a mais larga é o padel, de 321
// a 1385; a mais alta é o saque, de 471 a 1868 — com uma margem estreita.
// Ela é estreita de propósito: como o papel remanescente é invisível sobre o
// campo da seção, cada pixel de margem só encolhe a figura dentro do slot.
const CAIXA_AQUARELA = { left: 305, top: 455, width: 1095, height: 1430 }

// O campo `paper` do site, para onde o papel das aquarelas é calibrado.
const PAPEL_DO_SITE = [0xf5, 0xee, 0xdc]

// O slot renderizado vai de ~340px no celular a ~470px no desktop. 440 cobre
// 1dpr, 700 cobre a maioria dos 2dpr e 1000 serve tela densa e tablet.
const FIGURAS = [
  { src: '3a (8).png', out: 'chegada' },
  { src: '3a (5).png', out: 'saque' },
  { src: '3a (7).png', out: 'padel' },
  { src: '3a (6).png', out: 'mesa' },
]
const LARGURAS_FIGURA = [440, 700, 1000]

// 200 é a miniatura do trilho (88px a 2dpr), 480 e 880 são o retrato em
// destaque em 1dpr e 2dpr.
const ELENCO = [
  { src: 'Group 128.png', out: 'ednardo' },
  { src: 'Group 143.png', out: 'luciano' },
  { src: 'Group 168.png', out: 'danilo' },
  { src: 'Group 175.png', out: 'alexandre' },
  { src: 'Group 142.png', out: 'alberto' },
]
const LARGURAS_RETRATO = [200, 480, 880]

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

/**
 * Cor média da borda de uma imagem já recortada.
 *
 * Nas aquarelas a moldura de 8px em volta do recorte é papel puro — nenhuma
 * figura chega tão perto da margem. É a leitura mais confiável do papel real
 * daquele arquivo, e é dela que sai o fator de calibragem.
 */
async function corDaBorda(img, faixa = 8) {
  const { data, info } = await img.clone().raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h, channels: ch } = info
  const soma = [0, 0, 0]
  let n = 0

  for (let y = 0; y < h; y++) {
    const naFaixaVertical = y < faixa || y >= h - faixa
    for (let x = 0; x < w; x++) {
      if (!naFaixaVertical && x >= faixa && x < w - faixa) continue
      const i = (y * w + x) * ch
      for (let c = 0; c < 3; c++) soma[c] += data[i + c]
      n++
    }
  }

  return soma.map((s) => s / n)
}

/** Caixa de conteúdo pelo canal alfa: a menor moldura que contém tinta. */
async function caixaPorAlfa(img, minAlfa = 12, minPix = 4) {
  const { data, info } = await img.clone().ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h, channels: ch } = info
  const linhas = new Uint32Array(h)
  const colunas = new Uint32Array(w)

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * ch + 3] > minAlfa) {
        linhas[y]++
        colunas[x]++
      }
    }
  }

  const primeiro = (a) => a.findIndex((v) => v >= minPix)
  const ultimo = (a) => {
    for (let i = a.length - 1; i >= 0; i--) if (a[i] >= minPix) return i
    return -1
  }

  const top = primeiro(linhas)
  const left = primeiro(colunas)
  return { left, top, width: ultimo(colunas) - left + 1, height: ultimo(linhas) - top + 1 }
}

/** Escreve as variantes de uma imagem já recortada. */
async function escrever(base, destino, nome, larguras, { qWebp, qAvif }) {
  let total = 0
  for (const largura of larguras) {
    const redim = base.clone().resize({ width: largura, withoutEnlargement: true })
    const webp = path.join(destino, `${nome}-${largura}.webp`)
    const avif = path.join(destino, `${nome}-${largura}.avif`)
    await redim.clone().webp({ quality: qWebp, effort: 6, alphaQuality: 90 }).toFile(webp)
    await redim.clone().avif({ quality: qAvif, effort: 5 }).toFile(avif)
    total += (await stat(avif)).size
  }
  return total
}

async function run() {
  await mkdir(DESTINO_FIGURAS, { recursive: true })
  await mkdir(DESTINO_ELENCO, { recursive: true })

  let total = 0

  for (const f of FIGURAS) {
    // `flatten` sobre o próprio papel: os PNGs vêm com canal alfa, e sem isso
    // o WebP guardaria uma camada de transparência que ninguém usa.
    const recorte = sharp(path.join(AQUARELAS, f.src))
      .extract(CAIXA_AQUARELA)
      .flatten({ background: '#f8f0df' })

    // O papel do original mede ~#F8F0DF e o campo da seção é #F5EEDC. Três
    // pontos por canal parecem nada em número e aparecem na tela como um
    // retângulo claro em volta da figura — o mesmo problema que fez "O Espaço"
    // adotar o papel das pranchas como cor de seção. Aqui a correção vai na
    // imagem: um ganho por canal que leva o papel medido exatamente ao token
    // do site. Como é multiplicativo, o preto continua preto e a figura escurece
    // 1% — abaixo do que o olho separa.
    const papel = await corDaBorda(recorte)
    const ganho = PAPEL_DO_SITE.map((alvo, c) => alvo / papel[c])
    const base = recorte.clone().linear(ganho, [0, 0, 0])

    const peso = await escrever(base, DESTINO_FIGURAS, f.out, LARGURAS_FIGURA, {
      qWebp: 82,
      qAvif: 58,
    })
    total += peso
    console.log(`✓ aquarela ${f.out.padEnd(10)} ${kb(peso).padStart(9)} em AVIF (3 larguras)`)
  }

  for (const p of ELENCO) {
    const origem = sharp(path.join(RETRATOS, p.src))
    const caixa = await caixaPorAlfa(origem)
    const base = origem.clone().extract(caixa)

    const peso = await escrever(base, DESTINO_ELENCO, p.out, LARGURAS_RETRATO, {
      qWebp: 80,
      qAvif: 55,
    })
    total += peso
    console.log(
      `✓ retrato  ${p.out.padEnd(10)} ${kb(peso).padStart(9)} em AVIF (3 larguras) · caixa ${caixa.width}x${caixa.height}`,
    )
  }

  console.log(`\nTotal em AVIF: ${kb(total)}`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
