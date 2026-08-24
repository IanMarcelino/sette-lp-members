import { motion, useMotionValue, animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Grain from './Grain'

function Counter({ target, suffix = '', duration = 2 }) {
  const semMovimento = useReducedMotion()
  const [count, setCount] = useState(semMovimento ? target : 0)
  const counterRef = useRef(null)
  const inView = useInView(counterRef, { once: true, amount: 0.5 })
  const motionVal = useRef(useMotionValue(0))

  useEffect(() => {
    if (!inView) return
    // Sem movimento o número aparece pronto: a informação é o valor final,
    // não a contagem.
    if (semMovimento) {
      setCount(target)
      return
    }
    const val = motionVal.current
    val.set(0)
    const unsub = val.on('change', (v) => setCount(Math.round(v)))
    animate(val, target, { duration, ease: [0.25, 0.1, 0.25, 1] })
    return unsub
  }, [inView, target, duration, semMovimento])

  return <span ref={counterRef} className="tabular-nums">{count}{suffix}</span>
}

export default function Exclusivity() {
  const [ref, controls] = useScrollReveal(0.2)

  return (
    <section className="relative py-28 sm:py-40 px-6 bg-navy overflow-hidden" ref={ref}>
      {/* A planta técnica saiu daqui: a planta aquarelada do percurso, logo
          acima nesta página, mostra o mesmo terreno com muito mais informação.
          Duas plantas na mesma página competiam entre si. */}
      <Grain />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-terracotta" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}>
          <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta-on-dark font-light font-body mb-10">
            Exclusividade
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-cream tracking-wide text-balance">Um novo padrão em tênis e lifestyle</h2>

          {/* Divisor decorativo */}
          <div className="flex items-center justify-center gap-4 my-10">
            <div className="w-8 h-px bg-cream/35" />
            <div className="w-1.5 h-1.5 border border-terracotta-on-dark/60 rotate-45" />
            <div className="w-8 h-px bg-cream/35" />
          </div>

          <p className="font-display text-lg sm:text-xl md:text-2xl text-cream/75 italic font-light leading-relaxed max-w-2xl mx-auto text-balance">
            O Sette poderá ser frequentado pelo público em geral, mas contará com um número reduzido de membros com acesso privilegiado.
          </p>
          <p className="mt-4 text-base text-stone-light/85 font-light leading-relaxed max-w-lg mx-auto font-body text-balance">
            Novas admissões de membros acontecerão por processo seletivo ou lista de prioridade.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.6 } } }}
          className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-12 max-w-2xl mx-auto">
          {[
            { target: 8, label: 'Quadras' },
            { target: 25, label: 'Vagas de carro' },
            { target: 1, label: 'Área VIP' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-terracotta-on-dark">
                <Counter target={s.target} />
              </div>
              {/* A três colunas o tracking ultra-wide não cabe em telas
                  estreitas — "Vagas de carro" quebrava em três linhas. Aqui ele
                  abre só a partir de sm. */}
              <p className="mt-2 text-[0.65rem] tracking-[0.18em] sm:tracking-ultra-wide uppercase text-stone-light/85 font-light font-body text-balance">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-terracotta" />
    </section>
  )
}
