/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Telefones grandes (Pro Max, Plus) ganham espaço antes do `sm` do
      // Tailwind, que só entra a 640px — larga demais para caber um passo
      // tipográfico intermediário.
      screens: {
        xs: '420px',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: '#1D2938',
        'navy-light': '#2A3A4D',
        'navy-deep': '#141D28',

        // Terracota tem duas faces. A original só é legível sobre fundo claro
        // (5.47:1 no cream); sobre navy ela cai para 2.54:1 e reprova em AA.
        // `terracotta-on-dark` é a mesma cor clareada até 4.64:1 sobre navy.
        terracotta: '#97533E',
        'terracotta-light': '#B06A52',
        'terracotta-on-dark': '#C3806C',
        // Sobre fotografia o fundo não é navy sólido: no saibro claro do hero o
        // `on-dark` cai para 3.5:1. Este tom passa em AA contra o pior pixel
        // medido em retrato (4.6:1) e em paisagem (6.3:1).
        'terracotta-on-photo': '#D09C8C',

        cream: '#FAF8F5',
        warm: '#F5F0EB',
        sand: '#E8E0D8',
        'sand-deep': '#BDA68F', // numerais ornamentais — decorativo, sempre aria-hidden

        // Papel das pranchas ilustradas de "O Espaço". Adotar o próprio fundo
        // do original como campo da seção é o que faz as aquarelas assentarem
        // sem borda visível. É mais quente que `warm`, então o texto corrido
        // precisa de um tom próprio: `stone` cai para 4,42:1 aqui.
        paper: '#F5EEDC',
        'paper-ink': '#736960', // 4,65:1 no papel · 5,08:1 no cream · 4,75:1 no warm

        // Mesma lógica do terracota: `stone` é o cinza-quente para fundo claro
        // (4.51:1 no warm, o pior caso) e `stone-light` para fundo escuro,
        // calibrado para continuar passando em AA mesmo a 70% de opacidade.
        stone: '#776C63',
        'stone-light': '#C0B9B3',
      },
      letterSpacing: {
        'ultra-wide': '0.35em',
      },
    },
  },
  plugins: [],
}
