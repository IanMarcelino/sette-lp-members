import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import badgeNavy from '../assets/badge-navy.svg'
import courtAerial from '../assets/court-aerial.png'

export default function SignupForm() {
  const [ref, controls] = useScrollReveal(0.1)

  return (
    <section id="admissao" className="relative overflow-hidden" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Image side */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{ visible: { opacity: 1, transition: { duration: 1.2 } } }}
        >
          <img
            src={courtAerial}
            alt="Sette Racket Club quadra de saibro vista aérea"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-warm/20" />
          <div className="absolute inset-0 bg-navy/30" />
        </motion.div>

        {/* Message side */}
        <div className="py-28 sm:py-40 px-6 sm:px-12 lg:px-20 bg-warm flex items-center">
          <motion.div className="max-w-md mx-auto w-full"
            initial={{ opacity: 0, y: 40 }} animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } } }}>

            <span className="inline-block text-[0.6rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-10">
              Processo de adesão
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-navy">Vagas encerradas</h2>
            <div className="my-8 w-10 h-[2px] bg-terracotta/40" />

            <img src={badgeNavy} alt="Sette" className="w-20 h-20 mb-10 opacity-60" />
            <p className="font-display text-2xl sm:text-3xl font-light italic text-navy leading-snug">
              Agradecemos o interesse de todos.
            </p>
            <p className="mt-6 text-sm text-stone font-light leading-relaxed font-body">
              As vagas para adesão como membro do Sette Racket Club foram encerradas. Agradecemos imensamente o interesse de todos.
            </p>
            <p className="mt-4 text-sm text-stone font-light leading-relaxed font-body">
              Em breve, o Sette Club entrará em contato.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
