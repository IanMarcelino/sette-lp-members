import { useEffect, useRef } from 'react'
import { useAnimation, useInView } from 'framer-motion'

export function useScrollReveal(threshold = 0.3) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])

  return [ref, controls]
}
