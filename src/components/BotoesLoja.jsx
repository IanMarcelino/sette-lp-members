import { urlAppStore, urlPlayStore } from '../config/clube'
import { usePlataforma } from '../hooks/usePlataforma'

/**
 * Botões de download do app do clube.
 *
 * Não usamos os selos oficiais da Apple e do Google: eles têm canto
 * arredondado, arte preta e tipografia própria — três coisas que o sistema não
 * tem em lugar nenhum. O que a loja exige é que a marca seja reconhecível e
 * não alterada; o glifo vai inteiro, e a moldura em volta é nossa.
 *
 * Os glifos vêm em preenchimento, não em traço: a maçã e o triângulo do Play
 * são silhuetas, e contorná-las produziria um desenho que ninguém reconhece.
 * É a mesma licença que `IconWhatsapp` e `IconInstagram` já tomam em Contato.
 */

export function IconApple(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09ZM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701Z" />
    </svg>
  )
}

export function IconPlay(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594ZM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924Zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973Zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21Z" />
    </svg>
  )
}

/** Celular — usado onde o app aparece como um canal entre outros. */
export function IconApp(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...props}>
      <rect x="6.5" y="2.5" width="11" height="19" />
      <path d="M10.5 5.5h3" />
      <path d="M10.75 18.5h2.5" />
    </svg>
  )
}

/* A plataforma vem acima do nome da loja porque é ela que o visitante está
   escolhendo: quem tem iPhone não lê "App Store", lê "iPhone". */
const LOJAS = [
  { chave: 'ios', Icon: IconApple, plataforma: 'iPhone · iPad', loja: 'App Store', preposicao: 'na', url: urlAppStore },
  { chave: 'android', Icon: IconPlay, plataforma: 'Android', loja: 'Google Play', preposicao: 'no', url: urlPlayStore },
]

/* Texto de apoio e link, por campo. Sem opacidade sobre o barro: ele entra em
   AA sem folga e qualquer diluição reprova. */
const APOIO = {
  claro: 'text-stone',
  quente: 'text-stone',
  escuro: 'text-stone-light/85',
  foto: 'text-stone-light/85',
}
const LINK = {
  claro: 'text-terracotta hover:text-navy',
  quente: 'text-terracotta hover:text-navy',
  escuro: 'text-terracotta-on-dark hover:text-cream',
  foto: 'text-terracotta-on-photo hover:text-cream',
}

/** Tokens de acento por campo — a Regra das Duas Faces do DESIGN.md. */
const CAMPOS = {
  claro: 'border-terracotta/70 text-terracotta hover:bg-terracotta hover:text-cream active:bg-terracotta active:text-cream',
  quente: 'border-terracotta/70 text-terracotta hover:bg-terracotta hover:text-cream active:bg-terracotta active:text-cream',
  escuro:
    'border-terracotta-on-dark/60 text-terracotta-on-dark hover:bg-terracotta-on-dark hover:text-navy active:bg-terracotta-on-dark active:text-navy',
  foto: 'border-terracotta-on-photo/70 text-terracotta-on-photo hover:bg-terracotta-on-photo hover:text-navy-deep active:bg-terracotta-on-photo active:text-navy-deep',
}

/**
 * `modo="auto"` mostra só a loja do aparelho de quem está lendo, com a outra
 * rebaixada a uma linha de texto. Ninguém no iPhone precisa escolher entre duas
 * lojas — mas quem baixa para o aparelho de outra pessoa continua conseguindo.
 * No desktop não há aparelho a detectar, então as duas aparecem.
 */
export default function BotoesLoja({ campo = 'claro', modo = 'ambos', className = '' }) {
  const plataformaAtual = usePlataforma()
  const disponiveis = LOJAS.map((l) => ({ ...l, href: l.url() })).filter((l) => l.href)
  if (!disponiveis.length) return null

  const daVez =
    modo === 'auto' && disponiveis.length > 1
      ? disponiveis.find((l) => l.chave === plataformaAtual)
      : null
  const emDestaque = daVez ? [daVez] : disponiveis
  const aOutra = daVez ? disponiveis.find((l) => l.chave !== daVez.chave) : null

  return (
    <div className={className}>
      <div className="flex flex-col xs:flex-row flex-wrap gap-3">
      {emDestaque.map(({ chave, Icon, plataforma, loja, href }) => (
        <a
          key={chave}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Baixar o app do Sette Racket Club para ${plataforma} na ${loja} — abre em nova aba`}
          className={`inline-flex items-center gap-4 border px-6 py-4 font-body font-light transition-all duration-500 ease-out [-webkit-tap-highlight-color:transparent] ${CAMPOS[campo]}`}
        >
          <Icon className="w-6 h-6 flex-shrink-0" />
          <span className="text-left leading-none">
            {/* Sem opacidade: o barro entra em AA com 4,64:1 no campo escuro e
                não tem folga nenhuma para diluir — a 70% cai para 2,99:1 e
                reprova. A hierarquia entre as duas linhas vem do tamanho, que é
                de onde o sistema tira ênfase. */}
            <span className="block text-[0.6rem] tracking-ultra-wide uppercase mb-1.5">
              {plataforma}
            </span>
            <span className="block text-[0.7rem] tracking-ultra-wide uppercase">{loja}</span>
          </span>
        </a>
      ))}
      </div>

      {/* A loja do outro sistema não some, só perde o peso de botão. */}
      {aOutra && (
        <p className={`mt-4 text-sm font-light font-body ${APOIO[campo]}`}>
          Também disponível{' '}
          <a
            href={aOutra.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`underline underline-offset-4 decoration-1 transition-colors duration-300 ${LINK[campo]}`}
          >
            {aOutra.preposicao} {aOutra.loja}
          </a>
          .
        </p>
      )}
    </div>
  )
}
