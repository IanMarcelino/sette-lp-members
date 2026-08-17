/**
 * Converte os assets fotográficos pesados para WebP + AVIF.
 *
 * Roda sob demanda (`pnpm images`), não a cada build: reencodar 70 MB de PNG
 * em todo `vite build` deixaria o build inviável. Os arquivos gerados são
 * versionados junto do código, como já acontecia com tenis/padel/clube.webp.
 *
 * Os PNGs originais ficam em src/assets/originals/ (fora do grafo do Vite,
 * então não entram no bundle) para permitir reconversão em outra qualidade.
 */
import { readdir, mkdir, rename, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ASSETS = new URL('../src/assets/', import.meta.url).pathname
const ORIGINALS = path.join(ASSETS, 'originals')

// Largura máxima por asset — o maior slot real que cada imagem ocupa no layout,
// dobrado para telas 2x. Nada é servido acima disso, então nada acima disso é gerado.
const TARGETS = {
  'carousel-1.png': 2400, // slide full-bleed
  'carousel-2.png': 2400,
  'carousel-3.png': 2400,
  'carousel-4.png': 2400,
  'court-aerial.png': 1600, // coluna de 5/12 no desktop
  'floor-plan.png': 1400, // max-w-xl ≈ 576px de slot
  'lifestyle.png': 1600, // metade de um grid max-w-6xl
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

async function run() {
  if (!existsSync(ORIGINALS)) await mkdir(ORIGINALS, { recursive: true })

  const presentes = await readdir(ASSETS)
  let totalAntes = 0
  let totalDepois = 0

  for (const [arquivo, largura] of Object.entries(TARGETS)) {
    const origem = presentes.includes(arquivo)
      ? path.join(ASSETS, arquivo)
      : path.join(ORIGINALS, arquivo)

    if (!existsSync(origem)) {
      console.log(`· ${arquivo} — não encontrado, pulando`)
      continue
    }

    const base = arquivo.replace(/\.png$/, '')
    const antes = (await stat(origem)).size
    totalAntes += antes

    const pipeline = sharp(origem).resize({
      width: largura,
      withoutEnlargement: true,
    })

    await pipeline.clone().webp({ quality: 82, effort: 6 }).toFile(path.join(ASSETS, `${base}.webp`))
    await pipeline.clone().avif({ quality: 58, effort: 5 }).toFile(path.join(ASSETS, `${base}.avif`))

    const depoisWebp = (await stat(path.join(ASSETS, `${base}.webp`))).size
    const depoisAvif = (await stat(path.join(ASSETS, `${base}.avif`))).size
    totalDepois += depoisAvif

    // Tira o PNG do grafo do Vite para que não haja como importá-lo por engano.
    if (presentes.includes(arquivo)) {
      await rename(origem, path.join(ORIGINALS, arquivo))
    }

    console.log(
      `✓ ${base.padEnd(14)} ${kb(antes).padStart(9)} → webp ${kb(depoisWebp).padStart(8)} · avif ${kb(depoisAvif).padStart(8)}`,
    )
  }

  const reducao = (100 - (totalDepois / totalAntes) * 100).toFixed(1)
  console.log(`\nTotal: ${kb(totalAntes)} → ${kb(totalDepois)} em AVIF (−${reducao}%)`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
