---
name: Sette Racket Club
description: Clube de raquete em Fortaleza — a disciplina do desenho técnico aplicada a um material quente.
colors:
  crepusculo: "#1D2938"
  crepusculo-alto: "#2A3A4D"
  crepusculo-fundo: "#141D28"
  barro-batido: "#97533E"
  barro-umido: "#B06A52"
  barro-luz-baixa: "#C3806C"
  barro-sobre-foto: "#D09C8C"
  cal: "#FAF8F5"
  cal-aquecida: "#F5F0EB"
  areia-lavada: "#E8E0D8"
  areia-seca: "#BDA68F"
  papel-de-prancha: "#F5EEDC"
  grafite-sobre-papel: "#736960"
  pedra: "#776C63"
  pedra-ao-sol: "#C0B9B3"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.875rem, 6vw, 6rem)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "normal"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 300
    lineHeight: 1.25
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)"
    fontWeight: 300
    lineHeight: 1.3
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)"
    fontWeight: 300
    lineHeight: 1.625
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.65rem"
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: "0.35em"
rounded:
  none: "0px"
spacing:
  gutter: "24px"
  gutter-wide: "40px"
  card: "32px"
  section: "80px"
  section-lg: "112px"
  section-xl: "160px"
components:
  button-primary:
    backgroundColor: "{colors.barro-batido}"
    textColor: "{colors.cal}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 40px"
  button-primary-hover:
    backgroundColor: "{colors.barro-umido}"
    textColor: "{colors.cal}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.barro-batido}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 36px"
  button-ghost-hover:
    backgroundColor: "{colors.barro-batido}"
    textColor: "{colors.cal}"
  button-ghost-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.barro-luz-baixa}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  card:
    backgroundColor: "{colors.cal}"
    textColor: "{colors.crepusculo}"
    rounded: "{rounded.none}"
    padding: "{spacing.card}"
  eyebrow:
    backgroundColor: "transparent"
    textColor: "{colors.barro-batido}"
    typography: "{typography.label}"
    padding: "0px"
  rule:
    backgroundColor: "{colors.barro-batido}"
    height: "2px"
    width: "48px"
---

# Design System: Sette Racket Club

## Overview

**Creative North Star: "A Régua e o Saibro"**

O sistema é a disciplina do desenho técnico aplicada a um material quente. A régua é a geometria: canto reto em absolutamente todo lugar, filetes de exatos 2px, tracking de 0.35em nas etiquetas, grade contida por larguras máximas explícitas. O saibro é a matéria: barro, cal, areia, papel de prancha, pedra. Nenhuma cor do sistema é abstrata — todas nomeiam uma coisa física que existe no clube.

O temperamento resultante é **quente e acolhedor**, e isso não contradiz o rigor: o calor vem da paleta e da matéria, não do relaxamento da forma. Um canto arredondado deixaria o sistema mais macio e menos Sette. A hospitalidade aparece no barro, no papel e na luz baixa — a estrutura permanece firme por baixo.

Todo componente é **contido e preciso**. Um botão em repouso é apenas contorno de 1px; ele se preenche em 500ms quando você chega perto. Nada pede atenção com peso ou brilho. A interface confia que o conteúdo — a fotografia, a aquarela, o texto — carrega o interesse.

O sistema rejeita explicitamente três mundos vizinhos: a **academia** (neon, diagonal, condensada pesada), o **SaaS genérico** (cards arredondados iguais em grade de três, gradiente em texto) e o **clube britânico tradicional** (verde-garrafa, dourado, serifa vitoriana, brasão heráldico). O Sette é contemporâneo e brasileiro, e o barro é o que o ancora.

**Key Characteristics:**
- Zero raio de canto em todo o sistema — sem exceção conhecida
- Superfícies planas; profundidade por camada de cor, nunca por sombra
- Cormorant Garamond em peso 300 para tudo que é voz; Inter 300 para tudo que é informação
- Etiquetas em caixa alta com tracking de 0.35em — o gesto tipográfico mais reconhecível do sistema
- O filete terracota de 2px como pontuação estrutural, em 24 ocorrências
- Fotografia sempre sob véu; a imagem é atmosfera, não documento
- Contraste medido, não estimado: cada token de texto tem um par de fundo declarado

## Colors

Uma paleta de matéria: barro, cal, areia, papel e pedra, sob um céu de fim de tarde. Nenhum tom é saturado o suficiente para gritar; o contraste vem de temperatura e de valor, não de croma.

### Primary
- **Barro Batido** (`{colors.barro-batido}`): o acento único do sistema. Filetes, etiquetas, botões primários, seleção de texto, cursor e barra de rolagem. Só é legível sobre campo claro — 5,47:1 sobre Cal, mas 2,54:1 sobre Crepúsculo, onde reprova.
- **Barro Úmido** (`{colors.barro-umido}`): o barro que escureceu de molhado. Exclusivamente o estado de hover do botão primário.
- **Barro sob Luz Baixa** (`{colors.barro-luz-baixa}`): o mesmo barro clareado até 4,64:1 sobre Crepúsculo. É o acento obrigatório em qualquer campo escuro sólido.
- **Barro sobre Fotografia** (`{colors.barro-sobre-foto}`): mais claro ainda, porque fotografia sob véu não é campo sólido — no saibro claro da hero o tom anterior cai para 3,5:1. Mede 4,6:1 no pior pixel em retrato e 6,3:1 em paisagem.

### Neutral
- **Azul de Crepúsculo** (`{colors.crepusculo}`): o céu depois que o sol baixa. Campo escuro padrão de seções e o texto de corpo sobre campo claro.
- **Azul de Crepúsculo Fundo** (`{colors.crepusculo-fundo}`): a hora seguinte. Barra de navegação sólida, painéis, e o véu radial da hero.
- **Azul de Crepúsculo Alto** (`{colors.crepusculo-alto}`): elevação tonal dentro do escuro, onde uma superfície precisa se destacar do campo sem sombra.
- **Cal** (`{colors.cal}`): o branco quente da parede caiada. Fundo padrão do documento e o texto sobre qualquer campo escuro.
- **Cal Aquecida** (`{colors.cal-aquecida}`): o segundo campo claro, para alternar seções vizinhas sem trocar de mundo.
- **Areia Lavada** (`{colors.areia-lavada}`): bordas, divisores e o contorno de cards em campo claro.
- **Areia Seca** (`{colors.areia-seca}`): exclusivamente numerais ornamentais. Mede 1,70:1 sobre Cal — está abaixo de qualquer piso de leitura e por isso **só pode aparecer em elemento marcado `aria-hidden`**.
- **Papel de Prancha** (`{colors.papel-de-prancha}`): o próprio fundo das aquarelas de arquitetura. Adotar o papel do original como campo da seção é o que faz as pranchas assentarem sem borda visível.
- **Grafite sobre Papel** (`{colors.grafite-sobre-papel}`): o texto corrido no campo de papel, onde Pedra cairia para 4,42:1. Mede 4,65:1 no papel, 5,08:1 na cal e 4,75:1 na cal aquecida.
- **Pedra** (`{colors.pedra}`): texto secundário sobre campo claro. 4,51:1 na cal aquecida, que é o pior caso.
- **Pedra ao Sol** (`{colors.pedra-ao-sol}`): texto secundário sobre campo escuro, calibrado para continuar passando em AA mesmo a 70% de opacidade.

### Named Rules

**A Regra das Duas Faces.** Nenhum acento serve a dois campos. Barro Batido é para campo claro, Barro sob Luz Baixa para campo escuro sólido, Barro sobre Fotografia para imagem sob véu. Usar o token errado não é questão de gosto — é reprovação medida em WCAG AA. O mesmo vale para o par Pedra / Pedra ao Sol.

**A Regra da Voz Única.** Há um só acento no sistema, e ele é barro. Não existe cor secundária nem terciária. Se um elemento novo pede uma cor de destaque, a resposta é barro ou é hierarquia tipográfica — nunca uma cor nova.

**A Regra do Pixel Composto.** Contraste sobre fotografia se mede no pixel resultante, nunca na cor do token. Extraia a cor média da região da foto, aplique o véu por cima, e só então calcule a razão.

## Typography

**Display Font:** Cormorant Garamond (com Georgia, serif)
**Body Font:** Inter (com system-ui, sans-serif)

**Character:** Uma serifa de transição, alta e de traço fino, contra uma grotesca neutra. O Cormorant só aparece em peso 300 — nunca mais pesado —, o que deixa os títulos largos e leves em vez de densos. O Inter nunca é a voz: ele é a informação. A distância entre as duas famílias é grande de propósito, e é ela que faz a hierarquia funcionar sem precisar de peso.

### Hierarchy
- **Display** (Cormorant 300, 30→96px conforme a largura, altura de linha 1.02): o nome do clube e a abertura de cada página. Um por página.
- **Headline** (Cormorant 300, 30→48px, altura de linha 1.25): título de seção.
- **Title** (Cormorant 300, 20→24px, altura de linha 1.3): nome de item dentro de uma lista ou card. A variante itálica, de 20→30px, é reservada para a frase de posicionamento.
- **Body** (Inter 300, 14→18px, altura de linha 1.625): texto corrido, sempre contido por largura máxima explícita — `max-w-md` para coluna estreita, `max-w-2xl` para centralizada.
- **Label** (Inter 300, 10,4px, tracking 0.35em, caixa alta): etiquetas de seção, botões e metadados. É o gesto mais reconhecível do sistema.

### Named Rules

**A Regra do Peso 300.** Todo o sistema vive em peso 300. Não existe negrito. Ênfase vem de tamanho, de família ou de cor — nunca de peso. Um `font-semibold` no código é sinal de que alguém saiu do sistema.

**A Regra do Tracking Largo.** O tracking de 0.35em só pertence à Label, e Label é sempre caixa alta e sempre pequena. Aplicar tracking largo a texto de corpo quebra o sistema; aplicar a um display o torna ilegível.

**A Regra da Altura.** A escala responde à altura da tela, não só à largura. Abaixo de 660px de altura o display cai para 30px por mais larga que a viewport seja — um celular deitado tem largura de tablet e altura de nada.

## Layout

Grade contida, nunca fluida até a borda. Cada seção declara sua largura máxima conforme a densidade do conteúdo: `max-w-3xl` para leitura corrida, `max-w-6xl` para grade editorial, `max-w-7xl` para composição com imagem grande. A calha lateral é de 24px no celular e 40px a partir de 640px.

O ritmo vertical tem três passos, e a escolha entre eles diz a importância da seção: 80px→112px para seções de apoio, 96px→128px para seções de conteúdo, 112px→160px para as seções que carregam a página. O respiro sempre cresce com a largura da tela.

Os pontos de quebra são 420px (`xs`, telefones grandes, onde cabe um passo tipográfico intermediário antes do `sm` do Tailwind), 640px, 768px, 1024px, 1280px, e um ponto de **altura** a 660px que corta a escala de tipo em telas baixas.

### Named Rules

**A Regra do Campo Alternado.** Seções vizinhas trocam de campo — cal, crepúsculo, cal aquecida, papel. A troca de fundo é o que separa uma seção da outra; não existe divisor entre seções além do filete terracota de 2px.

**A Regra da Medida.** Todo bloco de texto corrido declara largura máxima. Texto que atravessa uma tela de 1920px não é layout, é ausência de layout.

## Elevation & Depth

**O sistema é plano por princípio.** Superfícies não têm sombra. Profundidade vem de quatro recursos, nesta ordem de preferência: véu de cor sobre fotografia, grão de 3% de opacidade sobre campos escuros, troca de campo entre seções vizinhas, e o filete terracota de 2px como aresta.

Existe exatamente **uma** sombra em todo o sistema, no hover dos cards de Pillars (`0 8px 30px -12px rgba(151,83,62,0.12)`). Ela é exceção herdada, não vocabulário — é uma sombra de barro, difusa e quase invisível, e não deve ser replicada em componentes novos.

### Named Rules

**A Regra do Plano.** Uma superfície nova nasce sem sombra. Se ela precisa se separar do fundo, a resposta é trocar o campo ou acrescentar um contorno de 1px — nunca elevar.

**A Regra do Véu.** Nenhuma fotografia aparece crua. Toda imagem recebe um gradiente navy por cima antes de receber texto, porque a imagem aqui é atmosfera e não documento. Em paisagem a hero acrescenta um véu radial elíptico sob a coluna de texto; em retrato não, porque ali a elipse apagaria a foto inteira.

## Shapes

**Raio zero, em absolutamente todo lugar.** Não existe um único `rounded` no código de interface. Botões, cards, imagens, campos, painéis e a barra de navegação são retângulos exatos. As duas exceções são invisíveis e funcionais: o polegar da barra de rolagem (3px) e o anel de foco (1px), ambos herdados de superfícies do navegador.

A linguagem de forma é o **contorno de 1px**, não o preenchimento. Cards, botões secundários e listas se definem por borda em Areia Lavada sobre campo claro ou Cal a 20% sobre campo escuro. O preenchimento é reservado ao botão primário e à mudança de estado.

O **filete de 2px** é a assinatura geométrica do sistema, e aparece em três papéis: aresta de seção (largura total, no topo ou na base), pontuação sob um título (48px, centrado ou alinhado à esquerda), e divisor decorativo (32px, ladeando um losango de 6px rotacionado 45°).

### Named Rules

**A Regra do Canto Reto.** Nenhum raio, em nenhum componente, em nenhuma circunstância. Um canto arredondado no Sette é um bug de sistema, não uma variação de estilo.

## Components

### Buttons
- **Shape:** retângulo exato, sem raio. Contorno de 1px.
- **Primary:** preenchimento em Barro Batido, texto em Cal, 16px por 40px de padding, tipografia Label. No celular ocupa a largura toda com 20px de padding vertical; a partir de 640px volta a ser inline.
- **Ghost:** sem preenchimento, contorno e texto no token de barro correspondente ao campo (Batido no claro, Luz Baixa no escuro, Sobre Fotografia sobre imagem).
- **Hover:** o ghost inverte — preenche com o acento e o texto vira o campo. O primary escurece para Barro Úmido. A transição é de 500ms com `ease-out`, deliberadamente lenta: o botão se preenche, não pisca.
- **Active:** todo botão repete o tratamento de hover em `:active`, porque no toque não existe hover. O realce cinza padrão do iOS é desligado onde há substituto próprio.

### Cards / Containers
- **Corner Style:** raio zero.
- **Background:** Cal sobre seção clara, Cal Aquecida quando a seção já é Cal, transparente sobre campo escuro.
- **Border:** 1px em Areia Lavada a 60%, ou Cal a 20% no escuro. No hover a borda vira barro a 40%.
- **Shadow Strategy:** nenhuma. Ver a Regra do Plano.
- **Internal Padding:** 32px, 40px a partir de 640px.

### Navigation
- **Style:** barra fixa no topo, com fundo em Azul de Crepúsculo cuja opacidade acompanha a rolagem — transparente sobre a hero, sólida a partir do primeiro scroll e sólida por padrão nas páginas internas.
- **Typography:** Label. Estado ativo em Cal cheia, inativo em Cal a 70%, hover em Barro sob Luz Baixa.
- **Mobile:** gaveta que desce da barra, com fundo em Crepúsculo Fundo a 95%, desfoque de fundo e uma aresta terracota a 20%.

### Eyebrow
Etiqueta de seção acima do título, em Label, no token de barro do campo. É o abridor padrão de toda seção do site e o elemento que mais se repete no sistema — aparece em quinze lugares. Quando o campo é escuro usa Barro sob Luz Baixa; sobre fotografia, Barro sobre Fotografia.

### Rule
O filete de 2px. Em largura total é aresta de seção; em 48px é pontuação sob um título; em 32px, ladeando um losango de 6px rotacionado, é divisor decorativo. Sempre no token de barro do campo. Quando anima, cresce da esquerda em 1,5s.

### Grain
Camada de textura sobre campos escuros, a 3% de opacidade, sempre `aria-hidden`. É o que impede que uma seção navy inteira leia como bloco chapado de cor.

## Do's and Don'ts

### Do:
- **Do** escolher o token de acento pelo campo, não pela cor: Barro Batido no claro, Barro sob Luz Baixa no escuro sólido, Barro sobre Fotografia sobre imagem sob véu.
- **Do** medir contraste sobre fotografia no pixel composto — cor média da região, mais o véu, e só então a razão.
- **Do** abrir toda seção com etiqueta em Label, título em Cormorant 300 e filete de 48px, nessa ordem.
- **Do** declarar largura máxima em todo bloco de texto corrido.
- **Do** manter toda transição de estado em 500ms com `ease-out`, e toda entrada em `cubic-bezier(0.25, 0.1, 0.25, 1)`.
- **Do** duplicar o tratamento de hover em `:active`, porque metade dos visitantes chega pelo toque.
- **Do** usar os lockups oficiais em `src/assets` (`badge-*.svg`, `logo-horizontal-*.svg`, `logo-stacked-white.svg`). Uma versão inline divergente já existiu no projeto e foi removida.

### Don't:
- **Don't** arredondar canto nenhum. Raio zero é invariante do sistema.
- **Don't** acrescentar sombra a superfície nova. Profundidade vem de véu, grão, troca de campo ou contorno de 1px.
- **Don't** usar peso acima de 300. Não existe negrito no sistema.
- **Don't** aplicar Areia Seca a texto que precise ser lido — ela mede 1,70:1 e só serve a numerais ornamentais com `aria-hidden`.
- **Don't** introduzir uma segunda cor de acento. Há um acento, e ele é barro.
- **Don't** apresentar os renders 3D como fotografia do clube construído. São o projeto arquitetônico; o clube opera, mas não há registro fotográfico dele no repositório.
- **Don't** desenhar no vocabulário de academia (neon, diagonal, condensada pesada), de SaaS genérico (grade de três cards arredondados, gradiente em texto) ou de clube britânico tradicional (verde-garrafa, dourado, serifa vitoriana, heráldica).
