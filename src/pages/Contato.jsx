import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import courtAerial from '../assets/court-aerial.png'
import badgeWhite from '../assets/badge-white.svg'

/* ---------- Ícones inline (sem dependências) ---------- */
function IconPin(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}
function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 13l2 5v3a2 2 0 0 1-2 2 16 16 0 0 1-16-16 2 2 0 0 1 2-3Z" />
    </svg>
  )
}
function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6 8.5 6 8.5-6" />
    </svg>
  )
}
function IconClock(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}
function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IconWhatsapp(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
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

/* Coordenadas de Fortaleza — ajustar para o endereço real do clube. */
const MAP_SRC =
  'https://www.openstreetmap.org/export/embed.html?bbox=-38.5600%2C-3.7600%2C-38.4900%2C-3.7100&layer=mapnik&marker=-3.7319%2C-38.5267'

const detalhes = [
  { Icon: IconPin, label: 'Endereço', valor: 'Av. Beira Mar, 1000', sub: 'Fortaleza — Ceará' },
  { Icon: IconPhone, label: 'Telefone', valor: '(85) 0000-0000', sub: 'WhatsApp disponível' },
  { Icon: IconMail, label: 'E-mail', valor: 'contato@setteracketclub.com', sub: 'Resposta em até 24h' },
  { Icon: IconClock, label: 'Horário', valor: 'Todos os dias', sub: '6h às 23h' },
]

const horarios = [
  { dia: 'Segunda — Sexta', hora: '06h00 — 23h00' },
  { dia: 'Sábado', hora: '07h00 — 22h00' },
  { dia: 'Domingo & feriados', hora: '07h00 — 20h00' },
]

const canais = [
  { Icon: IconWhatsapp, label: 'WhatsApp', valor: '(85) 0000-0000', href: 'https://wa.me/5585000000000' },
  { Icon: IconInstagram, label: 'Instagram', valor: '@setteracketclub', href: 'https://instagram.com/setteracketclub' },
  { Icon: IconMail, label: 'E-mail', valor: 'contato@setteracketclub.com', href: 'mailto:contato@setteracketclub.com' },
]

/* ===================== HERO ASSIMÉTRICO ===================== */
function Hero() {
  return (
    <section className="relative bg-navy min-h-[88vh] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-terracotta z-20" />

      {/* Conteúdo */}
      <div className="lg:col-span-7 relative z-10 flex items-center px-6 sm:px-12 lg:px-20 pt-36 pb-20 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease }}
          className="max-w-xl"
        >
          <img src={badgeWhite} alt="" aria-hidden="true" className="w-12 h-12 mb-8 opacity-50" />
          <span className="inline-block text-[0.6rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-6">
            Contato · Fortaleza
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-cream leading-[0.95] tracking-wide">
            Vamos
            <br />
            <span className="italic text-cream/80">conversar?</span>
          </h1>
          <div className="w-16 h-[2px] bg-terracotta my-8" />
          <p className="text-sm sm:text-base text-stone/70 font-light leading-relaxed font-body max-w-md">
            As portas do Sette estão abertas. Agende uma visita, conheça as quadras
            e sinta de perto o ambiente do clube.
          </p>
          <a
            href="https://wa.me/5585000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-10 px-9 py-4 bg-terracotta text-cream text-[0.7rem] tracking-ultra-wide uppercase font-body font-light hover:bg-terracotta-light transition-all duration-500"
          >
            <IconWhatsapp className="w-4 h-4" />
            Agende um horário
          </a>
        </motion.div>
      </div>

      {/* Imagem */}
      <motion.div
        className="lg:col-span-5 relative min-h-[40vh] lg:min-h-full"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        <img src={courtAerial} alt="Quadras do Sette Racket Club vistas de cima" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/30 to-transparent lg:bg-gradient-to-r lg:from-navy lg:via-navy/10 lg:to-transparent" />
        <div className="absolute inset-0 bg-navy/20" />
      </motion.div>
    </section>
  )
}

/* ===================== DETALHES + MAPA ===================== */
function DetalhesEMapa() {
  const [ref, controls] = useScrollReveal(0.15)

  return (
    <section className="bg-cream py-20 sm:py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
        {/* Lista editorial */}
        <motion.div initial="hidden" animate={controls} variants={reveal}>
          <span className="inline-block text-[0.6rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-6">
            Onde nos encontrar
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-navy leading-snug mb-10">
            Tudo o que você precisa para chegar até nós
          </h2>

          <div className="divide-y divide-sand/70 border-t border-b border-sand/70">
            {detalhes.map(({ Icon, label, valor, sub }) => (
              <div
                key={label}
                className="group flex items-start gap-5 py-6 transition-all duration-500 hover:pl-2"
              >
                <span className="mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center border border-sand/70 text-terracotta group-hover:border-terracotta group-hover:bg-terracotta group-hover:text-cream transition-all duration-500">
                  <Icon className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-[0.6rem] tracking-ultra-wide uppercase text-stone font-light font-body mb-1">{label}</p>
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
          <div className="absolute -inset-2 sm:-inset-3 border border-terracotta/20 pointer-events-none z-10" />
          <div className="relative h-full w-full overflow-hidden bg-navy">
            <iframe
              title="Localização do Sette Racket Club"
              src={MAP_SRC}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0, filter: 'grayscale(1) contrast(1.05) brightness(0.95)' }}
              loading="lazy"
            />
            {/* Tinte navy sutil (não bloqueia interação) */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-navy/30 via-transparent to-terracotta/10" />
            {/* Card flutuante */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-navy-deep/95 backdrop-blur-sm border border-terracotta/30 p-5 pointer-events-none">
              <p className="text-[0.55rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-2">Sette Racket Club</p>
              <p className="font-display text-lg text-cream font-light leading-snug">Av. Beira Mar, 1000</p>
              <p className="text-xs text-stone/70 font-light font-body mt-1">Fortaleza — Ceará</p>
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
          <span className="inline-block text-[0.6rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-6">
            Funcionamento
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-navy">Horários do clube</h2>
        </motion.div>

        <motion.div initial="hidden" animate={controls} variants={reveal} className="divide-y divide-sand/70 border-t border-b border-sand/70">
          {horarios.map((h) => (
            <div key={h.dia} className="flex items-baseline justify-between gap-6 py-5">
              <span className="font-display text-xl sm:text-2xl font-light text-navy">{h.dia}</span>
              <span className="flex-1 mx-2 border-b border-dotted border-stone/30 translate-y-[-4px]" />
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
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-terracotta" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div initial="hidden" animate={controls} variants={reveal} className="text-center mb-14">
          <span className="inline-block text-[0.6rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-6">
            Fale com o Sette
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-cream">Escolha o seu canal</h2>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-cream/10 border border-cream/10" variants={container} initial="hidden" animate={controls}>
          {canais.map(({ Icon, label, valor, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              variants={reveal}
              className="group bg-navy hover:bg-navy-light transition-colors duration-500 p-10 flex flex-col items-center text-center"
            >
              <span className="w-14 h-14 flex items-center justify-center border border-terracotta/40 text-terracotta group-hover:bg-terracotta group-hover:text-cream transition-all duration-500 mb-6">
                <Icon className="w-6 h-6" />
              </span>
              <p className="text-[0.6rem] tracking-ultra-wide uppercase text-stone/60 font-light font-body mb-2">{label}</p>
              <p className="font-display text-lg text-cream font-light group-hover:text-terracotta-light transition-colors duration-500">{valor}</p>
            </motion.a>
          ))}
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
