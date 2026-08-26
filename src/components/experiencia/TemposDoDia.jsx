import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useCarrossel } from '../../hooks/useCarrossel'
import { tempos } from '../../data/tempos'
import ControlesCarrossel from '../ControlesCarrossel'

const ease = [0.25, 0.1, 0.25, 1]

// Larguras reais do slot: 440px na coluna de 5/12 do desktop, a tela menos a
// calha no empilhado. Sem isso o celular baixa a aquarela de 1000px para um
// slot de 340.
const TAMANHOS = '(min-width: 1024px) 440px, (min-width: 640px) calc(100vw - 5rem), calc(100vw - 3rem)'

// Distância mínima de arrasto para valer como troca de slide. Abaixo disso é
// intenção de rolar a página, não de avançar o carrossel.
const ARRASTO = 60

/**
 * "Quatro tempos do mesmo dia" — o carrossel das aquarelas de pessoas.
 *
 * A ideia que o material carrega é de etapas: a mesma folha, a mesma escala, a
 * mesma linha de chão, quatro momentos. O carrossel existe para preservar isso.
 * Se os quatro virassem uma grade, cada figura viraria um cartão e a sequência
 * — que é o conteúdo — se perderia. Aqui só um tempo ocupa o slot de cada vez,
 * e o trilho embaixo mostra onde se está na sequência.
 *
 * O campo é `paper` porque é o papel das próprias aquarelas: a figura assenta
 * sem borda e sem recorte visível.
 */
export default function TemposDoDia() {
  const [ref, controls] = useScrollReveal(0.12)
  const { ativo, sentido, ir, andar, aoTeclar } = useCarrossel(tempos.length)
  const semMovimento = useReducedMotion()
  const atual = tempos[ativo]

  // Sem movimento a troca é um corte seco: quem pediu menos animação não quer
  // ver a figura deslizar, mas continua precisando ver que ela mudou.
  const deslocamento = semMovimento ? 0 : 24 * sentido
  const duracao = semMovimento ? 0 : 0.5

  return (
    <section
      className="relative bg-paper py-20 sm:py-28 lg:py-32 px-6 sm:px-10"
      aria-roledescription="carrossel"
      aria-label="Quatro tempos de um dia no clube"
      onKeyDown={aoTeclar}
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho editorial: título à esquerda, linha de apoio à direita.
            A seção abaixo é uma composição em duas colunas — um cabeçalho
            centrado a deixaria simétrica no topo e assimétrica no corpo. */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
        >
          <div className="lg:col-span-7">
            <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-6">
              Um dia no Sette
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-navy leading-tight text-balance">
              Quatro tempos do mesmo dia
            </h2>
            <div className="w-12 h-[2px] bg-terracotta mt-8" />
          </div>
          <p className="lg:col-span-5 text-base text-paper-ink font-light leading-relaxed font-body max-w-md">
            Uma ida ao clube não começa nem termina na quadra. Estes são os
            quatro momentos que compõem a visita — do portão à mesa.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.15 } } }}
        >
          {/* Aquarela. A caixa declara a proporção do recorte comum, então a
              troca de figura não move nada em volta. O arrasto vive aqui: é o
              elemento grande e é onde o polegar cai. */}
          <motion.div
            className="lg:col-span-5 relative aspect-[1095/1430] max-h-[70svh] mx-auto w-full touch-pan-y"
            drag={semMovimento ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -ARRASTO) andar(1)
              else if (info.offset.x > ARRASTO) andar(-1)
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.picture
                key={atual.id}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, x: deslocamento }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -deslocamento }}
                transition={{ duration: duracao, ease }}
              >
                <source srcSet={atual.avif} sizes={TAMANHOS} type="image/avif" />
                <source srcSet={atual.webp} sizes={TAMANHOS} type="image/webp" />
                <img
                  src={atual.src}
                  srcSet={atual.webp}
                  sizes={TAMANHOS}
                  alt={atual.alt}
                  width={atual.w}
                  height={atual.h}
                  decoding="async"
                  draggable={false}
                  className="w-full h-full object-contain object-center select-none"
                />
              </motion.picture>
            </AnimatePresence>
          </motion.div>

          {/* Texto. `aria-live` porque o conteúdo troca sem que a página
              navegue: sem isso, quem usa leitor de tela clica em "seguinte" e
              não recebe nada de volta. */}
          <div className="lg:col-span-7 lg:pl-4">
            <div aria-live="polite" className="lg:min-h-[19rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={atual.id}
                  initial={{ opacity: 0, y: semMovimento ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: semMovimento ? 0 : -16 }}
                  transition={{ duration: duracao, ease }}
                >
                  <div className="flex items-baseline gap-4 mb-6">
                    <span
                      aria-hidden="true"
                      className="font-body text-[0.65rem] tracking-[0.2em] text-terracotta tabular-nums"
                    >
                      {atual.numero}
                    </span>
                    <span className="h-px flex-1 bg-paper-ink/25" />
                    <span className="text-[0.65rem] tracking-[0.16em] uppercase text-paper-ink font-light font-body">
                      {atual.meta}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-navy leading-tight text-balance">
                    {atual.nome}
                  </h3>

                  <p className="mt-6 text-base sm:text-lg text-paper-ink font-light leading-relaxed font-body max-w-lg">
                    {atual.texto}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <ControlesCarrossel
                campo="claro"
                rotulo="Tempo"
                onAnterior={() => andar(-1)}
                onProximo={() => andar(1)}
              />
              <span
                aria-hidden="true"
                className="text-[0.65rem] tracking-[0.2em] text-paper-ink/70 font-light font-body tabular-nums"
              >
                {atual.numero} / {String(tempos.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Trilho de etapas. O filete de 2px que cresce sobre a etapa ativa é a
            pontuação do sistema fazendo o trabalho de um indicador de progresso
            — sem inventar um componente novo para isso. */}
        <motion.nav
          aria-label="Tempos do dia"
          className="mt-14 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 border-t border-paper-ink/20"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{ visible: { opacity: 1, transition: { duration: 1, delay: 0.3 } } }}
        >
          {tempos.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => ir(i)}
              aria-current={i === ativo ? 'true' : undefined}
              className="group relative text-left py-6 pr-5 border-b border-paper-ink/15 sm:border-b-0 transition-colors duration-300 hover:bg-navy/[0.03] active:bg-navy/[0.05] [-webkit-tap-highlight-color:transparent]"
            >
              <span
                aria-hidden="true"
                className={`absolute top-0 left-0 h-[2px] bg-terracotta transition-all duration-700 ease-out ${
                  i === ativo ? 'w-full' : 'w-0 group-hover:w-6'
                }`}
              />
              <span
                aria-hidden="true"
                className={`block font-body text-[0.65rem] tracking-[0.2em] tabular-nums transition-colors duration-300 ${
                  i === ativo ? 'text-terracotta' : 'text-paper-ink/60'
                }`}
              >
                {t.numero}
              </span>
              <span
                className={`block mt-3 font-display text-xl sm:text-2xl font-light transition-colors duration-300 ${
                  i === ativo ? 'text-navy' : 'text-paper-ink group-hover:text-navy'
                }`}
              >
                {t.nome}
              </span>
            </button>
          ))}
        </motion.nav>
      </div>
    </section>
  )
}
