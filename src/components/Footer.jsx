import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import badgeWhite from '../assets/badge-white.svg'

export default function Footer() {
  const [ref, controls] = useScrollReveal(0.3)

  return (
    <footer className="py-16 sm:py-20 px-6 bg-navy-deep border-t border-terracotta/20" ref={ref}>
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
      >
        <img src={badgeWhite} alt="Sette Racket Club" className="w-14 h-14 mx-auto mb-6 opacity-40" />
        <p className="font-display text-lg tracking-[0.15em] text-cream/80 font-light">Sette Racket Club</p>
        <p className="mt-2 text-[0.6rem] tracking-ultra-wide uppercase text-stone/50 font-light font-body">Fortaleza — CE</p>
        <div className="mt-8 w-8 h-[2px] bg-terracotta/30 mx-auto" />
        <p className="mt-6 text-[0.55rem] tracking-[0.2em] text-stone/30 font-light font-body">
          &copy; {new Date().getFullYear()} Sette Racket Club. Todos os direitos reservados.
        </p>
      </motion.div>
    </footer>
  )
}
