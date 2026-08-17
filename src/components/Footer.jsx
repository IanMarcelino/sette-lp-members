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
          <img
            src={badgeWhite}
            alt="Sette Racket Club — início"
            width={56}
            height={56}
            loading="lazy"
            className="w-14 h-14 mx-auto mb-6 opacity-60"
          />
        </Link>
        <p className="font-display text-lg tracking-[0.15em] text-cream/85 font-light">Sette Racket Club</p>
        <p className="mt-2 text-[0.65rem] tracking-ultra-wide uppercase text-stone-light/80 font-light font-body">Fortaleza — CE</p>

        {/* py-3 dá aos links a altura de toque mínima sem abrir buraco no
            desenho — o gap vertical foi reduzido na mesma medida. */}
        <nav aria-label="Rodapé" className="mt-8 flex flex-wrap items-center justify-center gap-x-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-3 text-[0.65rem] tracking-ultra-wide uppercase text-cream/70 hover:text-terracotta-on-dark transition-colors duration-300 font-light font-body"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 w-8 h-[2px] bg-terracotta/40 mx-auto" />
        <p className="mt-6 text-[0.65rem] tracking-[0.2em] text-stone-light/70 font-light font-body">
          &copy; {new Date().getFullYear()} Sette Racket Club. Todos os direitos reservados.
        </p>
      </motion.div>
    </footer>
  )
}
