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
// A abertura desta página não usa o PageHero compartilhado: a prancha de
// aquarela pede um cabeçalho próprio. O PageHero segue intacto em O Clube e
// Experiência.
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
