import { catalogar } from './imagens'

const retrato = catalogar(
  import.meta.glob('../assets/elenco/*.{avif,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)

/**
 * O elenco do Sette Racket Club.
 *
 * Nomes, funções e credenciais vêm das fichas oficiais entregues pelo clube —
 * são fatos sobre pessoas reais e não devem ser reescritos por estilo. O que é
 * autoral aqui é só o `resumo`: uma linha na voz da marca para quem não vai ler
 * a lista inteira. A lista de credenciais fica logo abaixo, com o dado bruto.
 *
 * A ordem é por tempo de estrada, do mais longo ao mais recente. Alberto fecha
 * a lista não por isso, mas porque é o único que não dá aula de tênis: ele
 * prepara o corpo de quem joga.
 *
 * Os retratos vêm recortados sobre um losango de fundo transparente — é a
 * mesma geometria do losango a 45° que o sistema já usa como divisor, e é por
 * isso que eles assentam no navy sem moldura.
 */
export const elenco = [
  {
    id: 'ednardo',
    nome: 'Ednardo de Oliveira',
    papel: 'Treinador Master CBT',
    resumo:
      'Quarenta anos de quadra e uma metodologia própria, a EdCoach. Formou atletas, professores e campeões, e é referência nacional no tênis em cadeira de rodas.',
    credenciais: [
      'Mais de 40 anos dedicados aos esportes com raquetes',
      'Treinador Master de Tênis pela CBT',
      'Especialista em esportes adaptados, com certificação do Comitê Paralímpico Brasileiro',
      'Árbitro de grandes competições internacionais',
      'Criador da metodologia EdCoach e da metodologia Kids, de desenvolvimento infantil pelo tênis',
    ],
    w: 2001,
    h: 2001,
    ...retrato('ednardo'),
  },
  {
    id: 'luciano',
    nome: 'Luciano Ribeiro',
    papel: 'Professor e treinador de tênis',
    resumo:
      'Deu aula em academias, escolas e cursos no Brasil e em Portugal. Carrega a certificação mais alta da Confederação Brasileira e o nível 3 da ITF.',
    credenciais: [
      'Formado em Educação Física, com especialização e formação técnica em tênis',
      'Professor e treinador com experiência em diferentes níveis de jogo',
      'ITF nível 3 · International Tennis Federation',
      'CBT nível 3 — Técnico Master · Confederação Brasileira de Tênis',
      'Nível 2 FPT · Federação Portuguesa de Ténis',
      'Formação pela Escola Guga (TO/JO)',
    ],
    w: 2001,
    h: 2000,
    ...retrato('luciano'),
  },
  {
    id: 'danilo',
    nome: 'Danilo Lobão',
    papel: 'Professor de tênis e preparador físico',
    resumo:
      'Quinze anos entre iniciação, desenvolvimento e performance — da criança que nunca segurou uma raquete à equipe do Ceará em competição nacional.',
    credenciais: [
      'Mais de 15 anos de ensino e desenvolvimento pelo tênis',
      'Formado em Educação Física e pós-graduado em Biomecânica do Exercício',
      'Certificação Nível 1 da ITF',
      'Atuação em clubes, academias, condomínios e faculdades, com crianças, jovens e adultos',
      'Capitão da equipe do Ceará na Copa das Federações',
      'Organização de festivais e torneios',
    ],
    w: 2001,
    h: 2000,
    ...retrato('danilo'),
  },
  {
    id: 'alexandre',
    nome: 'Alexandre FT',
    papel: 'Professor de tênis',
    resumo:
      'Dez anos de tênis, em aula individual e em grupo. A técnica que ensina é a mesma que usa em quadra: é tricampeão de Duplas Classe A.',
    credenciais: [
      '10 anos de experiência no tênis',
      'Aulas individuais e em grupo para crianças e adultos, em diferentes níveis',
      'Ensino de técnica, fundamentos, estratégia e movimentação',
      'Cursos de aperfeiçoamento e capacitação no esporte',
      'Tricampeão de Duplas Classe A, vice-campeão da 3ª Classe e títulos na 4ª e 5ª Classes',
    ],
    w: 2001,
    h: 2000,
    ...retrato('alexandre'),
  },
  {
    id: 'alberto',
    nome: 'Alberto Araripe',
    papel: 'Preparador físico',
    resumo:
      'Cuida do corpo antes e depois do ponto. Preparação física para alto rendimento, com passagem por atletas dos circuitos USTA e ITF.',
    credenciais: [
      'Formado em Educação Física e pós-graduado em Treinamento Físico Desportivo',
      'Especialista em preparação física para atletas de alto rendimento',
      'Preparador físico da Seleção Cearense Profissional de Beach Tennis',
      'Experiência internacional com atletas nos circuitos USTA e ITF',
    ],
    w: 2001,
    h: 2000,
    ...retrato('alberto'),
  },
]
