import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import badgeWhite from '../assets/badge-white.svg'

const navLinks = [
  { to: '/o-clube', label: 'O Clube' },
  { to: '/o-espaco', label: 'O Espaço' },
  { to: '/experiencia', label: 'Experiência' },
  { to: '/contato', label: 'Contato' },
]

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
        <Link to="/" className="inline-block">
          <img src={badgeWhite} alt="Sette Racket Club" className="w-14 h-14 mx-auto mb-6 opacity-40" />
        </Link>
        <p className="font-display text-lg tracking-[0.15em] text-cream/80 font-light">Sette Racket Club</p>
        <p className="mt-2 text-[0.6rem] tracking-ultra-wide uppercase text-stone/50 font-light font-body">Fortaleza — CE</p>

        <nav className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[0.6rem] tracking-ultra-wide uppercase text-cream/50 hover:text-terracotta transition-colors duration-300 font-light font-body"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 w-8 h-[2px] bg-terracotta/30 mx-auto" />
        <p className="mt-6 text-[0.55rem] tracking-[0.2em] text-stone/30 font-light font-body">
          &copy; {new Date().getFullYear()} Sette Racket Club. Todos os direitos reservados.
        </p>
      </motion.div>
    </footer>
  )
}
