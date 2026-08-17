import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import Exclusivity from '../components/Exclusivity'
import { useScrollReveal } from '../hooks/useScrollReveal'

// Duas modalidades, alinhadas com a Home e com o carrossel. Beach Tennis
// aparecia só aqui e em nenhum outro ponto do site.
const modalidades = [
  {
    nome: 'Tênis',
    desc: 'Saibro e piso rápido, com a manutenção e o cuidado de um clube de alto nível.',
  },
  {
    nome: 'Padel',
    desc: 'Quadras de padrão internacional, com vidro temperado e iluminação profissional para jogo em qualquer horário.',
  },
]

function Modalidades() {
  const [ref, controls] = useScrollReveal(0.15)
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }
  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
  }

  return (
    <section className="py-24 sm:py-32 px-6 bg-cream" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-6">
            Modalidades
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-navy text-balance">
            Esporte em alto padrão
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate={controls}
        >
          {modalidades.map((m, i) => (
            <motion.div
              key={m.nome}
              variants={item}
              className="group p-8 sm:p-10 bg-warm border border-sand/60 hover:border-terracotta/40 transition-all duration-500"
            >
              <span
                aria-hidden="true"
                className="font-display text-5xl font-light text-sand-deep/70 group-hover:text-terracotta/40 transition-colors duration-500"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="w-8 h-[2px] bg-terracotta my-6 transition-all duration-500 group-hover:w-12" />
              <h3 className="font-display text-2xl font-medium text-navy mb-4">{m.nome}</h3>
              <p className="text-sm text-stone font-light leading-relaxed font-body">{m.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default function OEspaco() {
  return (
    <>
      <PageHero
        eyebrow="O Espaço"
        title="Arquitetura a serviço do jogo"
        subtitle="Quadras, áreas sociais e circulação desenhadas como uma só experiência."
      />
      <Modalidades />
      <Exclusivity />
    </>
  )
}
