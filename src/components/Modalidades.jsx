import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'

import tenis from '../assets/tenis.webp'
import padel from '../assets/padel.webp'
import clube from '../assets/clube.webp'
import lifestyle from '../assets/lifestyle.webp'

const modalidades = [
  {
    img: tenis,
    label: 'Tênis',
    desc: 'Quadras de saibro em padrão internacional, pensadas para performance do quique ao jogo mental.',
    to: '/o-espaco',
  },
  {
    img: padel,
    label: 'Padel',
    desc: 'Estrutura profissional com grama sintética de última geração e iluminação de alto rendimento.',
    to: '/o-espaco',
  },
  {
    img: clube,
    label: 'O Clube',
    desc: 'Uma marca construída com propósito — o símbolo que representa o ciclo do jogo, gravado no saibro.',
    to: '/o-clube',
  },
  {
    img: lifestyle,
    label: 'Lifestyle',
    desc: 'Convívio e encontro: o clube continua depois que a partida acaba.',
    to: '/experiencia',
  },
]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Modalidades() {
  const [ref, controls] = useScrollReveal(0.1)

  return (
    <section className="py-16 sm:py-28 md:py-40 px-6 bg-navy relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } } }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta-on-dark font-light font-body mb-6">
            O universo Sette
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-cream text-balance">
            O clube em quatro partes
          </h2>
          <div className="mx-auto mt-8 w-16 h-[2px] bg-terracotta-on-dark" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={container}
          initial="hidden"
          animate={controls}
        >
          {modalidades.map((m) => (
            <motion.div key={m.label} variants={item}>
              <Link
                to={m.to}
                className="group block relative overflow-hidden border border-cream/20 hover:border-terracotta-on-dark/60 transition-colors duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={m.img}
                    alt={m.label}
                    loading="lazy"
                    decoding="async"
                    width={1100}
                    height={1100}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                    <div className="w-8 h-[2px] bg-terracotta-on-dark mb-4 transition-all duration-500 group-hover:w-12" />
                    <h3 className="font-display text-2xl font-light text-cream">{m.label}</h3>
                    <p className="mt-3 text-xs sm:text-sm text-cream/75 font-light leading-relaxed font-body">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
