import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Grain from '../components/Grain'
import {
  CLUBE,
  pendente,
  urlWhatsapp,
  urlInstagram,
  urlEmail,
  urlMapa,
  urlComoChegar,
  linhaBairro,
} from '../config/clube'
import courtAerialAvif from '../assets/court-aerial.avif'
import courtAerialWebp from '../assets/court-aerial.webp'
import badgeWhite from '../assets/badge-white.svg'

/* ---------- Ícones inline (sem dependências) ---------- */
function IconPin(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...props}>
      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}
function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...props}>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 13l2 5v3a2 2 0 0 1-2 2 16 16 0 0 1-16-16 2 2 0 0 1 2-3Z" />
    </svg>
  )
}
function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6 8.5 6 8.5-6" />
    </svg>
  )
}
function IconClock(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}
function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IconWhatsapp(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...props}>
      <path d="M4 20l1.4-4A8 8 0 1 1 9 18.6L4 20Z" />
      <path d="M9 9c0 3 3 6 6 6l1.5-1.5-2-1-1 1c-1-.4-2.1-1.5-2.5-2.5l1-1-1-2L9 9Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

const ease = [0.25, 0.1, 0.25, 1]
const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease } },
}

/* Texto exibido enquanto o dado real não chega. */
const AGUARDANDO = 'Em breve'

const detalhes = [
  {
    Icon: IconPin,
    label: 'Endereço',
    valor: pendente(CLUBE.endereco) ? AGUARDANDO : CLUBE.endereco,
    sub: linhaBairro(),
  },
  {
    Icon: IconPhone,
    label: 'Telefone',
    valor: pendente(CLUBE.telefone) ? AGUARDANDO : CLUBE.telefone,
    sub: 'WhatsApp disponível',
  },
  { Icon: IconMail, label: 'E-mail', valor: CLUBE.email, sub: 'Resposta em até 24h' },
  { Icon: IconClock, label: 'Horário', valor: 'Todos os dias', sub: '6h às 23h' },
]

const canais = [
  {
    Icon: IconWhatsapp,
    label: 'WhatsApp',
    valor: pendente(CLUBE.telefone) ? AGUARDANDO : CLUBE.telefone,
    href: urlWhatsapp(),
  },
  {
    Icon: IconInstagram,
    label: 'Instagram',
    valor: pendente(CLUBE.instagram) ? AGUARDANDO : `@${CLUBE.instagram}`,
    href: urlInstagram(),
  },
  { Icon: IconMail, label: 'E-mail', valor: CLUBE.email, href: urlEmail() },
]

/* ===================== HERO ASSIMÉTRICO ===================== */
function Hero() {
  const whats = urlWhatsapp()

  return (
    <section className="relative bg-navy min-h-[88svh] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-terracotta z-20" />

      {/* Conteúdo */}
      <div className="lg:col-span-7 relative z-10 flex items-center px-6 sm:px-12 lg:px-20 pt-36 pb-20 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease }}
          className="max-w-xl"
        >
          <img src={badgeWhite} alt="" aria-hidden="true" width={48} height={48} className="w-12 h-12 mb-8 opacity-60" />
          <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta-on-dark font-light font-body mb-6">
            Contato · Fortaleza
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-cream leading-[0.95] tracking-wide">
            Vamos
            <br />
            <span className="italic text-cream/85">conversar?</span>
          </h1>
          <div className="w-16 h-[2px] bg-terracotta-on-dark my-8" />
          <p className="text-sm sm:text-base text-stone-light/85 font-light leading-relaxed font-body max-w-md text-balance">
            As portas do Sette estão abertas. Agende uma visita, conheça as quadras
            e sinta de perto o ambiente do clube.
          </p>

          {/* Enquanto não houver número real o CTA não vira link: um botão que
              abre uma conversa inexistente é pior que nenhum botão. */}
          {whats ? (
            <a
              href={whats}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-10 px-9 py-4 bg-terracotta text-cream text-[0.7rem] tracking-ultra-wide uppercase font-body font-light hover:bg-terracotta-light transition-all duration-500"
            >
              <IconWhatsapp className="w-4 h-4" />
              Agende um horário
            </a>
          ) : (
            <a
              href={urlEmail()}
              className="inline-flex items-center gap-3 mt-10 px-9 py-4 bg-terracotta text-cream text-[0.7rem] tracking-ultra-wide uppercase font-body font-light hover:bg-terracotta-light transition-all duration-500"
            >
              <IconMail className="w-4 h-4" />
              Agende um horário
            </a>
          )}
        </motion.div>
      </div>

      {/* Imagem */}
      <motion.div
        className="lg:col-span-5 relative min-h-[40svh] lg:min-h-full"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        <picture className="contents">
          <source srcSet={courtAerialAvif} type="image/avif" />
          <source srcSet={courtAerialWebp} type="image/webp" />
          <img
            src={courtAerialWebp}
            alt="Vista aérea da quadra de saibro com o brasão do Sette Racket Club gravado no piso"
            width={1600}
            height={1986}
            fetchpriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/30 to-transparent lg:from-navy lg:via-navy/10 lg:to-transparent" />
        <div className="absolute inset-0 bg-navy/20" />
      </motion.div>
    </section>
  )
}

/* ===================== DETALHES + MAPA ===================== */
function DetalhesEMapa() {
  const [ref, controls] = useScrollReveal(0.15)
  const mapa = urlMapa()
  const rota = urlComoChegar()

  return (
    <section className="bg-cream py-20 sm:py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
        {/* Lista editorial */}
        <motion.div initial="hidden" animate={controls} variants={reveal}>
          <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-6">
            Onde nos encontrar
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-navy leading-snug mb-10 text-balance">
            Tudo o que você precisa para chegar até nós
          </h2>

          <div className="divide-y divide-sand/70 border-t border-b border-sand/70">
            {detalhes.map(({ Icon, label, valor, sub }) => (
              <div
                key={label}
                className="group flex items-start gap-5 py-6 transition-all duration-500 hover:pl-2 motion-reduce:transition-none motion-reduce:hover:pl-0"
              >
                <span className="mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center border border-sand text-terracotta group-hover:border-terracotta group-hover:bg-terracotta group-hover:text-cream transition-all duration-500">
                  <Icon className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-[0.65rem] tracking-ultra-wide uppercase text-stone font-light font-body mb-1">{label}</p>
                  <p className="font-display text-xl sm:text-2xl font-light text-navy">{valor}</p>
                  <p className="text-sm text-stone font-light font-body">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mapa com tratamento de marca */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={controls}
          variants={{ visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease } } }}
          className="relative min-h-[360px] lg:min-h-0"
        >
          <div className="absolute -inset-2 sm:-inset-3 border border-terracotta/30 pointer-events-none z-10" />
          <div className="relative h-full w-full overflow-hidden bg-navy">
            {mapa ? (
              <iframe
                title="Localização do Sette Racket Club"
                src={mapa}
                className="absolute inset-0 w-full h-full"
                style={{ border: 0, filter: 'grayscale(1) contrast(1.05) brightness(0.95)' }}
                loading="lazy"
              />
            ) : (
              // Sem coordenada confirmada o painel não finge um pin: mostra a
              // marca e manda a rota por busca de endereço, que é exata.
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6">
                <Grain />
                <img src={badgeWhite} alt="" aria-hidden="true" width={80} height={80} className="relative w-20 h-20 opacity-30" />
                {rota && (
                  <a
                    href={rota}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex items-center gap-3 px-8 py-4 border border-terracotta-on-dark text-terracotta-on-dark text-[0.65rem] tracking-ultra-wide uppercase font-body font-light hover:bg-terracotta-on-dark hover:text-navy-deep transition-all duration-500"
                  >
                    <IconPin className="w-4 h-4" />
                    Como chegar
                  </a>
                )}
              </div>
            )}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-navy/30 via-transparent to-terracotta/10" />
            {/* Card flutuante */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-navy-deep/95 backdrop-blur-sm border border-terracotta/40 p-5">
              <p className="text-[0.65rem] tracking-ultra-wide uppercase text-terracotta-on-dark font-light font-body mb-2">{CLUBE.nome}</p>
              <p className="font-display text-lg text-cream font-light leading-snug">
                {pendente(CLUBE.endereco) ? 'Endereço em breve' : CLUBE.endereco}
              </p>
              <p className="text-xs text-stone-light/85 font-light font-body mt-1">{linhaBairro()}</p>
              {/* Um toque abre a rota no app de mapas do visitante — o embed
                  localiza, mas não navega. */}
              {rota && (
                <a
                  href={rota}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[0.6rem] tracking-ultra-wide uppercase text-terracotta-on-dark hover:text-cream font-body font-light transition-colors duration-300"
                >
                  <IconPin className="w-3.5 h-3.5" />
                  Como chegar
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ===================== HORÁRIOS ===================== */
function Horarios() {
  const [ref, controls] = useScrollReveal(0.2)

  return (
    <section className="bg-warm py-20 sm:py-28 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" animate={controls} variants={reveal} className="text-center mb-12">
          <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-6">
            Funcionamento
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-navy">Horários do clube</h2>
        </motion.div>

        <motion.div initial="hidden" animate={controls} variants={reveal} className="divide-y divide-sand/70 border-t border-b border-sand/70">
          {CLUBE.horarios.map((h) => (
            <div key={h.dia} className="flex items-baseline justify-between gap-6 py-5">
              <span className="font-display text-xl sm:text-2xl font-light text-navy">{h.dia}</span>
              <span aria-hidden="true" className="flex-1 mx-2 border-b border-dotted border-stone/70 translate-y-[-4px]" />
              <span className="text-sm sm:text-base text-stone font-light font-body tabular-nums whitespace-nowrap">{h.hora}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ===================== CANAIS ===================== */
function Canais() {
  const [ref, controls] = useScrollReveal(0.2)
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

  return (
    <section className="relative bg-navy py-24 sm:py-32 px-6 overflow-hidden" ref={ref}>
      <Grain />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-terracotta" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div initial="hidden" animate={controls} variants={reveal} className="text-center mb-14">
          <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta-on-dark font-light font-body mb-6">
            Fale com o Sette
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-cream">Escolha o seu canal</h2>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-cream/15 border border-cream/15" variants={container} initial="hidden" animate={controls}>
          {canais.map(({ Icon, label, valor, href }) => {
            const conteudo = (
              <>
                <span className="w-14 h-14 flex items-center justify-center border border-terracotta-on-dark/50 text-terracotta-on-dark group-hover:bg-terracotta-on-dark group-hover:text-navy-deep transition-all duration-500 mb-6">
                  <Icon className="w-6 h-6" />
                </span>
                <p className="text-[0.65rem] tracking-ultra-wide uppercase text-stone-light/85 font-light font-body mb-2">{label}</p>
                <p className="font-display text-lg text-cream font-light group-hover:text-terracotta-on-dark transition-colors duration-500">{valor}</p>
              </>
            )
            const classe = 'group bg-navy transition-colors duration-500 p-10 flex flex-col items-center text-center'

            // Canal sem dado real não vira link.
            return href ? (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                variants={reveal}
                className={`${classe} hover:bg-navy-light`}
              >
                {conteudo}
              </motion.a>
            ) : (
              <motion.div key={label} variants={reveal} className={classe}>
                {conteudo}
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-terracotta" />
    </section>
  )
}

export default function Contato() {
  return (
    <>
      <Hero />
      <DetalhesEMapa />
      <Horarios />
      <Canais />
    </>
  )
}
