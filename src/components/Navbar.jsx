import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion'
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
  const semMovimento = useReducedMotion()
  const botaoRef = useRef(null)

  // Em páginas internas (não a Home) o topo já começa escuro para legibilidade.
  const solidByDefault = location.pathname !== '/'

  const fundo = useTransform(
    bgOpacity,
    (v) => `rgba(29, 41, 56, ${solidByDefault ? Math.max(v, 0.95) : v})`,
  )

  // Esc fecha o menu e devolve o foco ao botão que o abriu.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        botaoRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <motion.nav
      aria-label="Navegação principal"
      className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-4 flex items-center justify-between"
      style={{ backgroundColor: fundo, backdropFilter: 'blur(12px)' }}
    >
      {/* Marca. O selo redondo é o mesmo lockup da abertura da Home — o mesmo
          desenho na barra e na primeira coisa que a página mostra. */}
      <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
        <img
          src={badgeWhite}
          alt="Sette Racket Club — início"
          width={44}
          height={44}
          className="w-10 h-10 sm:w-11 sm:h-11"
        />
      </Link>

      {/* Navegação desktop */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `text-[0.65rem] tracking-ultra-wide uppercase font-light font-body transition-colors duration-300 ${
                isActive ? 'text-terracotta-on-dark' : 'text-cream/75 hover:text-cream'
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </div>

      {/* Botão mobile. O padding negativo amplia a área de toque para 44×44
          sem mexer no desenho das três linhas. */}
      <button
        ref={botaoRef}
        type="button"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        aria-controls="menu-mobile"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex flex-col items-end justify-center gap-1.5 w-7 h-7 p-3 -m-3 box-content"
      >
        <motion.span
          animate={open ? { rotate: 45, y: 6, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
          className="block h-px w-full bg-cream origin-center"
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
            id="menu-mobile"
            initial={semMovimento ? { opacity: 0 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={semMovimento ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            /* Era `bg-navy-deep/98` — valor fora da escala do Tailwind, então a
               classe nunca era gerada e o painel ficava sem fundo sobre a foto
               do Hero. `/95` existe e é indistinguível a olho nu. */
            className="md:hidden absolute top-full left-0 right-0 bg-navy-deep/95 backdrop-blur-lg border-t border-terracotta/20 px-6 py-6 flex flex-col"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-xs tracking-ultra-wide uppercase font-light font-body ${
                    isActive ? 'text-terracotta-on-dark' : 'text-cream/85'
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
