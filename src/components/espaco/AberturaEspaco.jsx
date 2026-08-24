import { motion, useReducedMotion } from 'framer-motion'
import { prancha } from '../../data/pranchas'

const ease = [0.25, 0.1, 0.25, 1]
const abertura = prancha('abertura')
const TAMANHOS = '(min-width: 1024px) 700px, (min-width: 640px) calc(100vw - 5rem), calc(100vw - 3rem)'

// Abertura de "O Espaço".
//
// A prancha é uma aquarela sobre papel branco, não uma fotografia: em full-bleed
// sobre navy viraria um retângulo claro flutuando no escuro. O campo aqui é
// `cream` e não `paper` porque o papel do original é quase branco — sobre o
// creme quente das axonométricas a borda da folha aparecia como retângulo.
export default function AberturaEspaco() {
  const semMovimento = useReducedMotion()

  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-terracotta z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center px-6 sm:px-10 lg:pl-16 lg:pr-0 pt-32 pb-16 sm:pt-40 sm:pb-24 lg:py-32">
        <motion.div
          className="lg:col-span-6 xl:col-span-5"
          initial={semMovimento ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
        >
          <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-8">
            O Espaço
          </span>

          <h1 className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-light text-navy leading-[1.02] tracking-tight text-balance">
            Do saibro
            <br />
            ao jardim
          </h1>

          <div className="w-16 h-[2px] bg-terracotta my-8 sm:my-10" />

          <p className="text-base sm:text-lg text-paper-ink font-light leading-relaxed font-body max-w-md">
            Oito quadras, uma cozinha e um jardim coberto dividem o mesmo
            terreno. O percurso abaixo mostra o clube peça por peça — o que
            existe em cada uma e o que se faz ali.
          </p>
        </motion.div>

        <motion.div
          className="lg:col-span-6 xl:col-span-7"
          initial={semMovimento ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease }}
        >
          <picture className="contents">
            <source srcSet={abertura.avif} sizes={TAMANHOS} type="image/avif" />
            <source srcSet={abertura.webp} sizes={TAMANHOS} type="image/webp" />
            <img
              src={abertura.src}
              srcSet={abertura.webp}
              sizes={TAMANHOS}
              alt="Aquarela de um tenista em deslocamento sobre quadra de saibro, vista de cima, com a sombra alongada no piso"
              width={1400}
              height={1866}
              fetchpriority="high"
              decoding="async"
              className="w-full h-auto max-h-[78svh] object-contain object-center lg:object-right"
            />
          </picture>
        </motion.div>
      </div>
    </section>
  )
}
