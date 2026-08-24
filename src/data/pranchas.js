// Catálogo das pranchas ilustradas de "O Espaço".
//
// `scripts/prepare-espaco.mjs` escreve cada prancha em três larguras, com a
// largura no nome do arquivo (tenis-480.webp, tenis-768.webp, tenis-1453.webp).
// Aqui os arquivos são lidos de volta e agrupados: o nome vira a chave, a
// largura vira o descritor `w` do srcset. Não há segunda lista para manter em
// dia — acrescentar uma largura no script basta.
const urls = import.meta.glob('../assets/espaco/*.{avif,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const catalogo = {}

for (const [caminho, url] of Object.entries(urls)) {
  const achado = caminho.match(/\/([a-z-]+)-(\d+)\.(avif|webp)$/)
  if (!achado) continue
  const [, nome, largura, tipo] = achado
  catalogo[nome] ??= { avif: [], webp: [] }
  catalogo[nome][tipo].push({ url, largura: Number(largura) })
}

const porLargura = (variantes) => [...variantes].sort((a, b) => a.largura - b.largura)
const srcset = (variantes) => porLargura(variantes).map((v) => `${v.url} ${v.largura}w`).join(', ')

/**
 * Devolve os srcsets de uma prancha e o arquivo de fallback.
 *
 * O fallback é a variante mais larga: navegador que ignore srcset é raro e
 * antigo, e nesse caso é melhor entregar a imagem boa do que a pequena.
 */
export function prancha(nome) {
  const c = catalogo[nome]
  if (!c) throw new Error(`prancha desconhecida: ${nome}`)
  return {
    avif: srcset(c.avif),
    webp: srcset(c.webp),
    src: porLargura(c.webp).at(-1).url,
  }
}
