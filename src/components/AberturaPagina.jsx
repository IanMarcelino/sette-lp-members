import { motion, useReducedMotion } from 'framer-motion'
import Grain from './Grain'

const ease = [0.25, 0.1, 0.25, 1]

// A imagem ocupa 7 das 12 colunas e sangra até a borda da janela, então o slot
// é uma fração da largura da tela, não um número fixo. No empilhado ela é uma
// faixa de largura total.
const TAMANHOS = '(min-width: 1024px) 58vw, 100vw'

/**
 * Abertura das páginas internas.
 *
 * Substitui o antigo `PageHero`, que era o retângulo de sempre: campo escuro
 * chapado, brasão centrado, título e linha de apoio empilhados no eixo. Ele
 * funcionava, mas não mostrava nada — e a abertura é a vitrine da página.
 *
 * O desenho vem da abertura de "O Espaço", que é a única do site que já fugia
 * disso: texto à esquerda numa coluna estreita, matéria à direita ocupando o
 * resto. Aqui a matéria é fotográfica em vez de aquarelada, então ela **sangra
 * até a borda da janela** e se dissolve no campo pela aresta interna, a que
 * encosta no texto. É a dissolução que separa isto de um banner: a imagem não
 * tem moldura, não tem retângulo, não termina — ela vira o fundo da seção.
 *
 * O véu segue a Regra do Véu, mas na cor do campo em que a imagem se dissolve:
 * navy no escuro, cal aquecida no claro. Fotografia nenhuma aparece crua, e o
 * véu navy sobre o barro do brasão apagaria justamente a matéria que a imagem
 * existe para mostrar.
 *
 * A primeira faixa do véu é opaca de propósito — `from-[14%]` em vez de
 * `from-0%`. Com a rampa começando na aresta, a imagem já aparece a 2% de
 * transparência nos primeiros pixels e a borda da coluna vira uma linha
 * vertical visível contra o campo chapado. Segurando o véu cheio por um sexto
 * da largura, a aresta some e a dissolução vira dissolução.
 *
 * `titulo` recebe as quebras já postas. Três linhas curtas empilhadas é o que
 * deixa o Cormorant chegar a 72px numa coluna de 400px — a mesma decisão de
 * "Do saibro / ao jardim".
 */
const CAMPO = {
  claro: {
    secao: 'bg-warm',
    eyebrow: 'text-terracotta',
    titulo: 'text-navy',
    texto: 'text-stone',
    // Pontuação sob o título: token de barro do campo, como manda a Regra das
    // Duas Faces. A aresta de largura total da seção fica de fora disso — ela
    // é sempre barro batido, no claro e no escuro, como já é em toda seção.
    filete: 'bg-terracotta',
    // No empilhado a dissolução é para baixo, onde a faixa encontra o texto;
    // no desktop é para a direita, a partir da aresta que encosta na coluna.
    // A ponta oposta nunca chega a zero: fotografia crua não existe no sistema.
    veu: 'bg-gradient-to-t from-warm from-[10%] via-warm/35 via-[40%] to-warm/10 lg:bg-gradient-to-r lg:from-warm lg:from-[14%] lg:via-warm/40 lg:via-[48%] lg:to-warm/10',
    grao: false,
  },
  escuro: {
    secao: 'bg-navy-deep',
    eyebrow: 'text-terracotta-on-dark',
    titulo: 'text-cream',
    texto: 'text-stone-light/85',
    filete: 'bg-terracotta-on-dark/70',
    veu: 'bg-gradient-to-t from-navy-deep from-[10%] via-navy-deep/55 via-[40%] to-navy-deep/25 lg:bg-gradient-to-r lg:from-navy-deep lg:from-[14%] lg:via-navy-deep/55 lg:via-[48%] lg:to-navy-deep/15',
    grao: true,
  },
}

export default function AberturaPagina({ campo = 'claro', eyebrow, titulo, texto, imagem }) {
  const c = CAMPO[campo]
  const semMovimento = useReducedMotion()

  return (
    <section className={`relative overflow-hidden ${c.secao}`}>
      <div className="absolute top-0 inset-x-0 h-[2px] z-30 bg-terracotta" />

      {/* Altura de tela cheia, como a hero da Home. A 78svh sobrava uma fresta
          da seção seguinte no rodapé da janela, e numa tela larga aquilo não
          lia como convite para rolar: lia como imagem cortada. Uma abertura ou
          toma a tela ou não é abertura. */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-svh">
        {/* Texto primeiro no DOM — o h1 é a primeira coisa que a página
            anuncia —, mas embaixo da imagem no empilhado. */}
        <div className="relative z-10 order-2 lg:order-1 lg:col-span-5 flex items-center">
          <motion.div
            className="w-full px-6 sm:px-10 lg:pl-16 xl:pl-24 lg:pr-10 py-14 sm:py-20 lg:py-28"
            initial={semMovimento ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
          >
            <span
              className={`inline-block text-[0.65rem] tracking-ultra-wide uppercase font-light font-body mb-7 sm:mb-9 ${c.eyebrow}`}
            >
              {eyebrow}
            </span>

            <h1
              className={`font-display text-4xl xs:text-5xl sm:text-6xl xl:text-7xl baixa:text-3xl font-light leading-[1.02] tracking-tight ${c.titulo}`}
            >
              {titulo}
            </h1>

            <div className={`w-16 h-[2px] my-8 sm:my-10 baixa:my-5 ${c.filete}`} />

            <p
              className={`text-base sm:text-lg font-light leading-relaxed font-body max-w-md ${c.texto}`}
            >
              {texto}
            </p>
          </motion.div>
        </div>

        {/* Matéria. `min-h` em `svh` para que um celular deitado não receba uma
            faixa da altura da tela inteira antes de qualquer palavra. */}
        <motion.div
          className="relative order-1 lg:order-2 lg:col-span-7 min-h-[44svh] lg:min-h-0"
          initial={semMovimento ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease }}
        >
          <picture className="contents">
            <source srcSet={imagem.avif} sizes={TAMANHOS} type="image/avif" />
            <source srcSet={imagem.webp} sizes={TAMANHOS} type="image/webp" />
            <img
              src={imagem.src}
              srcSet={imagem.webp}
              sizes={TAMANHOS}
              alt={imagem.alt}
              width={imagem.w}
              height={imagem.h}
              // Maior elemento acima da dobra da página: nada de lazy aqui.
              fetchpriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </picture>

          <div className={`absolute inset-0 ${c.veu}`} />
          {c.grao && <Grain />}
        </motion.div>
      </div>
    </section>
  )
}
