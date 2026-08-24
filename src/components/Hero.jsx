import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import badgeWhite from '../assets/badge-white.svg'
// Direção de arte por orientação: a vista aérea é retrato e o centro dela é
// saibro liso, então num viewport landscape o corte entrega um retângulo chapado.
// A área social é landscape, clara e cheia de estrutura (rede, palmeiras, toldo),
// então sobrevive ao véu navy — um interior de crepúsculo viraria preto.
import heroRetratoAvif from '../assets/court-aerial.avif'
import heroRetratoWebp from '../assets/court-aerial.webp'
import heroPaisagemAvif from '../assets/carousel-2.avif'
import heroPaisagemWebp from '../assets/carousel-2.webp'
import Grain from './Grain'

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

// Sem movimento: a entrada continua existindo, só perde o deslocamento.
const fadeOnly = {
  hidden: { opacity: 0 },
  visible: (i) => ({ opacity: 1, transition: { delay: i * 0.15, duration: 0.5 } }),
}

export default function Hero() {
  const ref = useRef(null)
  const semMovimento = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  const variants = semMovimento ? fadeOnly : fade
  // Parallax e zoom são exatamente o que incomoda quem tem sensibilidade
  // vestibular: o conteúdo se move em velocidade diferente do scroll.
  const parallax = semMovimento ? undefined : { y, opacity }
  const zoom = semMovimento ? undefined : { scale: imgScale }

  return (
    // Coluna de verdade, não empilhamento por posicionamento absoluto: o
    // conteúdo ocupa o espaço que sobra e o indicador vem depois dele. Antes o
    // indicador era `absolute bottom-8` enquanto o texto era centralizado, e os
    // dois disputavam o mesmo lugar quando a altura apertava — a 1280x800 o
    // indicador invadia os botões em 34px, e num celular deitado, em 122px.
    <section
      ref={ref}
      className="relative min-h-svh flex flex-col overflow-hidden bg-navy"
    >
      {/* LCP da página: sem lazy, prioridade alta. */}
      <motion.div className="absolute inset-0 z-0" style={zoom}>
        <picture className="contents">
          <source media="(orientation: portrait)" srcSet={heroRetratoAvif} type="image/avif" />
          <source media="(orientation: portrait)" srcSet={heroRetratoWebp} type="image/webp" />
          <source srcSet={heroPaisagemAvif} type="image/avif" />
          <source srcSet={heroPaisagemWebp} type="image/webp" />
          <img
            src={heroPaisagemWebp}
            alt=""
            aria-hidden="true"
            width={2400}
            height={1340}
            fetchpriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        </picture>
      </motion.div>

      {/* Véu base: deixa a fotografia respirar como atmosfera. */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy/80 via-navy/70 to-navy/95" />

      {/* Scrim radial sob a coluna de texto — ver `.hero-scrim` no index.css.
          Só entra em landscape: em retrato a coluna de texto ocupa quase toda a
          largura, então a elipse cobriria a foto inteira em vez de destacá-la. */}
      <div aria-hidden="true" className="hero-scrim absolute inset-0 z-[1]" />

      <Grain className="z-[2]" />

      {/* Régua terracota do topo */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-terracotta z-10"
        initial={{ scaleX: semMovimento ? 1 : 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: 'left' }}
      />

      {/* O `pt` reserva a faixa da navbar, que é fixa e flutua por cima. Sem
          ele, num viewport baixo o emblema subia para trás do menu. */}
      <motion.div
        style={parallax}
        className="relative z-10 flex-1 flex items-center justify-center w-full px-6 pt-24 pb-4 baixa:pt-20"
      >
        <div className="w-full max-w-4xl text-center">
          <motion.div custom={0} variants={variants} initial="hidden" animate="visible" className="flex justify-center mb-10 baixa:mb-4">
            <img
              src={badgeWhite}
              alt=""
              aria-hidden="true"
              width={144}
              height={144}
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 baixa:w-16 baixa:h-16"
            />
          </motion.div>

          <motion.span custom={0.8} variants={variants} initial="hidden" animate="visible"
            className="block text-[0.7rem] sm:text-xs tracking-ultra-wide uppercase text-terracotta-on-photo font-light font-body mb-6 baixa:mb-3">
            Fortaleza · Ceará
          </motion.span>

          <motion.h1 custom={1.1} variants={variants} initial="hidden" animate="visible"
            /* "Sette Racket Club" com tracking-wide não cabia em 390px: a linha
               vazava a viewport. Aqui ela quebra em duas e o tracking só abre a
               partir de sm, onde há largura para ele. `baixa` corta o tamanho
               quando a tela é baixa, por mais larga que ela seja. */
            className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl baixa:text-3xl font-light text-cream tracking-normal sm:tracking-wide leading-[1.02] sm:leading-[0.95] text-balance">
            Sette Racket Club
          </motion.h1>

          <motion.div custom={1.6} variants={variants} initial="hidden" animate="visible"
            className="mx-auto my-8 sm:my-10 baixa:my-4 w-16 h-[2px] bg-terracotta-on-photo" />

          <motion.p custom={1.9} variants={variants} initial="hidden" animate="visible"
            className="font-display text-xl sm:text-2xl md:text-3xl baixa:text-base font-light text-cream/80 italic leading-snug max-w-2xl mx-auto text-balance">
            Onde esporte, arquitetura e experiência se encontram.
          </motion.p>

          {/* A linha anterior — "pensado para quem valoriza performance,
              convívio e bom gosto" — falava do projeto, não do clube que já
              funciona, e não trazia fato nenhum. Cada afirmação abaixo está
              registrada no PRODUCT.md. */}
          <motion.p custom={2.3} variants={variants} initial="hidden" animate="visible"
            className="mt-6 baixa:mt-3 text-sm sm:text-base text-stone-light font-light leading-relaxed max-w-md mx-auto font-body">
            Tênis e padel no Papicu, em Fortaleza. Aberto ao público, com reserva pelo WhatsApp.
          </motion.p>

          {/* A reserva é o objetivo declarado do site, então ela lidera. */}
          <motion.div custom={2.8} variants={variants} initial="hidden" animate="visible"
            className="mt-12 baixa:mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contato"
              className="inline-block w-full sm:w-auto px-10 py-4 bg-terracotta border border-terracotta text-cream text-[0.7rem] sm:text-xs tracking-ultra-wide uppercase font-body font-light hover:bg-terracotta-light hover:border-terracotta-light active:bg-terracotta-light active:border-terracotta-light transition-all duration-500 ease-out [-webkit-tap-highlight-color:transparent]">
              Agende um horário
            </Link>
            <Link to="/o-clube"
              className="inline-block w-full sm:w-auto px-10 py-4 border border-terracotta-on-photo text-terracotta-on-photo text-[0.7rem] sm:text-xs tracking-ultra-wide uppercase font-body font-light hover:bg-terracotta-on-photo hover:text-navy-deep active:bg-terracotta-on-photo active:text-navy-deep transition-all duration-500 ease-out [-webkit-tap-highlight-color:transparent]">
              Conheça o clube
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Indicador de scroll, agora sem a palavra: "Scroll" era inglês numa
          interface em português e nomeava o gesto, não o destino. O traço
          sozinho já diz que há página abaixo. O laço infinito é o que a WCAG
          2.2.2 alcança, então sem movimento ele vira uma marca estática. */}
      <motion.div
        aria-hidden="true"
        className="relative z-10 flex justify-center pb-8 baixa:pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: semMovimento ? 0 : 3.5, duration: 1 }}
      >
        <motion.div
          className="w-px h-8 baixa:h-5 bg-terracotta-on-photo/70"
          animate={semMovimento ? { scaleY: 1 } : { scaleY: [0, 1, 0] }}
          transition={semMovimento ? { duration: 0 } : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-8 z-[3] bg-gradient-to-t from-cream/50 to-transparent" />
    </section>
  )
}
