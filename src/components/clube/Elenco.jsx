import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useCarrossel } from '../../hooks/useCarrossel'
import { elenco } from '../../data/elenco'
import Grain from '../Grain'

const ease = [0.25, 0.1, 0.25, 1]

// Larguras reais dos dois slots: o retrato em destaque ocupa a coluna de 4/12
// no desktop e um bloco contido no empilhado; a miniatura é fixa em 96px, e em
// 72px no celular.
const TAMANHOS = '(min-width: 1024px) 350px, 17rem'
const TAMANHO_MINIATURA = '(min-width: 640px) 96px, 72px'
const ARRASTO = 60

/** Um retrato do elenco. O losango vem no próprio arquivo, com fundo alfa. */
function Retrato({ pessoa, sizes, className, loading, alt }) {
  return (
    <picture className="contents">
      <source srcSet={pessoa.avif} sizes={sizes} type="image/avif" />
      <source srcSet={pessoa.webp} sizes={sizes} type="image/webp" />
      <img
        src={pessoa.src}
        srcSet={pessoa.webp}
        sizes={sizes}
        alt={alt}
        width={pessoa.w}
        height={pessoa.h}
        loading={loading}
        decoding="async"
        draggable={false}
        className={className}
      />
    </picture>
  )
}

/**
 * O elenco do clube.
 *
 * Os retratos vêm recortados sobre um losango de fundo transparente — a mesma
 * geometria a 45° que o sistema já usa como divisor decorativo. É por isso que
 * a seção é navy: sobre campo escuro o losango aparece como aresta branca e
 * plano tonal, sem precisar de moldura, sombra ou máscara.
 *
 * Uma grade de cinco cartões daria conta dos nomes, mas não das credenciais —
 * as fichas trazem de quatro a seis linhas cada, e comprimidas num cartão elas
 * viram ruído. Aqui o trilho mostra o elenco inteiro de uma vez e o destaque
 * abre um de cada vez, com a ficha inteira legível.
 *
 * A seção não tem setas nem contador. O trilho já mostra quantos são, quem é o
 * ativo e leva a qualquer um em um toque; um par de botões ao lado disso é o
 * mesmo controle duas vezes. O arrasto no retrato e as setas do teclado
 * continuam funcionando. Onde o carrossel é o assunto principal da página, como
 * em "Um dia no Sette", as setas se justificam; aqui elas só ocupavam altura.
 */
export default function Elenco() {
  const [ref, controls] = useScrollReveal(0.1)
  const { ativo, sentido, ir, andar, aoTeclar } = useCarrossel(elenco.length)
  const semMovimento = useReducedMotion()
  const atual = elenco[ativo]

  const deslocamento = semMovimento ? 0 : 24 * sentido
  const duracao = semMovimento ? 0 : 0.5

  return (
    <section
      className="relative bg-navy overflow-hidden py-20 sm:py-24 lg:py-28 px-6 sm:px-10"
      aria-roledescription="carrossel"
      aria-label="Elenco do Sette Racket Club"
      onKeyDown={aoTeclar}
      ref={ref}
    >
      <Grain />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-terracotta" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
        >
          <div className="lg:col-span-7">
            <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta-on-dark font-light font-body mb-6">
              Quem ensina
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-cream leading-tight text-balance">
              Elenco Sette Racket Club
            </h2>
            <div className="w-12 h-[2px] bg-terracotta-on-dark/70 mt-8" />
          </div>
          <p className="lg:col-span-5 text-sm text-stone-light/85 font-light leading-relaxed font-body max-w-md">
            Cinco profissionais assinam o trabalho de quadra no Sette, do
            primeiro contato com a raquete à preparação de quem compete.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.15 } } }}
        >
          <motion.div
            className="lg:col-span-4 relative aspect-square w-full max-w-[17rem] lg:max-w-none mx-auto touch-pan-y"
            drag={semMovimento ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -ARRASTO) andar(1)
              else if (info.offset.x > ARRASTO) andar(-1)
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={atual.id}
                className="absolute inset-0"
                initial={{ opacity: 0, x: deslocamento }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -deslocamento }}
                transition={{ duration: duracao, ease }}
              >
                <Retrato
                  pessoa={atual}
                  sizes={TAMANHOS}
                  alt={`${atual.nome}, ${atual.papel.toLowerCase()} no Sette Racket Club`}
                  loading="lazy"
                  className="w-full h-full object-contain select-none"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="lg:col-span-8">
            <div aria-live="polite" className="lg:min-h-[15rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={atual.id}
                  initial={{ opacity: 0, y: semMovimento ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: semMovimento ? 0 : -16 }}
                  transition={{ duration: duracao, ease }}
                >
                  <span className="inline-block text-[0.65rem] tracking-[0.2em] uppercase text-terracotta-on-dark font-light font-body">
                    {atual.papel}
                  </span>

                  <h3 className="mt-3 font-display text-2xl sm:text-3xl font-light text-cream leading-tight text-balance">
                    {atual.nome}
                  </h3>

                  <div className="w-10 h-[2px] bg-terracotta-on-dark/70 my-6" />

                  <p className="text-sm sm:text-base text-cream/80 font-light leading-relaxed font-body max-w-xl">
                    {atual.resumo}
                  </p>

                  {/* A ficha, abaixo do resumo. Sem marcador: cinco losangos de
                      6px por pessoa somavam vinte e cinco enfeites numa seção
                      que já tem o losango grande do retrato. A quebra de linha
                      basta para separar uma credencial da outra. */}
                  <ul className="mt-6 space-y-1.5 max-w-xl">
                    {atual.credenciais.map((c) => (
                      <li
                        key={c}
                        className="text-sm text-stone-light/70 font-light leading-relaxed font-body"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Trilho: o elenco inteiro visível de uma vez, e a única navegação da
            seção. Miniaturas de largura fixa e pequena; no celular ele rola na
            horizontal em vez de espremer cinco losangos em 320px. */}
        <motion.nav
          aria-label="Profissionais do elenco"
          className="mt-12 sm:mt-14 pt-8 border-t border-cream/15 flex gap-4 sm:gap-6 overflow-x-auto snap-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{ visible: { opacity: 1, transition: { duration: 1, delay: 0.3 } } }}
        >
          {elenco.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => ir(i)}
              aria-current={i === ativo ? 'true' : undefined}
              aria-label={p.nome}
              className="group shrink-0 snap-start w-[4.5rem] sm:w-24 text-left [-webkit-tap-highlight-color:transparent]"
            >
              <Retrato
                pessoa={p}
                sizes={TAMANHO_MINIATURA}
                alt=""
                loading="lazy"
                className={`w-full h-auto transition-opacity duration-500 ${
                  i === ativo ? 'opacity-100' : 'opacity-45 group-hover:opacity-80'
                }`}
              />
              <span
                aria-hidden="true"
                className={`block h-[2px] bg-terracotta-on-dark transition-all duration-500 ease-out ${
                  i === ativo ? 'w-full' : 'w-0 group-hover:w-5'
                }`}
              />
              {/* Só o primeiro nome: o nome inteiro quebrava em três linhas
                  numa miniatura de 96px e o trilho ficava mais alto que as
                  próprias fotos. O nome completo está no `aria-label` e no
                  destaque logo acima. */}
              <span
                aria-hidden="true"
                className={`block mt-2.5 text-[0.65rem] tracking-[0.16em] uppercase font-light font-body transition-colors duration-300 ${
                  i === ativo ? 'text-cream' : 'text-stone-light/70 group-hover:text-cream'
                }`}
              >
                {p.nome.split(' ')[0]}
              </span>
            </button>
          ))}
        </motion.nav>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-terracotta" />
    </section>
  )
}
