import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Grain from '../components/Grain'
import BotoesLoja from '../components/BotoesLoja'
import { usePlataforma } from '../hooks/usePlataforma'
import { urlAppStore, urlPlayStore } from '../config/clube'
import badgeWhite from '../assets/badge-white.svg'

/**
 * `/app` — a rota que o QR aponta.
 *
 * Um código impresso não sabe quem o está lendo. Esta página sabe: detecta o
 * aparelho e manda para a loja certa. Num desktop, onde não há aparelho a
 * detectar nem app a instalar, ela para e mostra as duas lojas.
 *
 * O redirecionamento usa `replace` para não empilhar histórico: quem voltar
 * depois de instalar volta para onde estava antes do QR, e não para uma página
 * que só redireciona de novo.
 */
export default function BaixarApp() {
  const plataforma = usePlataforma()

  useEffect(() => {
    const destino =
      plataforma === 'ios' ? urlAppStore() : plataforma === 'android' ? urlPlayStore() : null
    if (destino) window.location.replace(destino)
  }, [plataforma])

  const redirecionando = plataforma === 'ios' || plataforma === 'android'

  return (
    <section className="relative bg-navy min-h-svh flex items-center justify-center overflow-hidden px-6 py-32">
      <Grain />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-terracotta" />

      <div className="relative z-10 w-full max-w-lg text-center">
        <img
          src={badgeWhite}
          alt=""
          aria-hidden="true"
          width={72}
          height={72}
          className="w-16 h-16 sm:w-18 sm:h-18 mx-auto mb-8 opacity-60"
        />

        <span className="inline-block text-[0.65rem] tracking-ultra-wide uppercase text-terracotta-on-dark font-light font-body mb-6">
          App do clube
        </span>

        <h1 className="font-display text-3xl sm:text-4xl font-light text-cream leading-snug text-balance">
          {redirecionando ? 'Abrindo a loja…' : 'Baixe o app do Sette'}
        </h1>

        <div className="w-12 h-[2px] bg-terracotta-on-dark mx-auto my-7" />

        {/* `aria-live` porque o texto troca sozinho depois da detecção. */}
        <p
          aria-live="polite"
          className="text-sm sm:text-base text-stone-light/85 font-light leading-relaxed font-body text-balance"
        >
          {redirecionando
            ? 'Se a loja não abrir sozinha, use o botão abaixo.'
            : 'Reserve quadra, veja horários livres e acompanhe o ranking do clube.'}
        </p>

        <BotoesLoja campo="escuro" className="mt-9 flex justify-center" />

        <p className="mt-10">
          <Link
            to="/"
            className="text-[0.65rem] tracking-ultra-wide uppercase text-terracotta-on-dark hover:text-cream transition-colors duration-300 font-light font-body"
          >
            Ir para o site
          </Link>
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-terracotta" />
    </section>
  )
}
