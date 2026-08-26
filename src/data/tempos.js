import { catalogar } from './imagens'

const figura = catalogar(
  import.meta.glob('../assets/tempos/*.{avif,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)

/**
 * Os quatro tempos de uma ida ao clube, na ordem em que acontecem.
 *
 * As aquarelas vêm do mesmo material de arquitetura das pranchas de "O Espaço",
 * e foram pintadas na mesma folha e na mesma escala — por isso o recorte é
 * idêntico para as quatro (ver `scripts/prepare-pessoas.mjs`). O resultado é que
 * as figuras trocam sem mudar de tamanho e sem sair da linha de chão: o que se
 * vê ao avançar o carrossel é a mesma pessoa noutro momento do dia, não quatro
 * ilustrações soltas.
 *
 * Onde as aquarelas mostram o ambiente vazio em "O Espaço", aqui elas mostram
 * quem o ocupa. É a diferença entre a planta e o dia.
 *
 * Todas compartilham a mesma caixa de 1095x1430 do recorte comum.
 */
const CAIXA = { w: 1095, h: 1430 }

export const tempos = [
  {
    id: 'chegada',
    numero: '01',
    nome: 'A chegada',
    meta: 'Antes do primeiro ponto',
    texto:
      'O clube começa antes da quadra. A recepção, o vestiário, o tempo de amarrar o tênis e olhar quem já está jogando. O esporte é o motivo de vir — não é o instante em que a visita começa.',
    alt: 'Aquarela de uma jogadora de pé, em uniforme do clube, antes de entrar em quadra',
    ...figura('chegada'),
    ...CAIXA,
  },
  {
    id: 'saque',
    numero: '02',
    nome: 'O saque',
    meta: 'Tênis · saibro',
    texto:
      'No saibro o ponto raramente se encerra num golpe só. O saque abre a jogada e a bola sobe alta; o que decide vem depois, na terceira e na quarta bola. É uma quadra que cobra leitura antes de potência.',
    alt: 'Aquarela de um tenista no alto do saque, raquete atrás da cabeça e o braço livre apontando a bola',
    ...figura('saque'),
    ...CAIXA,
  },
  {
    id: 'padel',
    numero: '03',
    nome: 'A troca',
    meta: 'Padel · duplas',
    texto:
      'No padel a parede devolve o que a quadra não segurou, e o ponto continua vivo depois do fundo. São quatro pessoas lendo ângulo ao mesmo tempo, num ritmo mais curto que o do saibro.',
    alt: 'Aquarela de um jogador de padel devolvendo a bola de direita, com a pá baixa',
    ...figura('padel'),
    ...CAIXA,
  },
  {
    id: 'mesa',
    numero: '04',
    nome: 'A mesa',
    meta: 'Casa Sette Café',
    texto:
      'Terminado o set, a conversa segue sentada. A Casa Sette atende quem sai da quadra e quem ainda vai entrar — é a hora em que o clube deixa de ser esporte e passa a ser convívio.',
    alt: 'Aquarela de um atendente do clube atravessando o salão com uma bandeja de bebidas',
    ...figura('mesa'),
    ...CAIXA,
  },
]
