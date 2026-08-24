import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

import obra from '../assets/obra.webp'
import tenis from '../assets/tenis.webp'
import lifestyle from '../assets/lifestyle.webp'
import clube from '../assets/clube.webp'

const pillars = [
  {
    title: 'Arquitetura contemporânea',
    desc: 'Linhas retas, paleta navy e terracota, materiais honestos.',
    img: obra,
  },
  {
    title: 'Quadras de padrão internacional',
    desc: 'No saibro o ponto se constrói: a partida cobra leitura e consistência, não só potência.',
    img: tenis,
  },
  {
    title: 'Espaços sociais que vivem o tênis',
    desc: 'Lounge, recepção, lockers, circulação: tudo desenhado como extensão da quadra.',
    img: lifestyle,
  },
  {
    title: 'Uma marca construída com propósito',
    desc: 'O símbolo — a bola estilizada formando um "S" — representa o ciclo do jogo: movimento, direção, ponto, retorno.',
    img: clube,
  },
]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Pillars() {
  const [ref, controls] = useScrollReveal(0.1)

  return (
    <section className="py-16 sm:py-28 md:py-40 px-6 bg-warm relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } } }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-6">
            A experiência
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-navy text-balance">
            Criada para transformar o jogador
          </h2>
          <p className="mt-6 text-sm text-stone font-light font-body max-w-lg mx-auto">
            A referência são os grandes clubes de raquete do mundo. A ambição é ser
            o marco do tênis moderno no Nordeste.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" variants={container} initial="hidden" animate={controls}>
          {pillars.map((p, i) => (
            <motion.div key={p.title} variants={item}
              className="group relative overflow-hidden p-8 sm:p-10 bg-cream border border-sand/60 hover:border-terracotta/40 transition-all duration-500 hover:shadow-[0_8px_30px_-12px_rgba(151,83,62,0.12)]">
              {/* Textura de fundo que ganha presença no hover */}
              <img
                src={p.img}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                width={1100}
                height={1100}
                className="absolute inset-0 w-full h-full object-cover opacity-[0.07] group-hover:opacity-20 group-hover:scale-105 transition-all duration-[1.2s] ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/85 to-cream/40" />

              {/* Numeral ornamental: repete a ordem que o DOM já carrega, então
                  não é lido por leitor de tela. */}
              <span
                aria-hidden="true"
                className="absolute top-6 right-8 font-display text-5xl sm:text-6xl font-light text-sand-deep/70 group-hover:text-terracotta/30 transition-colors duration-500"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="relative">
                <div className="w-8 h-[2px] bg-terracotta mb-6 transition-all duration-500 group-hover:w-12" />
                <h3 className="font-display text-xl sm:text-2xl font-medium text-navy mb-4 leading-snug text-balance">{p.title}</h3>
                <p className="text-sm text-stone font-light leading-relaxed font-body">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
