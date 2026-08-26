/**
 * Prepara as imagens de abertura de "O Clube" e "Experiência".
 *
 * Numa abertura a imagem ocupa mais da metade de uma tela larga — perto de
 * 900px de slot — e precisa de `srcset` próprio. Nenhuma das duas origens
 * estava dimensionada para isso.
 *
 * **marca** é o brasão gravado no saibro: o ativo mais próprio do clube e o
 * único que nenhum concorrente teria. Nasce quadrado e a 1100px, então é essa a
 * largura máxima possível — reamostrar para cima só inventaria pixel.
 *
 * **lounge** sai do `carousel-3.webp` que já estava no repositório. Reencodar
 * WebP a partir de WebP perde um pouco, mas a origem está em qualidade alta e o
 * destino é atmosfera sob véu, não documento.
 */
import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ASSETS = fileURLToPath(new URL('../src/assets/', import.meta.url))
const DESTINO = fileURLToPath(new URL('../src/assets/heroi/', import.meta.url))

const IMAGENS = [
  // Coluna de ~58vw numa tela larga: 900 cobre 1dpr com folga e 1100 é o teto
  // do original. 560 serve o celular, onde a imagem é uma faixa larga.
  { origem: path.join(ASSETS, 'clube.webp'), nome: 'marca', larguras: [560, 900, 1100] },
  // O lounge é 2400x1340 e sobra resolução: aqui a coluna pede 900 em 1dpr e
  // 1800 em 2dpr.
  { origem: path.join(ASSETS, 'carousel-3.webp'), nome: 'lounge', larguras: [900, 1400, 2000] },
]

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

async function run() {
  await mkdir(DESTINO, { recursive: true })

  for (const img of IMAGENS) {
    const original = sharp(img.origem)
    const { width, height } = await original.metadata()
    const base = img.recorte ? original.extract(img.recorte) : original
    let total = 0

    for (const largura of img.larguras) {
      const redim = base.clone().resize({ width: largura, withoutEnlargement: true })
      const webp = path.join(DESTINO, `${img.nome}-${largura}.webp`)
      const avif = path.join(DESTINO, `${img.nome}-${largura}.avif`)
      await redim.clone().webp({ quality: 84, effort: 6 }).toFile(webp)
      await redim.clone().avif({ quality: 60, effort: 5 }).toFile(avif)
      total += (await stat(avif)).size
    }

    console.log(`✓ ${img.nome.padEnd(8)} ${width}x${height} → ${kb(total)} em AVIF (${img.larguras.length} larguras)`)
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
