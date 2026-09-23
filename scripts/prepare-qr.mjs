/**
 * Gera o QR da rota `/app`, que redireciona cada aparelho para a sua loja.
 *
 * O código é gerado aqui e commitado como SVG, no mesmo espírito dos outros
 * `prepare-*`: o navegador recebe um vetor de poucos KB em vez de uma
 * biblioteca de geração. O conteúdo só muda se o domínio mudar.
 *
 * Correção de erro em nível M (~15%): o código é lido de uma tela, a poucos
 * centímetros, sem sujeira nem amassado. Nível H engrossaria a malha sem
 * ganho real e deixaria os módulos menores no mesmo espaço.
 *
 * Sem fundo próprio: a placa clara que o envolve é quem dá a zona de silêncio.
 * Os módulos saem em Azul de Crepúsculo fixo, e não em `currentColor`, porque
 * um SVG carregado por `<img>` não herda cor de CSS — e inliná-lo só para
 * poder pintá-lo seria trocar 4 KB de asset por 4 KB de bundle.
 *
 * Uso: node scripts/prepare-qr.mjs
 */
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'

const DESTINO = fileURLToPath(new URL('../src/assets/qr-app.svg', import.meta.url))

// Precisa bater com `CLUBE.site` em src/config/clube.js.
const URL_DESTINO = 'https://setteclub.com/app'

const svg = await QRCode.toString(URL_DESTINO, {
  type: 'svg',
  errorCorrectionLevel: 'M',
  // 2 módulos aqui; o resto da zona de silêncio é o padding da placa no CSS.
  margin: 2,
})

const limpo = svg
  // O caminho claro é o fundo — fora, para a placa do componente aparecer.
  .replace(/<path[^>]*fill="#ffffff"[^>]*\/>/i, '')
  // Azul de Crepúsculo — mede 11,6:1 sobre a Cal da placa, muito acima do que
  // qualquer leitor de QR precisa.
  .replace(/stroke="#000000"/i, 'stroke="#1D2938"')

await writeFile(DESTINO, limpo)
console.log(`QR de ${URL_DESTINO} → src/assets/qr-app.svg`)
