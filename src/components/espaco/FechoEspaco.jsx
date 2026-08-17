import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import fechoAvif from '../../assets/espaco/quadra-coberta.avif'
import fechoWebp from '../../assets/espaco/quadra-coberta.webp'

// Fecho do percurso.
//
// Depois de quatro axonométricas — que mostram os ambientes vazios, como
// maquete — a última prancha devolve a escala de quem está lá dentro: quadra
// coberta, mezanino ocupado, fim de tarde. É a única imagem da seção com ponto
// de vista humano, e por isso encerra em vez de abrir.
export default function FechoEspaco() {
  const [ref, controls] = useScrollReveal(0.2)

  return (
    <section className="relative bg-paper overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center px-6 sm:px-10 lg:pr-16 lg:pl-0 py-16 sm:py-24 lg:py-28">
        <motion.div
          className="lg:col-span-7 order-2 lg:order-1"
          initial={{ opacity: 0, y: 24 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1.2 } } }}
        >
          <picture className="contents">
            <source srcSet={fechoAvif} type="image/avif" />
            <source srcSet={fechoWebp} type="image/webp" />
            <img
              src={fechoWebp}
              alt="Aquarela da quadra de saibro coberta do Sette ao fim da tarde, com o mezanino da área social ocupado ao fundo"
              width={1400}
              height={1866}
              loading="lazy"
              decoding="async"
              className="w-full h-auto max-h-[80svh] object-contain object-center lg:object-left"
            />
          </picture>
        </motion.div>

        <motion.div
          className="lg:col-span-5 order-1 lg:order-2"
          initial={{ opacity: 0, y: 24 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.15 } } }}
        >
          <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-6">
            Fim do percurso
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-navy leading-tight text-balance">
            O clube das seis
            <br className="hidden sm:block" /> da tarde
          </h2>
          <div className="w-12 h-[2px] bg-terracotta my-8" />
          <p className="text-base sm:text-lg text-paper-ink font-light leading-relaxed font-body max-w-md">
            A cobertura mantém o saibro em jogo depois que o sol baixa. Do
            mezanino, quem já jogou assiste a quem entrou depois.
          </p>

          <Link
            to="/contato"
            className="inline-block mt-10 px-9 py-4 border border-terracotta text-terracotta text-[0.7rem] tracking-ultra-wide uppercase font-body font-light hover:bg-terracotta hover:text-cream transition-all duration-500 ease-out"
          >
            Reservar uma quadra
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
