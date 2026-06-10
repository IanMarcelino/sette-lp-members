import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Garante que cada troca de rota comece do topo da página.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
