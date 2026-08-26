/**
 * Catálogo de imagens responsivas montado a partir dos próprios arquivos.
 *
 * Os scripts de preparação (`prepare-espaco.mjs`, `prepare-pessoas.mjs`) escrevem
 * cada imagem em várias larguras, com a largura no nome do arquivo
 * (`tenis-480.webp`, `saque-700.avif`). Aqui os arquivos são lidos de volta e
 * agrupados: o nome vira a chave e a largura vira o descritor `w` do srcset.
 * Não há segunda lista para manter em dia — acrescentar uma largura no script
 * basta.
 *
 * Recebe o resultado de um `import.meta.glob` porque o Vite exige o padrão
 * literal no módulo que o chama; a montagem, que é a parte repetida, mora aqui.
 */
export function catalogar(urls) {
  const catalogo = {}

  for (const [caminho, url] of Object.entries(urls)) {
    const achado = caminho.match(/\/([a-z-]+)-(\d+)\.(avif|webp)$/)
    if (!achado) continue
    const [, nome, largura, tipo] = achado
    catalogo[nome] ??= { avif: [], webp: [] }
    catalogo[nome][tipo].push({ url, largura: Number(largura) })
  }

  const porLargura = (variantes) => [...variantes].sort((a, b) => a.largura - b.largura)
  const srcset = (variantes) =>
    porLargura(variantes)
      .map((v) => `${v.url} ${v.largura}w`)
      .join(', ')

  /**
   * Devolve os srcsets de uma imagem e o arquivo de fallback.
   *
   * O fallback é a variante mais larga: navegador que ignore srcset é raro e
   * antigo, e nesse caso é melhor entregar a imagem boa do que a pequena.
   */
  return function imagem(nome) {
    const c = catalogo[nome]
    if (!c) throw new Error(`imagem desconhecida: ${nome}`)
    return {
      avif: srcset(c.avif),
      webp: srcset(c.webp),
      src: porLargura(c.webp).at(-1).url,
    }
  }
}
