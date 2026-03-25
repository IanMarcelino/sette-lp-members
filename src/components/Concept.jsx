import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Concept() {
  const [ref, controls] = useScrollReveal(0.2)

  return (
    <section className="py-28 sm:py-40 px-6 bg-cream relative overflow-hidden" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } } }}
          >
            <span className="inline-block text-[0.6rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-6">
              O conceito
            </span>

            <motion.div
              className="w-12 h-[2px] bg-terracotta/40 mb-10 mx-auto"
              initial={{ scaleX: 0 }}
              animate={controls}
              variants={{ visible: { scaleX: 1, transition: { duration: 1, delay: 0.4 } } }}
              style={{ transformOrigin: 'center' }}
            />

            <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-light text-navy leading-relaxed">
              Mais do que um clube, o Sette nasce como um espaço onde{' '}
              <em className="text-terracotta">esporte, arquitetura e experiência</em> se encontram.
            </p>

            <div className="mx-auto my-10 w-10 h-[2px] bg-terracotta/40" />

            <p className="text-sm sm:text-base text-stone font-light leading-relaxed max-w-lg mx-auto font-body">
              Cada detalhe foi pensado para quem valoriza tempo, ambiente e performance.
            </p>
          </motion.div>
      </div>
    </section>
  )
}
