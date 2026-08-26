import AberturaEspaco from '../components/espaco/AberturaEspaco'
import PlantaIndice from '../components/espaco/PlantaIndice'
import PercursoEspacos from '../components/espaco/PercursoEspacos'
import FechoEspaco from '../components/espaco/FechoEspaco'
import Exclusivity from '../components/Exclusivity'

// "O Espaço" como percurso, não como lista de características.
//
// O ritmo alterna o campo claro do papel das pranchas com o navy da planta e do
// bloco de acesso: chegar (claro) → ver o terreno (escuro) → percorrer os quatro
// ambientes (claro) → entender como se entra (escuro) → sair com a atmosfera
// (claro). Cada imagem assenta no fundo em que foi pintada.
//
// A abertura desta página tem componente próprio, e não o `AberturaPagina` das
// outras duas: lá a matéria é fotografia, que sangra até a borda e se dissolve
// no campo; aqui é aquarela sobre papel, que precisa caber inteira e assentar
// sem corte. Foi esta abertura que deu o desenho às outras.
export default function OEspaco() {
  return (
    <>
      <AberturaEspaco />
      <PlantaIndice />
      <PercursoEspacos />
      <Exclusivity />
      <FechoEspaco />
    </>
  )
}
