import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import badgeWhite from '../assets/badge-white.svg'

const links = [
  { to: '/o-clube', label: 'O Clube' },
  { to: '/o-espaco', label: 'O Espaço' },
  { to: '/experiencia', label: 'Experiência' },
  { to: '/contato', label: 'Contato' },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 0.95])
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Em páginas internas (não a Home) o topo já começa escuro para legibilidade.
  const solidByDefault = location.pathname !== '/'

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-4 flex items-center justify-between"
      style={{
        backgroundColor: useTransform(
          bgOpacity,
          (v) => `rgba(29, 41, 56, ${solidByDefault ? Math.max(v, 0.95) : v})`,
        ),
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Marca */}
      <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
        <img src={badgeWhite} alt="Sette" className="w-8 h-8 sm:w-9 sm:h-9" />
        <span className="hidden sm:block text-[0.6rem] tracking-ultra-wide uppercase text-cream/70 font-light font-body">
          Sette Racket Club
        </span>
      </Link>

      {/* Navegação desktop */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `text-[0.6rem] tracking-ultra-wide uppercase font-light font-body transition-colors duration-300 ${
                isActive ? 'text-terracotta' : 'text-cream/70 hover:text-cream'
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </div>

      {/* Botão mobile */}
      <button
        type="button"
        aria-label="Abrir menu"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex flex-col items-end gap-1.5 w-7"
      >
        <motion.span
          animate={open ? { rotate: 45, y: 6, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
          className="block h-px bg-cream origin-center"
        />
        <motion.span
          animate={open ? { opacity: 0 } : { opacity: 1, width: '70%' }}
          className="block h-px bg-cream"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -6, width: '100%' } : { rotate: 0, y: 0, width: '40%' }}
          className="block h-px bg-cream origin-center"
        />
      </button>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-navy-deep/98 backdrop-blur-lg border-t border-terracotta/20 px-6 py-8 flex flex-col gap-6"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-xs tracking-ultra-wide uppercase font-light font-body ${
                    isActive ? 'text-terracotta' : 'text-cream/80'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
