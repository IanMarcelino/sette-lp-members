import { catalogar } from './imagens'

const heroi = catalogar(
  import.meta.glob('../assets/heroi/*.{avif,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)

/**
 * As imagens de abertura das páginas internas.
 *
 * Escolha de material, não de ilustração de apoio:
 *
 * **marca** é o brasão gravado no saibro. É o ativo mais próprio do clube — o
 * único que nenhum concorrente teria — e "O Clube" é justamente a página do
 * nome e do símbolo. Abrir com o símbolo impresso na matéria é a página
 * dizendo a própria tese antes do primeiro parágrafo.
 *
 * **lounge** é o projeto da área de estar, com as quadras vistas pelo vidro.
 * É render de arquitetura, não fotografia do clube construído, e por isso o
 * texto alternativo diz "projeto". A Home já abre com a área social e a vista
 * aérea; usar o lounge aqui evita repetir a mesma imagem em duas aberturas.
 */
export const marca = {
  ...heroi('marca'),
  w: 1100,
  h: 1100,
  alt: 'O brasão do Sette Racket Club gravado no saibro de uma quadra, com duas bolas de tênis próximas',
}

export const lounge = {
  ...heroi('lounge'),
  w: 2400,
  h: 1340,
  alt: 'Projeto do lounge do Sette: sofás baixos, mesa de mármore e as quadras vistas pelo fechamento de vidro',
}
