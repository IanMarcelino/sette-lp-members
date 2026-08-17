import { motion, useReducedMotion } from 'framer-motion'

// Sem movimento, cada reveal perde o deslocamento e a escala mas mantém o
// fade: a hierarquia de entrada continua legível, só não se move no eixo.
const VIEWPORT = { once: true, margin: '-80px' }

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 40,
}) {
  const semMovimento = useReducedMotion()

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: distance },
    right: { y: 0, x: -distance },
  }

  const offset = semMovimento ? { x: 0, y: 0 } : directionMap[direction] || directionMap.up

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: semMovimento ? 0.4 : 0.9,
        delay: semMovimento ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export function FadeIn({ children, className = '', delay = 0, duration = 1 }) {
  const semMovimento = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: semMovimento ? 0.4 : duration,
        delay: semMovimento ? 0 : delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleReveal({ children, className = '', delay = 0 }) {
  const semMovimento = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: semMovimento ? 1 : 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: semMovimento ? 0.4 : 1,
        delay: semMovimento ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export function LineReveal({ className = '', delay = 0 }) {
  const semMovimento = useReducedMotion()

  return (
    <motion.div
      className={`h-px bg-terracotta/30 ${className}`}
      initial={{ scaleX: semMovimento ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: semMovimento ? 0 : 1.2, delay: semMovimento ? 0 : delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ transformOrigin: 'left' }}
    />
  )
}
