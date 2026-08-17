import { Outlet, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

// Chassi compartilhado por todas as páginas: navegação fixa, conteúdo da rota
// com fade-in a cada troca de rota, e rodapé institucional.
// Usamos apenas animação de entrada (key por pathname força a remontagem) —
// evita o bug de tela travada do AnimatePresence + Outlet no data router.
export default function Layout() {
  const location = useLocation()
  const semMovimento = useReducedMotion()

  return (
    <>
      {/* Com a navbar fixa, quem navega por teclado tinha de atravessar os
          quatro links em toda página. */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-navy-deep focus:text-cream focus:px-5 focus:py-3 focus:text-xs focus:tracking-ultra-wide focus:uppercase focus:font-body"
      >
        Pular para o conteúdo
      </a>
      <ScrollToTop />
      <Navbar />
      <motion.main
        id="conteudo"
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: semMovimento ? 0.15 : 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </>
  )
}
