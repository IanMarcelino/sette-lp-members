import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { urlWhatsapp } from '../config/clube'

/**
 * Botão flutuante do WhatsApp.
 *
 * **É a exceção declarada à Regra do Canto Reto e à Regra do Plano.** Redondo e
 * com sombra, como o padrão que todo mundo já reconhece — decisão tomada com o
 * cliente, ciente de que contraria o invariante mais duro do sistema. A regra
 * segue valendo para todo o resto: esta é a única superfície arredondada e a
 * segunda sombra do projeto, e nenhuma das duas serve de precedente.
 *
 * O que ele **não** abre mão é da Regra da Voz Única: o campo é Barro Batido,
 * não o verde do WhatsApp. Um segundo acento apareceria em todas as páginas,
 * sempre por cima, e passaria a ser a cor mais constante do site — o glifo já
 * carrega o reconhecimento sozinho.
 *
 * Campo sólido, e não contorno de 1px como manda o botão ghost: este flutua
 * sobre fotografia, saibro claro, navy e cal ao longo da rolagem, e só o
 * preenchimento o mantém legível em todos eles.
 *
 * Só entra depois da primeira tela. Sobre a hero ele disputaria com os CTAs
 * que já estão ali, e a hero é justamente onde o site já diz o que fazer.
 */

const LIMIAR = 0.9 // frações da altura da janela roladas antes de aparecer

function GlifoWhatsapp(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488" />
    </svg>
  )
}

export default function BotaoWhatsapp() {
  const [visivel, setVisivel] = useState(false)
  const semMovimento = useReducedMotion()
  const { pathname } = useLocation()
  const whats = urlWhatsapp()

  useEffect(() => {
    const avaliar = () => setVisivel(window.scrollY > window.innerHeight * LIMIAR)
    avaliar() // quem chega por âncora já entra rolado
    window.addEventListener('scroll', avaliar, { passive: true })
    window.addEventListener('resize', avaliar)
    return () => {
      window.removeEventListener('scroll', avaliar)
      window.removeEventListener('resize', avaliar)
    }
  }, [])

  // Sem número real não existe botão — mesma regra do resto do site.
  if (!whats) return null
  // `/app` só redireciona para a loja; um CTA flutuante ali é ruído.
  if (pathname === '/app') return null

  return (
    <motion.a
      href={whats}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o Sette Racket Club no WhatsApp — abre em nova aba"
      initial={false}
      animate={{
        opacity: visivel ? 1 : 0,
        y: visivel || semMovimento ? 0 : 12,
      }}
      // O deslocamento do hover vive aqui, e não numa classe `hover:-translate-y`:
      // o framer escreve `transform` no style inline, que venceria a classe.
      whileHover={semMovimento ? undefined : { y: -4 }}
      whileTap={semMovimento ? undefined : { scale: 0.94 }}
      transition={{ duration: semMovimento ? 0.15 : 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      // `pointer-events` acompanha a opacidade: invisível não pode ser clicável.
      style={{
        pointerEvents: visivel ? 'auto' : 'none',
        right: 'max(1.5rem, env(safe-area-inset-right, 0px))',
        bottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px))',
      }}
      className="fixed z-40 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-cream shadow-[0_8px_24px_-6px_rgba(20,29,40,0.45)] transition-[background-color,box-shadow] duration-500 ease-out hover:bg-terracotta-light hover:shadow-[0_14px_32px_-8px_rgba(20,29,40,0.55)] active:bg-terracotta-light [-webkit-tap-highlight-color:transparent]"
    >
      <GlifoWhatsapp className="h-7 w-7" />
    </motion.a>
  )
}
