import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import c1Avif from '../assets/carousel-1.avif'
import c1Webp from '../assets/carousel-1.webp'
import c2Avif from '../assets/carousel-2.avif'
import c2Webp from '../assets/carousel-2.webp'
import c3Avif from '../assets/carousel-3.avif'
import c3Webp from '../assets/carousel-3.webp'
import c4Avif from '../assets/carousel-4.avif'
import c4Webp from '../assets/carousel-4.webp'

gsap.registerPlugin(ScrollTrigger)

const slides = [
  { avif: c1Avif, webp: c1Webp, w: 2400, h: 1340, label: 'Quadra de Saibro', desc: 'Padrão internacional com iluminação de alto rendimento e cobertura.' },
  { avif: c2Avif, webp: c2Webp, w: 2400, h: 1340, label: 'Área Social', desc: 'Espaço integrado às quadras de padel para convivência e descompressão.' },
  { avif: c3Avif, webp: c3Webp, w: 2400, h: 1340, label: 'Lounge', desc: 'Ambientes pensados para conforto, networking e experiências exclusivas.' },
  { avif: c4Avif, webp: c4Webp, w: 2400, h: 1339, label: 'Quadra de Padel', desc: 'Estrutura profissional com grama sintética de última geração.' },
]

export default function Carousel() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  // Sem pin, a faixa vira um strip de rolagem horizontal nativa. O conteúdo e a
  // leitura horizontal continuam; o que sai é o sequestro do scroll vertical.
  const [semPin, setSemPin] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  // Largura de um slide = largura visível da seção, publicada como custom
  // property. É a correção do bug original: `100vw` no CSS não bate com a área
  // útil quando existe scrollbar, e a diferença acumulava a cada slide.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const medir = () => section.style.setProperty('--slide-w', `${section.clientWidth}px`)
    medir()

    const ro = new ResizeObserver(medir)
    ro.observe(section)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const mm = gsap.matchMedia()

    mm.add(
      {
        podePinar: '(prefers-reduced-motion: no-preference)',
        reduzido: '(prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        setSemPin(!ctx.conditions.podePinar)
        if (!ctx.conditions.podePinar) return

        // A largura do slide vem do elemento, não de window.innerWidth: no
        // desktop a scrollbar faz `100vw` ser ~15px maior que a área visível, e
        // a diferença acumulada cortava o último slide.
        const larguraSlide = () => section.clientWidth
        const percurso = () => larguraSlide() * (slides.length - 1)

        gsap.set(track, { width: () => larguraSlide() * slides.length })

        gsap.to(track, {
          x: () => -percurso(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            end: () => `+=${percurso()}`,
            invalidateOnRefresh: true,
          },
        })
      },
    )

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Galeria de espaços do clube"
      className={`relative bg-warm h-svh ${
        semPin ? 'overflow-x-auto snap-x snap-mandatory' : 'overflow-hidden'
      }`}
    >
      {/* A faixa é puramente visual, mas os rótulos dos slides são h3 — sem um
          h2 acima eles ficariam órfãos na árvore de cabeçalhos. */}
      <h2 className="sr-only">Espaços do clube</h2>

      <div ref={trackRef} className={`flex h-full ${semPin ? '' : 'will-change-transform'}`}>
        {slides.map((slide, i) => (
          <div
            key={slide.label}
            className="relative h-full flex-shrink-0 overflow-hidden snap-start"
            style={{ width: 'var(--slide-w, 100%)' }}
          >
            <picture className="contents">
              <source srcSet={slide.avif} type="image/avif" />
              <source srcSet={slide.webp} type="image/webp" />
              <img
                src={slide.webp}
                alt={slide.label}
                width={slide.w}
                height={slide.h}
                // O primeiro slide entra na viewport junto com a seção; os
                // demais só depois que a faixa começa a andar.
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            </picture>

            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/25 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 md:p-16 lg:p-20">
              <span className="text-[0.65rem] tracking-ultra-wide uppercase text-terracotta-on-dark font-light font-body">
                {String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-cream mt-3">
                {slide.label}
              </h3>
              <div className="w-10 h-[2px] bg-terracotta-on-dark/70 my-4" />
              <p className="text-sm sm:text-base text-cream/75 font-light font-body max-w-md">
                {slide.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-cream/70 pointer-events-none z-10">
        <div className="w-8 h-px bg-cream/40" />
        <span className="text-[0.65rem] tracking-ultra-wide uppercase font-light font-body">
          {semPin ? 'Arraste' : 'Scroll'}
        </span>
        <div className="w-8 h-px bg-cream/40" />
      </div>
    </section>
  )
}
