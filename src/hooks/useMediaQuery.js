import { useEffect, useState } from 'react'

// Escolhe layout em JavaScript quando duas variantes não podem coexistir no DOM.
//
// Na maioria dos casos o certo é `hidden lg:block` — CSS resolve, sem custo. Mas
// quando as duas variantes carregam os mesmos `id` de âncora, manter as duas no
// documento quebra a navegação: o navegador resolve `#tenis` para a primeira
// ocorrência, mesmo que ela esteja dentro de um `display:none`.
//
// O valor inicial é lido de forma síncrona, antes do primeiro paint, então não
// há troca visível de layout na entrada.
export function useMediaQuery(query) {
  const [combina, setCombina] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const aoMudar = (e) => setCombina(e.matches)
    setCombina(mq.matches)
    mq.addEventListener('change', aoMudar)
    return () => mq.removeEventListener('change', aoMudar)
  }, [query])

  return combina
}
