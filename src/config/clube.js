/**
 * Dados de contato do clube — fonte única.
 *
 * Campos marcados como `PENDENTE` ainda não têm valor real. Enquanto estiverem
 * assim, a interface mostra o dado como texto simples em vez de link clicável:
 * é preferível uma informação visivelmente incompleta a um botão que abre uma
 * conversa ou um mapa que não existe.
 */

export const PENDENTE = 'PENDENTE'

export const CLUBE = {
  nome: 'Sette Racket Club',
  cidade: 'Fortaleza — Ceará',

  telefone: '(85) 98557-5252',
  whatsapp: '5585985575252', // só dígitos, com DDI

  email: 'contato@setteclub.com',

  endereco: 'Rua Valdetário Mota, 1058',
  bairro: 'Papicu',
  cep: '60175-742',

  instagram: 'setteracketclub',

  // Domínio de produção. O QR impresso na seção do app aponta para cá, então
  // o valor precisa ser o endereço público — nunca o host de desenvolvimento.
  site: 'https://setteclub.com',

  // App de reservas do clube — white-label da TPC Matchpoint, publicado nas
  // duas lojas em setembro de 2026. O ícone do app é o próprio selo da marca,
  // então a interface usa `badge-*.svg` em vez de importar a arte da loja.
  app: {
    ios: '6796340153',
    android: 'es.tpc.matchpoint.appclient.setteracketclub',
  },

  // Trecho do Papicu (CEP 60175-742). A rua atravessa três bairros — Vicente
  // Pinzón, Papicu e Cocó — com coordenadas bem distantes entre si, então o
  // bairro é o que define o pin, não o nome da via.
  lat: -3.7376723,
  lng: -38.4811649,

  horarios: [
    { dia: 'Segunda — Sexta', hora: '06h00 — 23h00' },
    { dia: 'Sábado', hora: '07h00 — 22h00' },
    { dia: 'Domingo & feriados', hora: '07h00 — 20h00' },
  ],
}

/** `true` quando o campo ainda não recebeu valor real. */
export const pendente = (v) => !v || v === PENDENTE

/** Devolve o href só se o dado por trás dele existir de verdade. */
export const hrefSeguro = (valor, montar) => (pendente(valor) ? null : montar(valor))

export const urlWhatsapp = () => hrefSeguro(CLUBE.whatsapp, (n) => `https://wa.me/${n}`)
export const urlInstagram = () => hrefSeguro(CLUBE.instagram, (h) => `https://instagram.com/${h}`)
export const urlEmail = () => hrefSeguro(CLUBE.email, (e) => `mailto:${e}`)

/**
 * Rota curta que manda cada aparelho para a sua loja.
 *
 * É o destino do QR: um código impresso não tem como saber se quem aponta a
 * câmera está num iPhone ou num Android, então ele aponta para uma página
 * nossa, e é ela que decide. Serve também como link avulso — bio do Instagram,
 * mensagem, material impresso.
 */
export const urlBaixarApp = () => (temApp() ? `${CLUBE.site}/app` : null)

export const urlAppStore = () =>
  hrefSeguro(CLUBE.app.ios, (id) => `https://apps.apple.com/br/app/sette-racket-club/id${id}`)
export const urlPlayStore = () =>
  hrefSeguro(CLUBE.app.android, (pkg) => `https://play.google.com/store/apps/details?id=${pkg}`)

/** `true` quando ao menos uma das lojas tem link real. */
export const temApp = () => Boolean(urlAppStore() || urlPlayStore())

/** Endereço completo, para buscas de rota. */
export const enderecoCompleto = () => {
  if (pendente(CLUBE.endereco)) return null
  const partes = [CLUBE.endereco, CLUBE.bairro, CLUBE.cidade.replace(' — ', ', '), CLUBE.cep]
  return partes.filter((p) => !pendente(p)).join(', ')
}

/** Linha de apoio do endereço: "Papicu · Fortaleza — CE". */
export const linhaBairro = () =>
  pendente(CLUBE.bairro) ? CLUBE.cidade : `${CLUBE.bairro} · ${CLUBE.cidade}`

/**
 * Rota até o clube. Usa busca por endereço em vez de coordenada: o texto é
 * exato e resolve no app de mapas do usuário, sem depender de um pin nosso.
 */
export const urlComoChegar = () => {
  const e = enderecoCompleto()
  return e ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e)}` : null
}

/** Embed do OpenStreetMap centrado na sede. Null enquanto não houver coordenada. */
export const urlMapa = () => {
  if (pendente(CLUBE.lat) || pendente(CLUBE.lng)) return null
  const lat = Number(CLUBE.lat)
  const lng = Number(CLUBE.lng)
  const d = 0.008
  const bbox = [lng - d, lat - d, lng + d, lat + d].map((n) => n.toFixed(4)).join('%2C')
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`
}
