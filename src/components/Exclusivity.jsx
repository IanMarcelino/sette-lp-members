import { motion, useMotionValue, animate, useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

function Counter({ target, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const counterRef = useRef(null)
  const inView = useInView(counterRef, { once: true, amount: 0.5 })
  const motionVal = useRef(useMotionValue(0))

  useEffect(() => {
    if (!inView) return
    const val = motionVal.current
    val.set(0)
    const unsub = val.on('change', (v) => setCount(Math.round(v)))
    animate(val, target, { duration, ease: [0.25, 0.1, 0.25, 1] })
    return unsub
  }, [inView, target, duration])

  return <span ref={counterRef} className="tabular-nums">{count}{suffix}</span>
}

export default function Exclusivity() {
  const [ref, controls] = useScrollReveal(0.2)

  return (
    <section className="relative py-28 sm:py-40 px-6 bg-navy overflow-hidden" ref={ref}>
      {/* Background texture image */}
      <div className="absolute inset-0 opacity-[0.05]">
        <img
          src="https://images.unsplash.com/photo-1551773188-d04f2d6fc90a?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-terracotta" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}>
          <span className="inline-block text-[0.6rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-10">
            Exclusividade
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-cream tracking-wide">Um novo padrão em tênis e lifestyle</h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 my-10">
            <div className="w-8 h-px bg-cream/15" />
            <div className="w-1.5 h-1.5 border border-terracotta/40 rotate-45" />
            <div className="w-8 h-px bg-cream/15" />
          </div>

          <p className="font-display text-lg sm:text-xl md:text-2xl text-cream/60 italic font-light leading-relaxed max-w-2xl mx-auto">
            O Sette poderá ser frequentado pelo público em geral, mas contará com um número reduzido de membros com acesso privilegiado.
          </p>
          <p className="mt-4 text-sm sm:text-base text-stone/50 font-light leading-relaxed max-w-lg mx-auto font-body">
            Novas admissões de membros acontecerão por processo seletivo<br className="hidden sm:block" /> ou lista de prioridade.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.4 } } }}
          className="mt-16 sm:mt-20 grid grid-cols-3 gap-6 sm:gap-12 max-w-2xl mx-auto">
          {[
            { target: 8, label: 'Quadras' },
            { target: 40, label: 'Membros' },
            { target: 1, label: 'Localização' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-terracotta">
                <Counter target={s.target} />
              </div>
              <p className="mt-2 text-[0.6rem] sm:text-[0.65rem] tracking-ultra-wide uppercase text-stone/60 font-light font-body">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Large subtle decorative 7 */}
        <motion.div
          className="mt-8 select-none pointer-events-none"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{ visible: { opacity: 0.03, transition: { duration: 2, delay: 1 } } }}
        >
          <span className="font-display text-[10rem] md:text-[16rem] text-cream font-light leading-none">
            40
          </span>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-terracotta" />
    </section>
  )
}
