import { useCallback, useState } from 'react'

/**
 * Estado de um carrossel de item único.
 *
 * Guarda o índice ativo e o sentido do último salto — o sentido é o que
 * permite animar a troca para o lado certo em vez de sempre para o mesmo. Os
 * dois vivem no mesmo `useState` de propósito: derivar o sentido dentro do
 * atualizador de outro estado faria o React disparar duas atualizações por
 * clique e, em modo estrito, calcular o sentido duas vezes.
 *
 * Os índices dão a volta: avançar no último leva ao primeiro. É o
 * comportamento esperado de um trilho curto, de quatro ou cinco paradas.
 */
export function useCarrossel(total) {
  const [{ ativo, sentido }, setEstado] = useState({ ativo: 0, sentido: 1 })

  const normalizar = useCallback((i) => ((i % total) + total) % total, [total])

  const ir = useCallback(
    (i) =>
      setEstado((e) => {
        const alvo = normalizar(i)
        return alvo === e.ativo ? e : { ativo: alvo, sentido: alvo > e.ativo ? 1 : -1 }
      }),
    [normalizar],
  )

  const andar = useCallback(
    (passo) =>
      setEstado((e) => ({ ativo: normalizar(e.ativo + passo), sentido: passo > 0 ? 1 : -1 })),
    [normalizar],
  )

  // Setas do teclado dentro da região do carrossel. `preventDefault` impede que
  // a mesma tecla role a página por baixo da troca de slide.
  const aoTeclar = useCallback(
    (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        andar(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        andar(-1)
      }
    },
    [andar],
  )

  return { ativo, sentido, ir, andar, aoTeclar }
}
