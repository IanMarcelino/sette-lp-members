import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import Grain from '../Grain'
import { espacos } from '../../data/espacos'
import { prancha } from '../../data/pranchas'

const planta = prancha('planta')
const TAMANHOS = '(min-width: 1024px) 650px, calc(100vw - 3rem)'

// A planta como índice.
//
// A prancha original é aquarela sobre fundo preto, então ela assenta no navy
// sem recorte nem máscara. Aqui ela não é ilustração de apoio: é o mapa que
// situa os quatro ambientes antes do visitante percorrê-los, e cada item da
// lista salta para a parada correspondente.
export default function PlantaIndice() {
  const [ref, controls] = useScrollReveal(0.15)

  return (
    <section className="relative bg-navy overflow-hidden py-20 sm:py-28 lg:py-32 px-6" ref={ref}>
      <Grain />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-terracotta" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <motion.div
          className="lg:col-span-7 order-2 lg:order-1"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1.1 } } }}
        >
          <picture className="contents">
            <source srcSet={planta.avif} sizes={TAMANHOS} type="image/avif" />
            <source srcSet={planta.webp} sizes={TAMANHOS} type="image/webp" />
            <img
              src={planta.src}
              srcSet={planta.webp}
              sizes={TAMANHOS}
              alt="Planta aquarelada do Sette Racket Club: seis quadras de saibro à esquerda, duas quadras de padel e área verde ao centro, edificação social e estacionamento à direita"
              width={1532}
              height={1483}
              // Segunda seção da página e imagem principal dela: adiar o
              // carregamento só garante que ela chegue depois de ser vista.
              loading="eager"
              fetchpriority="high"
              decoding="async"
              className="w-full h-auto"
            />
          </picture>
        </motion.div>

        <motion.div
          className="lg:col-span-5 order-1 lg:order-2"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.15 } } }}
        >
          <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta-on-dark font-light font-body mb-6">
            O terreno
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-cream leading-tight text-balance">
            Tudo em um só quarteirão
          </h2>
          <p className="mt-6 text-base text-stone-light/85 font-light leading-relaxed font-body max-w-sm">
            As quadras de saibro ocupam a face oeste; o padel e o jardim, o
            miolo; a edificação social e o estacionamento, a face leste. Nada
            exige carro entre uma coisa e outra.
          </p>

          {/* Índice: leva direto à parada do percurso. */}
          <nav aria-label="Ambientes do clube" className="mt-10 border-t border-cream/20">
            {espacos.map((e) => (
              <a
                key={e.id}
                href={`#${e.id}`}
                // No toque não existe hover: o realce de `active` é o único
                // retorno entre o dedo encostar e a página saltar. O realce
                // padrão do iOS é desligado porque este o substitui.
                className="group flex items-baseline gap-5 py-5 sm:py-4 border-b border-cream/20 transition-colors duration-300 hover:bg-cream/[0.04] active:bg-cream/[0.08] [-webkit-tap-highlight-color:transparent]"
              >
                <span
                  aria-hidden="true"
                  className="font-body text-[0.65rem] tracking-[0.2em] text-terracotta-on-dark/80 tabular-nums"
                >
                  {e.numero}
                </span>
                {/* Numa tela de 360px "Casa Sette Café" e sua etiqueta não
                    cabem na mesma linha: o nome quebrava e a linha inchava
                    para 89px enquanto as vizinhas ficavam em 61px. Abaixo de
                    xs a etiqueta desce; de xs para cima a linha volta a ser a
                    do desenho original. */}
                <span className="flex-1 flex flex-col gap-1 xs:flex-row xs:items-baseline xs:gap-5">
                  <span className="font-display text-xl sm:text-2xl font-light text-cream group-hover:text-terracotta-on-dark transition-colors duration-300">
                    {e.nome}
                  </span>
                  <span className="text-[0.65rem] tracking-[0.16em] uppercase text-stone-light/70 font-light font-body xs:ml-auto xs:whitespace-nowrap">
                    {e.meta}
                  </span>
                </span>
              </a>
            ))}
          </nav>
        </motion.div>
      </div>
    </section>
  )
}
