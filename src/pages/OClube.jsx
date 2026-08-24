import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import Philosophy from '../components/Philosophy'
import { useScrollReveal } from '../hooks/useScrollReveal'
import lifestyleAvif from '../assets/lifestyle.avif'
import lifestyleWebp from '../assets/lifestyle.webp'

function LifestyleBlock() {
  const [ref, controls] = useScrollReveal(0.2)

  return (
    <section className="py-24 sm:py-32 px-6 bg-warm" ref={ref}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, x: 0, transition: { duration: 1 } } }}
        >
          <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-6">
            Propósito
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-navy leading-snug text-balance">
            Um clube pensado como extensão de um estilo de vida
          </h2>
          <div className="w-10 h-[2px] bg-terracotta/40 my-8" />
          <p className="text-sm sm:text-base text-stone font-light leading-relaxed font-body">
            O Sette trata a arquitetura e o convívio como parte da oferta esportiva,
            não como cenário para ela. É o que separa um clube de um conjunto de
            quadras.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={controls}
          variants={{ visible: { opacity: 1, scale: 1, transition: { duration: 1.2 } } }}
          className="relative"
        >
          <div className="absolute -inset-3 border border-terracotta/20 pointer-events-none" />
          <picture className="contents">
            <source srcSet={lifestyleAvif} type="image/avif" />
            <source srcSet={lifestyleWebp} type="image/webp" />
            <img
              src={lifestyleWebp}
              alt="Jogador em quadra de saibro no Sette Racket Club"
              width={1291}
              height={1291}
              loading="lazy"
              decoding="async"
              className="relative w-full h-auto shadow-2xl"
            />
          </picture>
        </motion.div>
      </div>
    </section>
  )
}

export default function OClube() {
  return (
    <>
      <PageHero
        eyebrow="O Clube"
        title="A história por trás do Sette"
        subtitle="Um número perfeito, símbolo de completude — e a essência de cada partida."
      />
      <Philosophy />
      <LifestyleBlock />
    </>
  )
}
