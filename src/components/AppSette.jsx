import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Grain from './Grain'
import BotoesLoja from './BotoesLoja'
import { temApp, urlWhatsapp, CLUBE } from '../config/clube'
import { usePlataforma } from '../hooks/usePlataforma'
import qrApp from '../assets/qr-app.svg'
import badgeNavy from '../assets/badge-navy.svg'
import badgeWhite from '../assets/badge-white.svg'

/**
 * O app de reservas do clube.
 *
 * Existe em dois campos porque aparece em duas páginas com vizinhanças
 * diferentes — escuro na Home, depois de Pillars; claro em Contato, entre
 * Horários e Canais. A Regra do Campo Alternado decide qual, não o gosto.
 *
 * O selo mostrado é o `badge-*.svg` do próprio projeto, e não a arte baixada
 * da loja: o ícone do app já é o selo da marca, então a versão vetorial é a
 * mesma imagem sem o peso de um PNG nem o canto arredondado da loja.
 */

// O que a ficha das lojas de fato promete. Nada além disso é acrescentado aqui.
const RECURSOS = ['Reservas', 'Horários', 'Ranking', 'Campeonatos', 'Agenda']

const ease = [0.25, 0.1, 0.25, 1]
const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease } },
}

const CAMPOS = {
  escuro: {
    secao: 'bg-navy',
    eyebrow: 'text-terracotta-on-dark',
    titulo: 'text-cream',
    filete: 'bg-terracotta-on-dark',
    corpo: 'text-stone-light/85',
    apoio: 'text-stone-light/70',
    moldura: 'border-cream/20',
    selo: badgeWhite,
    recurso: 'text-stone-light/80',
    losango: 'border-terracotta-on-dark/60',
    link: 'text-terracotta-on-dark hover:text-cream',
    aresta: 'bg-terracotta',
  },
  // `quente` e `claro` só diferem no campo: os acentos são os mesmos porque
  // ambos são campo claro. Existem duas porque a alternância de seções vizinhas
  // às vezes pede cal e às vezes cal aquecida.
  quente: {
    secao: 'bg-warm',
    eyebrow: 'text-terracotta',
    titulo: 'text-navy',
    filete: 'bg-terracotta',
    corpo: 'text-stone',
    apoio: 'text-stone',
    moldura: 'border-sand',
    selo: badgeNavy,
    recurso: 'text-stone',
    losango: 'border-terracotta/60',
    link: 'text-terracotta hover:text-navy',
    aresta: null,
  },
  claro: {
    secao: 'bg-cream',
    eyebrow: 'text-terracotta',
    titulo: 'text-navy',
    filete: 'bg-terracotta',
    corpo: 'text-stone',
    apoio: 'text-stone',
    moldura: 'border-sand',
    selo: badgeNavy,
    recurso: 'text-stone',
    losango: 'border-terracotta/60',
    link: 'text-terracotta hover:text-navy',
    aresta: null,
  },
}

export default function AppSette({ campo = 'claro', id = 'app-sette' }) {
  const [ref, controls] = useScrollReveal(0.2)
  const t = CAMPOS[campo]
  const whats = urlWhatsapp()
  const plataforma = usePlataforma()

  // Sem link real de loja a seção inteira não existe — melhor ausente que
  // anunciando um app que o visitante não consegue baixar.
  if (!temApp()) return null

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={`${id}-titulo`}
      className={`relative scroll-mt-28 px-6 py-20 sm:py-28 overflow-hidden ${t.secao}`}
    >
      {campo === 'escuro' && <Grain />}
      {t.aresta && <div className={`absolute top-0 left-0 w-full h-[2px] ${t.aresta}`} />}

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Selo: o ícone do app, em moldura reta. A loja arredonda; nós não. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={controls}
          variants={{ visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease } } }}
          className="lg:col-span-4 flex justify-center lg:justify-start"
        >
          <div className={`border ${t.moldura} p-8 sm:p-10`}>
            <img
              src={t.selo}
              alt=""
              aria-hidden="true"
              width={128}
              height={128}
              loading="lazy"
              className="w-24 h-24 sm:w-32 sm:h-32"
            />
          </div>
        </motion.div>

        {/* Texto e lojas */}
        <motion.div initial="hidden" animate={controls} variants={reveal} className="lg:col-span-8">
          <span
            className={`inline-block text-[0.65rem] tracking-ultra-wide uppercase font-light font-body mb-6 ${t.eyebrow}`}
          >
            Reserva pelo app
          </span>

          <h2
            id={`${id}-titulo`}
            className={`font-display text-3xl sm:text-4xl font-light leading-snug text-balance ${t.titulo}`}
          >
            Reserve sua quadra pelo aplicativo
          </h2>

          <div className={`w-12 h-[2px] my-7 ${t.filete}`} />

          <p className={`text-sm sm:text-base font-light leading-relaxed font-body max-w-xl text-balance ${t.corpo}`}>
            Reservar quadra no Sette se faz pelo app, e ele é gratuito nas duas
            lojas. Nele você vê os horários livres, reserva, acompanha o ranking e
            se inscreve nos campeonatos do clube.
          </p>

          {/* Só o que a ficha das lojas promete. */}
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-7">
            {RECURSOS.map((r, i) => (
              <li key={r} className="flex items-center gap-4">
                {i > 0 && (
                  <span aria-hidden="true" className={`w-1.5 h-1.5 border rotate-45 ${t.losango}`} />
                )}
                <span
                  className={`text-[0.65rem] tracking-ultra-wide uppercase font-light font-body ${t.recurso}`}
                >
                  {r}
                </span>
              </li>
            ))}
          </ul>

          <BotoesLoja campo={campo} modo="auto" className="mt-9" />

          {/* O QR só existe onde ele resolve alguma coisa. Num celular o app
              está a um toque de distância e o código seria o gesto mais longo;
              num desktop ele é o único caminho, porque o app não se instala
              ali. Ele aponta para /app, que decide a loja pelo aparelho de quem
              aponta a câmera — um código impresso não tem como saber isso.

              A placa é Cal mesmo no campo escuro: leitor de QR espera módulo
              escuro sobre fundo claro, e legibilidade aqui vem antes da
              alternância de campo. */}
          {plataforma === 'desconhecida' && (
            <div className="mt-9 flex items-center gap-5">
              <div className="flex-shrink-0 bg-cream border border-sand p-3">
                <img src={qrApp} alt="" aria-hidden="true" width={96} height={96} className="w-24 h-24" />
              </div>
              <div>
                <p className={`text-sm font-light leading-relaxed font-body ${t.corpo}`}>
                  Aponte a câmera do celular para baixar.
                </p>
                <p
                  className={`mt-2 text-[0.65rem] tracking-ultra-wide uppercase font-light font-body ${t.eyebrow}`}
                >
                  {CLUBE.site.replace('https://', '')}/app
                </p>
              </div>
            </div>
          )}

          {/* A segunda porta continua aberta, e o site não finge o contrário. */}
          {whats && (
            <p className={`mt-7 text-sm font-light font-body ${t.apoio}`}>
              Prefere conversar?{' '}
              <a
                href={whats}
                target="_blank"
                rel="noopener noreferrer"
                className={`underline underline-offset-4 decoration-1 transition-colors duration-300 ${t.link}`}
              >
                Reserve pelo WhatsApp
              </a>
              .
            </p>
          )}
        </motion.div>
      </div>

      {t.aresta && <div className={`absolute bottom-0 left-0 w-full h-[2px] ${t.aresta}`} />}
    </section>
  )
}
