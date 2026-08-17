import { lazy, Suspense } from 'react'
import Hero from '../components/Hero'
import Concept from '../components/Concept'
import Modalidades from '../components/Modalidades'
import Pillars from '../components/Pillars'

// O carrossel carrega o GSAP inteiro (~70 KB) e fica bem abaixo da dobra —
// não precisa competir com o Hero pelo início do carregamento.
const Carousel = lazy(() => import('../components/Carousel'))

export default function Home() {
  return (
    <>
      <Hero />
      <Concept />
      <Modalidades />
      {/* O carrossel vivia dentro de Pillars, o que colocava os h3 dos slides
          antes do h2 da seção que deveria contê-los. Agora é irmão.
          O fallback reserva a mesma altura para não deslocar o Pillars. */}
      <Suspense fallback={<div className="h-svh bg-warm" />}>
        <Carousel />
      </Suspense>
      <Pillars />
    </>
  )
}
