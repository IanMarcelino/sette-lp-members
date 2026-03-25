export function SetteSymbol({ className = '', color = 'currentColor' }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="50" stroke={color} strokeWidth="5" fill="none" />
      <path
        d="M65 18C55 30 42 42 42 60C42 78 55 90 65 102"
        stroke={color}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M55 102C65 90 78 78 78 60C78 42 65 30 55 18"
        stroke={color}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SetteWordmark({ className = '', color = 'currentColor' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <SetteSymbol className="w-9 h-9 md:w-11 md:h-11" color={color} />
      <div className="flex flex-col leading-none">
        <span
          className="font-display text-xl md:text-2xl font-semibold tracking-[0.25em]"
          style={{ color }}
        >
          SETTE
        </span>
        <span
          className="font-body text-[0.5rem] md:text-[0.6rem] font-light tracking-[0.45em] uppercase"
          style={{ color }}
        >
          Racket Club
        </span>
      </div>
    </div>
  )
}

export function SetteLogoFull({ className = '', color = 'currentColor' }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <SetteSymbol className="w-20 h-20 md:w-28 md:h-28" color={color} />
      <span
        className="font-display text-5xl md:text-7xl font-semibold tracking-[0.3em] mt-6"
        style={{ color }}
      >
        SETTE
      </span>
      <span
        className="font-body text-xs md:text-sm font-light tracking-[0.5em] uppercase mt-2"
        style={{ color }}
      >
        Racket Club
      </span>
    </div>
  )
}
