import { motion } from 'framer-motion'
import badgeWhite from '../assets/badge-white.svg'

// Cabeçalho institucional padrão para páginas internas.
// `eyebrow` = rótulo pequeno em caixa alta; `title` = título serifado;
// `subtitle` = linha de apoio opcional.
export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="relative bg-navy pt-36 pb-20 sm:pt-44 sm:pb-28 px-6 overflow-hidden">
      {/* Grão */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-terracotta" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <img src={badgeWhite} alt="" aria-hidden="true" className="w-12 h-12 mx-auto mb-8 opacity-50" />
        {eyebrow && (
          <span className="inline-block text-[0.6rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-6">
            {eyebrow}
          </span>
        )}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-cream tracking-wide leading-tight">
          {title}
        </h1>
        <div className="mx-auto mt-8 w-12 h-[2px] bg-terracotta/50" />
        {subtitle && (
          <p className="mt-8 text-sm sm:text-base text-stone/70 font-light leading-relaxed max-w-xl mx-auto font-body">
            {subtitle}
          </p>
        )}
      </motion.div>
    </section>
  )
}
