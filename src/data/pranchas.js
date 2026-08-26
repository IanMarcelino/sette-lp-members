// Catálogo das pranchas ilustradas de "O Espaço".
//
// A montagem do srcset a partir dos nomes de arquivo mora em `imagens.js` —
// é a mesma para as pranchas, para as aquarelas de "O Clube" e para os
// retratos do elenco. Aqui fica só o glob, que o Vite exige literal no módulo
// que o chama.
import { catalogar } from './imagens'

export const prancha = catalogar(
  import.meta.glob('../assets/espaco/*.{avif,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)
