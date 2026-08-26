import { motion } from 'framer-motion'
import AberturaPagina from '../components/AberturaPagina'
import { lounge } from '../data/heroi'
import TemposDoDia from '../components/experiencia/TemposDoDia'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Grain from '../components/Grain'

const eventos = [
  { titulo: 'Torneios internos', desc: 'Competições entre membros ao longo da temporada, com ranking e premiação.' },
  { titulo: 'Clínicas e workshops', desc: 'Treinos com profissionais convidados para evoluir técnica e jogo mental.' },
  { titulo: 'Encontros sociais', desc: 'Confraternizações e encontros no lounge, entre uma partida e outra.' },
]

function Eventos() {
  const [ref, controls] = useScrollReveal(0.15)
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }
  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
  }

  return (
    <section className="py-24 sm:py-32 px-6 bg-cream" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-6">
            Agenda
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-navy text-balance">
            O que acontece fora da partida
          </h2>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={container} initial="hidden" animate={controls}>
          {eventos.map((e) => (
            <motion.div key={e.titulo} variants={item} className="p-8 sm:p-10 border border-sand/60 bg-warm">
              <div className="w-8 h-[2px] bg-terracotta mb-6" />
              <h3 className="font-display text-2xl font-medium text-navy mb-4">{e.titulo}</h3>
              <p className="text-sm text-stone font-light leading-relaxed font-body">{e.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Gastronomia() {
  const [ref, controls] = useScrollReveal(0.3)

  return (
    <section className="relative py-28 sm:py-40 px-6 bg-navy overflow-hidden" ref={ref}>
      <Grain />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-terracotta" />
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
      >
        <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta-on-dark font-light font-body mb-10">
          Gastronomia & Lounge
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-cream leading-snug text-balance">
          O ponto de encontro depois do jogo
        </h2>
        <div className="flex items-center justify-center gap-4 my-10">
          <div className="w-8 h-px bg-cream/35" />
          <div className="w-1.5 h-1.5 border border-terracotta-on-dark/60 rotate-45" />
          <div className="w-8 h-px bg-cream/35" />
        </div>
        <p className="font-display text-lg sm:text-xl md:text-2xl text-cream/75 italic font-light leading-relaxed max-w-2xl mx-auto">
          Bar e lounge dentro do clube. A partida acaba e ninguém precisa sair
          para comer.
        </p>
      </motion.div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-terracotta" />
    </section>
  )
}

// O ritmo alterna o campo: crepúsculo fundo na abertura → papel nas aquarelas
// do dia → cal na agenda → crepúsculo no lounge.
//
// A abertura é escura porque o render do lounge é interior de fim de tarde: no
// campo claro ele viraria um retângulo cinza, e no escuro ele se dissolve.
//
// "Quatro tempos" entra logo depois da abertura porque é ela que responde ao
// que o cabeçalho promete: a vida dentro do clube, antes de a página descer
// para a agenda e a gastronomia, que são as partes específicas dela.
export default function Experiencia() {
  return (
    <>
      <AberturaPagina
        campo="escuro"
        eyebrow="Experiência"
        titulo={
          <>
            A vida
            <br />
            dentro
            <br />
            do clube
          </>
        }
        texto="Quatro tempos de um dia, uma agenda que corre o ano inteiro e uma cozinha que atende quem acaba de sair da quadra."
        imagem={lounge}
      />
      <TemposDoDia />
      <Eventos />
      <Gastronomia />
    </>
  )
}
