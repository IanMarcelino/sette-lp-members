import { useEffect, useState } from 'react'

/**
 * Qual loja é a do aparelho de quem está lendo.
 *
 * Devolve `null` enquanto não decidiu, e depois `ios`, `android` ou
 * `desconhecida`. A distinção entre "ainda não sei" e "é um desktop" importa
 * para a rota /app, que redireciona num caso e mostra as duas lojas no outro.
 *
 * Serve para mostrar um botão em vez de dois no celular: quem está no iPhone
 * não deveria ter que escolher entre App Store e Google Play.
 *
 * Começa em `desconhecida` e só decide depois da montagem. O projeto não tem
 * render no servidor, mas ler `navigator` durante o render torna o componente
 * impuro e quebra em qualquer teste que rode sem DOM — e o custo de esperar um
 * quadro é nenhum, porque o estado inicial já mostra as duas lojas.
 */
export function usePlataforma() {
  const [plataforma, setPlataforma] = useState(null)

  useEffect(() => {
    const ua = navigator.userAgent || ''

    // iPadOS 13+ se apresenta como Macintosh. O que o denuncia é o toque:
    // nenhum Mac reporta mais de um ponto de contato.
    const iOS = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)

    if (iOS) setPlataforma('ios')
    else if (/Android/.test(ua)) setPlataforma('android')
    else setPlataforma('desconhecida')
  }, [])

  return plataforma
}
