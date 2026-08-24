# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primário — público geral de Fortaleza que quer jogar.** Chega procurando onde jogar tênis ou padel na cidade, ou pesquisando o clube depois de ouvir falar dele. Não é membro e não precisa ser: o clube atende não-membros. O que ele quer resolver é concreto e imediato — conseguir um horário de quadra.

**Secundário — interessados em virar membro.** As vagas de *Founding Member* encerraram em junho de 2026. Novas admissões acontecem por processo seletivo ou lista de prioridade, não por adesão aberta. Esse público chega com intenção de longo prazo e hoje não tem caminho próprio no site.

## Product Purpose

O Sette Racket Club é um clube de raquete **em operação** em Fortaleza, no Papicu, com tênis e padel.

O site existe para levar o visitante a **reservar uma quadra**. A reserva não é automatizada: acontece por conversa no WhatsApp. Sucesso é o visitante sair do site com um horário encaminhado — não é tempo de permanência nem inscrição em lista.

## Positioning

O clube trata arquitetura e convívio como parte da oferta esportiva, não como cenário. A promessa é "onde esporte, arquitetura e experiência se encontram", e o posicionamento declarado é ser o novo marco do tênis moderno no Nordeste, com referência nos clubes mais sofisticados do mundo.

O modelo de acesso é o que um clube vizinho não copia de graça: **aberto ao público geral, com um número reduzido de membros com acesso privilegiado**. As duas portas convivem — não é clube fechado nem academia aberta.

## Operating Context

- **Endereço:** Rua Valdetário Mota, 1058 — Papicu, Fortaleza — CE, CEP 60175-742
- **Funcionamento:** Segunda a sexta 06h00–23h00 · Sábado 07h00–22h00 · Domingo e feriados 07h00–20h00
- **Canal de reserva:** WhatsApp (85) 98557-5252. Toda reserva passa por atendimento humano.
- **Outros canais:** Instagram @setteracketclub · e-mail contato@setteclub.com
- **Domínio:** setteclub.com

## Capabilities and Constraints

**Modalidades:** Tênis (saibro) e Padel. Somente essas duas. Beach Tennis chegou a aparecer no site e foi removido em agosto de 2026 por não existir no clube — não reintroduzir sem confirmação.

**Estrutura confirmada:** 8 quadras · 25 vagas de estacionamento · 1 área VIP · lounge e área social · bar e gastronomia.

**Programação:** torneios internos entre membros com ranking e premiação, clínicas e workshops com profissionais convidados, encontros sociais no lounge.

**Sem reserva online.** Não existe sistema de agendamento, disponibilidade em tempo real ou pagamento. Qualquer trabalho que sugira "reserve agora" precisa terminar no WhatsApp.

**Sem captação ativa de membros.** O formulário de adesão foi retirado em junho de 2026 junto com as integrações de Google Sheets e Resend. O `email-template.html` na raiz é o confirmatório daquela fase e está inativo.

## Brand Commitments

- **Nome:** Sette Racket Club. *Sette* é sete em italiano — número tido como completo — e a pronúncia remete ao *set* do tênis. A dupla leitura é a origem do nome e não deve ser reescrita.
- **Símbolo:** a bola estilizada formando um "S", representando o ciclo do jogo — movimento, direção, ponto, retorno.
- **Lockups oficiais em `src/assets/`:** `badge-white.svg`, `badge-navy.svg`, `logo-horizontal-white.svg`, `logo-horizontal-navy.svg`, `logo-stacked-white.svg`. São os arquivos da marca; não redesenhar em SVG inline (uma versão inline divergente já existiu no projeto e foi removida).
- **Voz:** primeira pessoa do plural, afirmativa e sóbria, sem superlativo publicitário. A linha "O jogo não é decidido no ponto. É decidido no SETTE." é assinatura da marca.

## Evidence on Hand

**Renders 3D do projeto arquitetônico** — `carousel-1..4`, `court-aerial`, `floor-plan`. São o projeto, não registro fotográfico. **O clube está construído e operando, mas não há fotografia dele no repositório.** Nenhum trabalho futuro pode apresentar esses renders como foto do espaço, nem afirmar que mostram o clube como ele está hoje. Produzir fotografia real é a lacuna de conteúdo mais relevante do projeto.

**Imagens de detalhe** — `tenis.webp`, `padel.webp`, `obra.webp`, `lifestyle.webp`. Genéricas (bola no saibro, raquete de padel, pá com saibro, jogador). A procedência não está registrada no repositório; tratar como não confirmada até que alguém ateste.

**Marca aplicada** — `clube.webp` e `court-aerial`: o brasão gravado no saibro. É o ativo mais próprio da marca e o único que nenhum concorrente teria.

**Ausências que não podem ser inventadas:** não há depoimentos, número de membros, preço, mensalidade, premiação de torneio, cobertura de imprensa, parceria ou data de fundação registrados. Nenhum desses fatos existe no projeto — se um trabalho precisar deles, tem de pedir.

## Product Principles

1. **O clube opera hoje.** Boa parte do texto ainda fala no futuro — "Fortaleza receberá", "o Sette nasce", "poderá ser frequentado" — resíduo da fase de pré-lançamento. Trabalho futuro escreve no presente.
2. **A conversa é o produto.** Não existe reserva automatizada; o WhatsApp é o mecanismo real. Desenhar como se houvesse checkout cria uma promessa que o clube não cumpre.
3. **Render não é prova.** Enquanto não houver fotografia do espaço construído, a imagem ilustra a intenção — nunca atesta o que existe.
4. **Duas portas, uma delas estreita.** Público geral entra pela reserva; membro entra por seleção. Confundir as duas transforma o clube em academia ou em clube fechado, e ele não é nenhum dos dois.
5. **A marca vive no detalhe material.** O saibro, a régua, o brasão gravado no chão. A identidade é tátil antes de ser gráfica.

## Accessibility & Inclusion

WCAG 2.1 nível AA é o piso do projeto, estabelecido e verificado em agosto de 2026: todo par de texto/fundo foi medido, inclusive sobre fotografia, onde a medição usa o pixel composto e não a cor do token. `prefers-reduced-motion` tem alternativa desenhada — o movimento grande é desligado e o feedback de estado preservado —, e alvos de toque respeitam 44px. Regressão nesses pontos é defeito, não questão de gosto.
