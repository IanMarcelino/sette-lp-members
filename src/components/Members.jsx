import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Members() {
  const [ref, controls] = useScrollReveal(0.2)

  return (
    <section className="py-28 sm:py-40 px-6 bg-navy relative overflow-hidden" ref={ref}>
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-terracotta" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
        >
          <span className="inline-block text-[0.6rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-10">
            Sobre os membros
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-cream leading-snug">
            Um grupo restrito com acesso privilegiado
          </h2>

          <div className="flex items-center justify-center gap-4 my-10">
            <div className="w-8 h-px bg-cream/15" />
            <div className="w-1.5 h-1.5 border border-terracotta/40 rotate-45" />
            <div className="w-8 h-px bg-cream/15" />
          </div>

          <p className="font-display text-lg sm:text-xl md:text-2xl text-cream/60 italic font-light leading-relaxed max-w-2xl mx-auto">
            O clube contará com um grupo restrito de membros, com acesso a benefícios, prioridade e experiências diferenciadas.
          </p>
          <p className="mt-6 text-sm sm:text-base text-stone/50 font-light leading-relaxed max-w-lg mx-auto font-body">
            A entrada como membro ocorre mediante processo de admissão e investimento inicial.
          </p>
        </motion.div>

        {/* Dois níveis de experiência */}
        <motion.div
          className="mt-20 sm:mt-28 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } } }}
        >
          {/* Público geral */}
          <div className="p-8 sm:p-10 border border-cream/10 bg-cream/[0.03]">
            <span className="inline-block text-[0.6rem] tracking-ultra-wide uppercase text-stone/50 font-light font-body mb-6">
              Público geral
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-light text-cream mb-4">Acesso aberto</h3>
            <div className="w-8 h-[2px] bg-stone/20 mb-6" />
            <ul className="space-y-3 text-sm text-stone/60 font-light font-body">
              <li className="flex items-start gap-3">
                <span className="mt-1 w-1 h-1 rounded-full bg-stone/40 flex-shrink-0" />
                Jogue nas quadras disponíveis
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-1 h-1 rounded-full bg-stone/40 flex-shrink-0" />
                Faça reservas regulares
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-1 h-1 rounded-full bg-stone/40 flex-shrink-0" />
                Aproveite os espaços sociais
              </li>
            </ul>
          </div>

          {/* Membros */}
          <div className="p-8 sm:p-10 border border-terracotta/30 bg-terracotta/[0.05] relative">
            <span className="inline-block text-[0.6rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-6">
              Membros
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-light text-cream mb-4">Experiência completa</h3>
            <div className="w-8 h-[2px] bg-terracotta/40 mb-6" />
            <ul className="space-y-3 text-sm text-cream/70 font-light font-body">
              <li className="flex items-start gap-3">
                <span className="mt-1 w-1 h-1 rounded-full bg-terracotta/60 flex-shrink-0" />
                Prioridade em reservas e horários
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-1 h-1 rounded-full bg-terracotta/60 flex-shrink-0" />
                Acesso a eventos e experiências exclusivas
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-1 h-1 rounded-full bg-terracotta/60 flex-shrink-0" />
                Status e benefícios diferenciados
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-terracotta" />
    </section>
  )
}
