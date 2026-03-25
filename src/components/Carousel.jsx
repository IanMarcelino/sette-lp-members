import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import img1 from '../assets/carousel-1.png'
import img2 from '../assets/carousel-2.png'
import img3 from '../assets/carousel-3.png'
import img4 from '../assets/carousel-4.png'

gsap.registerPlugin(ScrollTrigger)

const slides = [
  { src: img1, label: 'Quadra de Saibro', desc: 'Padrão internacional com iluminação de alto rendimento e cobertura retrátil.' },
  { src: img2, label: 'Área Social', desc: 'Espaço integrado às quadras de padel para convivência e descompressão.' },
  { src: img3, label: 'Lounge', desc: 'Ambientes pensados para conforto, networking e experiências exclusivas.' },
  { src: img4, label: 'Quadra de Padel', desc: 'Estrutura profissional com grama sintética de última geração.' },
]

export default function Carousel() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current

    const ctx = gsap.context(() => {
      // Use window.innerWidth to avoid scrollbar miscalculations on mobile
      const slideWidth = window.innerWidth
      const totalWidth = slideWidth * slides.length
      const totalScroll = totalWidth - slideWidth

      // Set track width explicitly
      gsap.set(track, { width: totalWidth })

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            // Recalculate on resize
            const newSlideWidth = window.innerWidth
            const newTotalWidth = newSlideWidth * slides.length
            const newTotalScroll = newTotalWidth - newSlideWidth
            gsap.set(track, { width: newTotalWidth })
            self.end = newTotalScroll
          },
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-warm h-screen">
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative h-full flex-shrink-0 overflow-hidden"
            style={{ width: '100vw' }}
          >
            {/* Fullscreen image */}
            <img
              src={slide.src}
              alt={slide.label}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />

            {/* Text content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 md:p-16 lg:p-20">
              <span className="text-[0.6rem] tracking-ultra-wide uppercase text-terracotta font-light font-body">
                {String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-cream mt-3">
                {slide.label}
              </h3>
              <div className="w-10 h-[2px] bg-terracotta/60 my-4" />
              <p className="text-sm sm:text-base text-cream/70 font-light font-body max-w-md">
                {slide.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-cream/40 pointer-events-none z-10">
        <div className="w-8 h-px bg-cream/30" />
        <span className="text-[0.5rem] tracking-ultra-wide uppercase font-light font-body">Scroll</span>
        <div className="w-8 h-px bg-cream/30" />
      </div>
    </section>
  )
}
