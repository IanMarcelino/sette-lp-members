import { motion, useScroll, useTransform } from 'framer-motion'
import badgeWhite from '../assets/badge-white.svg'

export default function Navbar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 0.95])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-4 flex items-center justify-between"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(29, 41, 56, ${v})`),
        backdropFilter: 'blur(12px)',
      }}
    >
      <motion.a
        href="#"
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <img src={badgeWhite} alt="Sette" className="w-8 h-8 sm:w-9 sm:h-9" />
        <span className="hidden sm:block text-[0.6rem] tracking-ultra-wide uppercase text-cream/70 font-light font-body">
          Sette Racket Club
        </span>
      </motion.a>

      <motion.a
        href="#acesso"
        className="text-[0.6rem] tracking-ultra-wide uppercase text-terracotta font-light font-body hover:text-cream transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        Solicitar acesso
      </motion.a>
    </motion.nav>
  )
}
