import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const lines = [
  'Não existe vitória sem set.',
  'Não existe jogo sem ele.',
  'É no set que tudo muda.',
]

export default function Philosophy() {
  const [ref, controls] = useScrollReveal(0.3)

  return (
    <section className="py-28 sm:py-40 px-6 bg-cream relative" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
        >
          <span className="inline-block text-[0.6rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-10">
            Por que Sette?
          </span>
          <p className="font-display text-xl sm:text-2xl md:text-3xl font-light text-navy leading-relaxed mb-8">
            Sette significa sete em italiano — e sua pronúncia
            <br className="hidden md:block" />
            remete ao <em className="text-terracotta">set</em>, a essência de cada partida no tênis.
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {lines.map((line, i) => (
            <motion.p key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={controls}
              variants={{ visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4 + i * 0.15 } } }}
              className="text-sm sm:text-base text-stone font-light font-body"
            >{line}</motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{ visible: { opacity: 1, transition: { duration: 1, delay: 1 } } }}
          className="mt-12 sm:mt-16"
        >
          <div className="mx-auto w-10 h-[2px] bg-terracotta/40 mb-10" />
          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-navy italic">
            "O jogo não é decidido no ponto.
            <br />É decidido no <span className="text-terracotta">SETTE</span>."
          </blockquote>
          <p className="mt-6 text-sm sm:text-base text-stone font-normal font-body tracking-wide">
            e aqui, começa o seu melhor set.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
