import tenisAvif from '../assets/espaco/tenis.avif'
import tenisWebp from '../assets/espaco/tenis.webp'
import padelAvif from '../assets/espaco/padel.avif'
import padelWebp from '../assets/espaco/padel.webp'
import cafeAvif from '../assets/espaco/cafe.avif'
import cafeWebp from '../assets/espaco/cafe.webp'
import giardinoAvif from '../assets/espaco/giardino.avif'
import giardinoWebp from '../assets/espaco/giardino.webp'

/**
 * Os quatro ambientes de "O Espaço", na ordem do percurso.
 *
 * As pranchas axonométricas vêm do material de arquitetura do clube; a versão
 * usada aqui é a limpa, sem o texto queimado na imagem, para que nome e
 * descrição sejam HTML de verdade — legível por leitor de tela, selecionável e
 * responsivo.
 *
 * Sobre os textos: o deck original trazia descrições para Tênis, Padel e Casa
 * Sette Café, e repetia o texto do Tênis na prancha do Giardino. Os fatos
 * físicos foram preservados e verificados contra a planta (seis quadras de
 * saibro, duas de padel); o fraseado foi reescrito onde caía nas construções
 * que o briefing pediu para evitar, e o Giardino recebeu texto próprio.
 */
export const espacos = [
  {
    id: 'tenis',
    numero: '01',
    nome: 'Tênis',
    meta: 'Seis quadras · saibro',
    texto:
      'O saibro é a superfície mais lenta do jogo: a bola sobe, o ponto se alonga e a partida vira exercício de leitura e consistência. Aqui o ponto se constrói — raramente se encerra num golpe só.',
    avif: tenisAvif,
    webp: tenisWebp,
    w: 1453,
    h: 998,
    alt: 'Ilustração axonométrica de uma quadra de saibro do Sette, com bordas azuis e rede ao centro',
  },
  {
    id: 'padel',
    numero: '02',
    nome: 'Padel',
    meta: 'Duas quadras · vidro',
    texto:
      'As paredes de vidro fazem parte da quadra. A bola segue viva depois do fundo, o ponto se prolonga e a leitura de ângulo pesa mais que a potência. Jogo de duplas, ritmo curto.',
    avif: padelAvif,
    webp: padelWebp,
    w: 1359,
    h: 1079,
    alt: 'Ilustração axonométrica das duas quadras de padel do Sette, fechadas por paredes de vidro e estrutura metálica',
  },
  {
    id: 'casa-sette-cafe',
    numero: '03',
    nome: 'Casa Sette Café',
    meta: 'Gastronomia · bar',
    texto:
      'Cozinha e bar dentro do clube, com salão coberto e mesas ao ar livre. É o ponto em que quem chega e quem sai da quadra se cruzam — a parte da rotina do Sette que acontece sentado.',
    avif: cafeAvif,
    webp: cafeWebp,
    w: 1274,
    h: 1056,
    alt: 'Ilustração axonométrica do Casa Sette Café: bar envidraçado ao centro e mesas distribuídas no piso ao redor',
  },
  {
    id: 'giardino',
    numero: '04',
    nome: 'Giardino',
    meta: 'Estar · sombra',
    texto:
      'Cobertura translúcida sobre vegetação densa, com assentos à sombra e guarda-sóis. O espaço das horas em que não se joga: a espera pela quadra, a conversa que segue a partida.',
    avif: giardinoAvif,
    webp: giardinoWebp,
    w: 1525,
    h: 1165,
    alt: 'Ilustração axonométrica do Giardino: pavilhão de cobertura translúcida cercado por palmeiras e vegetação, com mesas e guarda-sóis',
  },
]
