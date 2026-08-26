import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import Grain from '../Grain'

// Fecho da página.
//
// "O Clube" conta a origem do nome e quem ensina, e até aqui não pedia
// nada de volta. O objetivo do site é que a visita termine com uma quadra
// encaminhada; esta é a única porta da página para isso. O botão leva a
// Contato, onde a conversa começa de fato.
export default function FechoClube() {
  const [ref, controls] = useScrollReveal(0.25)

  return (
    <section className="relative py-24 sm:py-32 px-6 bg-navy overflow-hidden" ref={ref}>
      <Grain />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-terracotta" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
        variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
      >
        <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta-on-dark font-light font-body mb-8">
          Venha jogar
        </span>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-cream leading-snug text-balance">
          Não é preciso ser membro para entrar em quadra
        </h2>

        <div className="flex items-center justify-center gap-4 my-9">
          <div className="w-8 h-px bg-cream/35" />
          <div className="w-1.5 h-1.5 border border-terracotta-on-dark/60 rotate-45" />
          <div className="w-8 h-px bg-cream/35" />
        </div>

        <p className="text-base text-stone-light/85 font-light leading-relaxed max-w-lg mx-auto font-body text-balance">
          O Sette atende o público em geral. A reserva não passa por formulário:
          é conversa, e ela começa aqui.
        </p>

        <Link
          to="/contato"
          className="block w-full text-center sm:inline-block sm:w-auto mt-10 px-9 py-5 sm:py-4 border border-terracotta-on-dark text-terracotta-on-dark text-[0.7rem] tracking-ultra-wide uppercase font-body font-light hover:bg-terracotta-on-dark hover:text-navy active:bg-terracotta-on-dark active:text-navy transition-all duration-500 ease-out [-webkit-tap-highlight-color:transparent]"
        >
          Reservar uma quadra
        </Link>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-terracotta" />
    </section>
  )
}
