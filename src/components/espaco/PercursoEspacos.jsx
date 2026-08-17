import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { espacos } from '../../data/espacos'

const ease = [0.25, 0.1, 0.25, 1]

function Prancha({ espaco, className = '', loading = 'lazy', priority }) {
  return (
    <picture className="contents">
      <source srcSet={espaco.avif} type="image/avif" />
      <source srcSet={espaco.webp} type="image/webp" />
      <img
        src={espaco.webp}
        alt={espaco.alt}
        width={espaco.w}
        height={espaco.h}
        loading={loading}
        decoding="async"
        fetchpriority={priority}
        className={className}
      />
    </picture>
  )
}

/** Um bloco de texto do percurso. Avisa quando entra na faixa central da tela. */
function Parada({ espaco, indice, onAtivar, ultimo }) {
  const ref = useRef(null)
  // A faixa é estreita de propósito: a prancha troca quando o texto chega ao
  // meio da tela, não quando encosta na borda.
  const naFaixa = useInView(ref, { margin: '-45% 0px -45% 0px' })

  // Em efeito, não no corpo do render: mudar o estado do pai durante o render
  // de um filho é o caminho curto para um laço de atualização.
  useEffect(() => {
    if (naFaixa) onAtivar(indice)
  }, [naFaixa, indice, onAtivar])

  return (
    <div
      ref={ref}
      id={espaco.id}
      className={`scroll-mt-28 ${ultimo ? 'lg:min-h-[70svh]' : 'lg:min-h-[85svh]'} flex flex-col justify-center`}
    >
      <div className="flex items-baseline gap-4 mb-6">
        <span
          aria-hidden="true"
          className="font-body text-[0.65rem] tracking-[0.2em] text-terracotta tabular-nums"
        >
          {espaco.numero}
        </span>
        <span className="h-px flex-1 bg-paper-ink/25" />
        <span className="text-[0.65rem] tracking-[0.16em] uppercase text-paper-ink font-light font-body">
          {espaco.meta}
        </span>
      </div>

      <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-navy leading-tight text-balance">
        {espaco.nome}
      </h3>

      <p className="mt-6 text-base sm:text-lg text-paper-ink font-light leading-relaxed font-body max-w-md">
        {espaco.texto}
      </p>
    </div>
  )
}

export default function PercursoEspacos() {
  const [ativo, setAtivo] = useState(0)
  const semMovimento = useReducedMotion()
  const atual = espacos[ativo]

  return (
    <section aria-label="Percurso pelos ambientes do clube" className="bg-paper">
      {/* ───────────── Desktop: prancha fixa, texto avança ───────────── */}
      <div className="hidden lg:block max-w-7xl mx-auto px-10 xl:px-16 py-24">
        <div className="grid grid-cols-12 gap-16">
          {/* Prancha fixa */}
          <div className="col-span-7">
            <div className="sticky top-24 h-[76svh] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={atual.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: semMovimento ? 0 : 0.55, ease }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Prancha
                    espaco={atual}
                    className="w-full h-full object-contain object-center"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Texto. O numeral de cada parada já diz onde se está no percurso —
              um trilho de progresso separado seria ornamento repetindo isso. */}
          <div className="col-span-5">
            {espacos.map((e, i) => (
              <Parada
                key={e.id}
                espaco={e}
                indice={i}
                onAtivar={setAtivo}
                ultimo={i === espacos.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ───────────── Mobile e tablet: cada ambiente é um bloco ───────────── */}
      <div className="lg:hidden px-6 sm:px-10 py-16 sm:py-20">
        {espacos.map((e, i) => (
          <article
            key={e.id}
            id={e.id}
            className={`scroll-mt-24 ${i > 0 ? 'mt-20 sm:mt-24 pt-20 sm:pt-24 border-t border-paper-ink/15' : ''}`}
          >
            <div className="flex items-baseline gap-4 mb-6">
              <span
                aria-hidden="true"
                className="font-body text-[0.65rem] tracking-[0.2em] text-terracotta tabular-nums"
              >
                {e.numero}
              </span>
              <span className="h-px flex-1 bg-paper-ink/25" />
              <span className="text-[0.65rem] tracking-[0.16em] uppercase text-paper-ink font-light font-body">
                {e.meta}
              </span>
            </div>

            <Prancha
              espaco={e}
              loading={i === 0 ? 'eager' : 'lazy'}
              priority={i === 0 ? 'high' : undefined}
              className="w-full h-auto"
            />

            <h3 className="mt-6 font-display text-3xl sm:text-4xl font-light text-navy leading-tight text-balance">
              {e.nome}
            </h3>
            <p className="mt-4 text-base text-paper-ink font-light leading-relaxed font-body">
              {e.texto}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
