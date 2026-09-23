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
- Zero raio de canto em todo o sistema, com uma exceção declarada e única: o botão flutuante do WhatsApp
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
- **Papel de Prancha** (`{colors.papel-de-prancha}`): o próprio fundo das aquarelas de arquitetura. Adotar o papel do original como campo da seção é o que faz as pranchas assentarem sem borda visível. O caminho contrário também vale e é regra: toda aquarela nova é **calibrada para este valor** no preparo do asset, por ganho multiplicativo por canal. As folhas variam entre si — a série de pessoas media #F8F0DF —, e três pontos por canal, que parecem nada em número, aparecem na tela como um retângulo claro em volta da figura.
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

Existem **duas** sombras em todo o sistema, e nenhuma é vocabulário.

A primeira é herdada: o hover dos cards de Pillars (`0 8px 30px -12px rgba(151,83,62,0.12)`), uma sombra de barro difusa e quase invisível.

A segunda é o botão flutuante do WhatsApp (`0 8px 24px -6px rgba(20,29,40,0.45)`), e é a única do projeto que de fato levanta uma superfície. Existe porque ele flutua sobre conteúdo que rola por baixo — sem a sombra ele lê como adesivo colado na tela, não como camada acima dela. É tingida de crepúsculo, nunca preta.

Nenhuma das duas deve ser replicada em componentes novos.

### Named Rules

**A Regra do Plano.** Uma superfície nova nasce sem sombra. Se ela precisa se separar do fundo, a resposta é trocar o campo ou acrescentar um contorno de 1px — nunca elevar. Só escapa o que de fato paira sobre conteúdo em movimento, e hoje isso é um componente só.

**A Regra do Véu.** Nenhuma fotografia aparece crua. Toda imagem recebe um gradiente por cima antes de receber texto, porque a imagem aqui é atmosfera e não documento. Em paisagem a hero acrescenta um véu radial elíptico sob a coluna de texto; em retrato não, porque ali a elipse apagaria a foto inteira.

O véu é navy quando a imagem serve de fundo a texto claro. Quando ela não carrega texto e só precisa se fundir ao campo — o caso das aberturas de página —, o véu toma a **cor do campo em que a imagem se dissolve**: crepúsculo fundo no escuro, cal aquecida no claro. Véu navy sobre o barro do brasão apagaria justamente a matéria que a imagem existe para mostrar. Em nenhum dos dois casos a ponta oposta chega a zero: o véu mais fino do sistema é de 10%.

## Shapes

**Raio zero, em absolutamente todo lugar.** Não existe um único `rounded` no código de interface. Botões, cards, imagens, campos, painéis e a barra de navegação são retângulos exatos. Duas exceções são invisíveis e funcionais: o polegar da barra de rolagem (3px) e o anel de foco (1px), ambos herdados de superfícies do navegador.

A terceira é visível e deliberada: **o botão flutuante do WhatsApp é um círculo**, decidido com o cliente por reconhecimento — é o único componente do site que cita um padrão da internet em vez do sistema. Ele não abre precedente, e é a única superfície arredondada do projeto.

A linguagem de forma é o **contorno de 1px**, não o preenchimento. Cards, botões secundários e listas se definem por borda em Areia Lavada sobre campo claro ou Cal a 20% sobre campo escuro. O preenchimento é reservado ao botão primário e à mudança de estado.

O **filete de 2px** é a assinatura geométrica do sistema, e aparece em três papéis: aresta de seção (largura total, no topo ou na base), pontuação sob um título (48px, centrado ou alinhado à esquerda), e divisor decorativo (32px, ladeando um losango de 6px rotacionado 45°).

### Named Rules

**A Regra do Canto Reto.** Nenhum raio, em nenhum componente. Um canto arredondado no Sette é um bug de sistema, não uma variação de estilo — a única exceção é o botão flutuante do WhatsApp, e ela está registrada aqui justamente para que continue sendo uma só.

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

### Botões de loja
O par de downloads do app, em `BotoesLoja`. Não usamos os selos oficiais da Apple e do Google: eles trazem canto arredondado, campo preto e tipografia própria — três coisas que o sistema não tem em lugar nenhum, e o selo oficial no meio de uma seção do Sette lê como anúncio colado por cima. O que as lojas exigem é que a marca apareça inteira e não alterada; o glifo vai intacto e a moldura em volta é nossa.

- **Forma:** botão ghost do sistema — retângulo exato, contorno de 1px no token de barro do campo, preenchimento no hover e no `:active` em 500ms.
- **Glifo:** a maçã e o triângulo do Play vão em **preenchimento**, não em traço. São silhuetas: contorná-las produz um desenho que ninguém reconhece. É a mesma licença que `IconWhatsapp` e `IconInstagram` já tomam em Contato, e a exceção à regra do ícone em traço de 1,2px.
- **Texto:** duas linhas, ambas em Label. Acima, a plataforma (`iPhone · iPad`, `Android`) a 0,55rem e 70% de opacidade; abaixo, o nome da loja a 0,7rem. A plataforma vem primeiro porque é ela que o visitante está escolhendo — quem tem iPhone não procura "App Store", procura "iPhone".
- **Rótulo acessível:** o `aria-label` diz a frase inteira — baixar, para qual plataforma, em qual loja, e que abre em nova aba. As duas linhas visíveis são curtas demais para carregar isso sozinhas.

### Botão flutuante do WhatsApp
Atalho persistente no canto inferior direito, em todas as páginas menos `/app`.

O padrão da internet para isto é um **círculo verde com sombra**, e as três características contrariam o sistema: o círculo, a Regra do Canto Reto; o verde, a Regra da Voz Única; a sombra, a Regra do Plano. Duas foram aceitas e uma não.

**Círculo de 56px com sombra, em Barro Batido.** A forma e a elevação vieram do padrão, porque é por elas que as pessoas reconhecem o que o botão faz antes de ler qualquer coisa. **A cor não.** Um segundo acento apareceria em todas as páginas, sempre por cima de tudo, e viraria a cor mais constante do site — o glifo do WhatsApp, que vai intacto, já carrega o reconhecimento sozinho.

- **Campo sólido**, e não o contorno de 1px do botão ghost: este flutua sobre fotografia, saibro, navy e cal ao longo da rolagem, e só o preenchimento o mantém legível em todos. Cal sobre Barro Batido mede 5,47:1.
- **Sombra tingida de crepúsculo** (`0 8px 24px -6px rgba(20,29,40,0.45)`), nunca preta, e mais forte no hover — onde ele também sobe 4px.
- **Entra depois da primeira tela** (90% da altura da janela). Sobre a hero ele disputaria com os CTAs que já estão ali, e a hero é onde o site já diz o que fazer.
- **`pointer-events` acompanha a opacidade.** Invisível não pode ser clicável — um botão a 0% que ainda intercepta o toque é uma armadilha no canto da tela.
- **Camada 40**, abaixo da navbar (50) para não brigar com a gaveta do celular, e da âncora de pular conteúdo (60).
- **Respeita a área segura** do aparelho por `env(safe-area-inset-*)`, para não cair sob a barra de gestos do iPhone.

### QR de download
Aparece na seção do app **só no desktop**, e essa condição é a regra: num celular o app está a um toque e o código seria o gesto mais longo; num computador ele é o único caminho, porque o app não se instala ali.

- **Destino:** a rota `/app`, nunca a loja direto. Um código impresso não sabe quem aponta a câmera para ele — quem decide entre App Store e Google Play é a página.
- **Placa:** Cal com contorno de 1px, **inclusive sobre campo escuro**. É a única superfície do sistema que ignora a alternância de campo, e por motivo funcional: leitor de QR espera módulo escuro sobre fundo claro. Legibilidade de máquina vem antes de coerência de campo.
- **Módulos:** Azul de Crepúsculo, 11,6:1 sobre a placa. A zona de silêncio é o padding da placa somado a 2 módulos no próprio vetor.
- **Endereço por extenso** ao lado, em Label: quem não tem câmera à mão digita.

### Seção do app
`AppSette`, o bloco que apresenta o app de reservas. Aparece em duas páginas com vizinhanças diferentes, então nasce com o campo como parâmetro — `escuro`, `claro` ou `quente` — e não com um fundo fixo: quem decide é a Regra do Campo Alternado da página onde ele entra, não o componente.

O selo mostrado é o `badge-*.svg` do próprio projeto, não a arte baixada da loja. O ícone do app já é o selo da marca, então a versão vetorial é a mesma imagem sem o peso de um PNG — e sem o canto arredondado que a loja aplica. Ele aparece dentro de uma moldura de 1px **reta**, e essa é a piada silenciosa do bloco: a loja arredonda, nós não.

### Grain
Camada de textura sobre campos escuros, a 3% de opacidade, sempre `aria-hidden`. É o que impede que uma seção navy inteira leia como bloco chapado de cor.

### Abertura de página
A vitrine de cada página interna, e o componente com mais presença do sistema depois da hero da Home. Grade de 12 colunas ocupando a largura da janela: **texto em 5, matéria em 7**.

- **Matéria:** sangra até a borda direita da janela — nunca termina numa aresta visível — e se dissolve no campo pela aresta interna, a que encosta no texto. O véu segura opacidade cheia nos primeiros 14% da coluna antes de começar a rampa; começar a rampa na aresta deixa a imagem aparecer a 2% de transparência nos primeiros pixels e a borda da coluna vira uma linha vertical contra o campo chapado.
- **Texto:** etiqueta, título e filete de 48px, alinhados à esquerda, centrados na altura da seção. O título vem em **três linhas curtas empilhadas** — é o que deixa o Cormorant chegar a 72px numa coluna de 400px.
- **Altura:** a tela cheia, como a hero da Home. Uma abertura ou toma a janela ou não é abertura — sobrar uma fresta da seção seguinte lê como imagem cortada, não como convite para rolar. No empilhado a matéria vira uma faixa de 44svh no topo, com a dissolução virando para baixo, e o texto ocupa o resto da tela abaixo dela.
- **Campo:** claro ou escuro conforme a matéria. Barro sob luz baixa exige o escuro; barro sob sol exige o claro. O campo da abertura também é a primeira metade da alternância da página.
- **Exceção:** "O Espaço" tem abertura própria. Lá a matéria é aquarela sobre papel, que precisa caber inteira e assentar sem corte — o oposto de sangrar. Foi essa abertura que deu o desenho às outras.

### Carousel
Composição de item único, usada quando o conteúdo é uma sequência e não um conjunto: os quatro tempos do dia, em Experiência, e o elenco, em O Clube. Um item ocupa a composição de cada vez, em duas colunas — imagem à esquerda, texto à direita —, e abaixo dela um **trilho** mostra a série inteira.

- **Trilho:** grade para quatro ou menos itens, faixa de rolagem horizontal quando não cabem. O item ativo é marcado pelo filete de 2px crescendo até a largura toda da célula em 700ms; o inativo mostra 20px do filete no hover. Nunca por preenchimento de fundo nem por ponto.
- **Setas e contador:** opcionais, e só onde o carrossel é o assunto principal da seção. Par de botões de 44x44 com contorno de 1px, no vocabulário do botão ghost — preenchem no hover e no active, em 500ms; setas em traço de 1px, nunca em glifo tipográfico. O contador é `01 / 04` em Label com numeral tabular, sempre `aria-hidden`.
  Onde o trilho já mostra quantos são, quem é o ativo e leva a qualquer um em um toque, os dois saem: são o mesmo controle duas vezes, e ocupam altura que a seção não tem para gastar. O arrasto e as setas do teclado permanecem em qualquer caso.
- **Movimento:** cruzamento de opacidade com deslocamento de 24px no sentido do salto, 500ms. Sem avanço automático: o sistema não pede atenção. Sob movimento reduzido a troca é corte seco e o arrasto sai.
- **Acessibilidade:** `aria-roledescription="carrossel"` na seção, `aria-live="polite"` na região que troca, `aria-current` no item ativo do trilho, setas do teclado enquanto o foco estiver dentro da seção, e arrasto horizontal no toque.

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
