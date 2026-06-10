import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

// Chassi compartilhado por todas as páginas: navegação fixa, conteúdo da rota
// com fade-in a cada troca de rota, e rodapé institucional.
// Usamos apenas animação de entrada (key por pathname força a remontagem) —
// evita o bug de tela travada do AnimatePresence + Outlet no data router.
export default function Layout() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </>
  )
}
