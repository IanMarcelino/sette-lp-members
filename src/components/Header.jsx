import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SetteWordmark } from './SetteLogo'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-cream/90 backdrop-blur-md shadow-[0_1px_0_rgba(29,41,56,0.06)]'
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <SetteWordmark color={scrolled ? '#1D2938' : '#FAF8F5'} />
          <motion.a
            href="#inscricao"
            className={`hidden md:inline-block text-[0.7rem] font-body font-light tracking-[0.3em] uppercase px-6 py-2.5 border transition-all duration-500 ${
              scrolled
                ? 'border-navy/20 text-navy hover:bg-navy hover:text-cream'
                : 'border-cream/30 text-cream hover:bg-cream/10'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Solicitar acesso
          </motion.a>
        </div>
      </motion.header>
    </AnimatePresence>
  )
}
