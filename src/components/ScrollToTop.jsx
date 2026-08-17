import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Garante que cada troca de rota comece do topo — exceto quando a URL traz uma
// âncora. Sem essa ressalva, abrir /o-espaco#giardino num link compartilhado
// rolava para o topo e engolia o destino.
//
// A âncora precisa de espera: as páginas internas são chunks carregados sob
// demanda, então no primeiro paint o elemento de destino ainda não existe. A
// tentativa se repete por alguns quadros e desiste — nunca fica presa.
const QUADROS_DE_ESPERA = 60

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    let quadro = 0
    let id

    const tentar = () => {
      const alvo = document.querySelector(hash)
      if (alvo) {
        alvo.scrollIntoView({ block: 'start', behavior: 'instant' })
        return
      }
      if (quadro++ < QUADROS_DE_ESPERA) id = requestAnimationFrame(tentar)
    }

    id = requestAnimationFrame(tentar)
    return () => cancelAnimationFrame(id)
  }, [pathname, hash])

  return null
}
