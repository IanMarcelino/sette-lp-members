import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import badgeWhite from '../assets/badge-white.svg'

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section
      ref={ref}
      className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax zoom */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: imgScale }}>
        <img
          src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </motion.div>

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy/80 via-navy/70 to-navy/90" />

      {/* Grain overlay */}
      <div className="absolute inset-0 z-[2] opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Top terracotta line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-terracotta z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: 'left' }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6">
        {/* Badge */}
        <motion.div custom={0} variants={fade} initial="hidden" animate="visible" className="flex justify-center mb-10">
          <img src={badgeWhite} alt="Sette Racket Club" className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40" />
        </motion.div>

        {/* Eyebrow */}
        <motion.span custom={0.8} variants={fade} initial="hidden" animate="visible"
          className="block text-[0.6rem] sm:text-xs tracking-ultra-wide uppercase text-terracotta font-light font-body mb-6">
          Fortaleza · Ceará
        </motion.span>

        {/* Nome do clube */}
        <motion.h1 custom={1.1} variants={fade} initial="hidden" animate="visible"
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-cream tracking-wide leading-[0.95]">
          Sette Racket Club
        </motion.h1>

        {/* Terracotta divider */}
        <motion.div custom={1.6} variants={fade} initial="hidden" animate="visible"
          className="mx-auto my-8 sm:my-10 w-16 h-[2px] bg-terracotta" />

        {/* Tagline */}
        <motion.p custom={1.9} variants={fade} initial="hidden" animate="visible"
          className="font-display text-xl sm:text-2xl md:text-3xl font-light text-cream/80 italic leading-snug max-w-2xl mx-auto">
          Onde esporte, arquitetura e experiência se encontram.
        </motion.p>

        {/* Body */}
        <motion.p custom={2.3} variants={fade} initial="hidden" animate="visible"
          className="mt-6 text-sm sm:text-base text-stone font-light leading-relaxed max-w-md mx-auto font-body">
          Um clube de raquete pensado para quem valoriza performance, convívio e bom gosto.
        </motion.p>

        {/* CTAs */}
        <motion.div custom={2.8} variants={fade} initial="hidden" animate="visible"
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/o-clube"
            className="inline-block w-full sm:w-auto px-10 py-4 border border-terracotta text-terracotta text-[0.7rem] sm:text-xs tracking-ultra-wide uppercase font-body font-light hover:bg-terracotta hover:text-cream transition-all duration-500 ease-out">
            Conheça o clube
          </Link>
          <Link to="/contato"
            className="inline-block w-full sm:w-auto px-10 py-4 bg-terracotta border border-terracotta text-cream text-[0.7rem] sm:text-xs tracking-ultra-wide uppercase font-body font-light hover:bg-terracotta-light hover:border-terracotta-light transition-all duration-500 ease-out">
            Agende uma visita
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <span className="text-[0.55rem] tracking-ultra-wide uppercase text-stone/60 font-light font-body">Scroll</span>
        <motion.div
          className="w-px h-8 bg-terracotta/40"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>

      {/* Bottom gradient fade to cream */}
      <div className="absolute bottom-0 left-0 w-full h-8 z-[3] bg-gradient-to-t from-cream/50 to-transparent" />
    </section>
  )
}
