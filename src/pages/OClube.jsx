import AberturaPagina from '../components/AberturaPagina'
import { marca } from '../data/heroi'
import Philosophy from '../components/Philosophy'
import Elenco from '../components/clube/Elenco'
import EstiloDeVida from '../components/clube/EstiloDeVida'
import FechoClube from '../components/clube/FechoClube'

// "O Clube" como quem o clube é, em três respostas seguidas: de onde vem o
// nome, quem ensina, e o que o Sette entende por clube.
//
// O ritmo alterna o campo a cada seção, como em "O Espaço": cal aquecida na
// abertura → cal na origem do nome → crepúsculo no elenco → cal aquecida no
// propósito → crepúsculo no fecho. A troca de fundo é o que separa uma seção
// da outra; não há divisor entre elas além do filete.
//
// A abertura é clara porque o brasão está gravado em barro: sob véu navy ele
// perderia a única coisa que a imagem tem para mostrar. Cal aquecida e cal são
// vizinhas de propósito — é para isso que o segundo campo claro existe —, e o
// que separa as duas seções é a coluna de imagem descendo até a base da
// primeira.
//
// O elenco é carrossel porque o material pede sequência, não grade: as fichas
// têm de quatro a seis credenciais cada, e um cartão por pessoa comprimiria o
// conteúdo até sobrar só o nome.
export default function OClube() {
  return (
    <>
      <AberturaPagina
        campo="claro"
        eyebrow="O Clube"
        titulo={
          <>
            A história
            <br />
            por trás
            <br />
            do Sette
          </>
        }
        texto="Um nome que veio do italiano, um símbolo que veio do jogo e um elenco que veio da quadra. O Sette começa nessas três coisas."
        imagem={marca}
      />
      <Philosophy />
      <Elenco />
      <EstiloDeVida />
      <FechoClube />
    </>
  )
}
