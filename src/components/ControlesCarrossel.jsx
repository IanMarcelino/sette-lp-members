// Par de botões anterior/próximo, comum aos dois carrosséis de "O Clube".
//
// O acento segue a Regra das Duas Faces: barro batido no campo claro, barro
// sob luz baixa no escuro. Por isso o campo é uma prop e não uma classe fixa —
// o mesmo componente não pode carregar o token errado para o fundo em que cai.
//
// Repouso é contorno de 1px; o preenchimento chega no hover, em 500ms. O mesmo
// tratamento se repete em `:active` porque no toque não existe hover.
const CAMPO = {
  claro: {
    borda: 'border-paper-ink/30',
    seta: 'text-terracotta',
    interacao: 'hover:bg-terracotta hover:border-terracotta hover:text-cream active:bg-terracotta active:border-terracotta active:text-cream',
  },
  escuro: {
    borda: 'border-cream/25',
    seta: 'text-terracotta-on-dark',
    interacao: 'hover:bg-terracotta-on-dark hover:border-terracotta-on-dark hover:text-navy active:bg-terracotta-on-dark active:border-terracotta-on-dark active:text-navy',
  },
}

function Seta({ sentido }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      className={sentido < 0 ? 'rotate-180' : undefined}
    >
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  )
}

export default function ControlesCarrossel({ campo = 'claro', onAnterior, onProximo, rotulo }) {
  const c = CAMPO[campo]
  const base = `w-11 h-11 flex items-center justify-center border transition-all duration-500 ease-out [-webkit-tap-highlight-color:transparent] ${c.borda} ${c.seta} ${c.interacao}`

  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={onAnterior} aria-label={`${rotulo} anterior`} className={base}>
        <Seta sentido={-1} />
      </button>
      <button type="button" onClick={onProximo} aria-label={`${rotulo} seguinte`} className={base}>
        <Seta sentido={1} />
      </button>
    </div>
  )
}
