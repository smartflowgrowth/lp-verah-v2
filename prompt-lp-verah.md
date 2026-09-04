# Prompt de Desenvolvimento — LP "Sessão Verah"

## Papel e objetivo

Você é um desenvolvedor frontend sênior especializado em **vibe coding** (construção guiada por IA, iterativa e visual). Sua tarefa é construir uma landing page para apresentar o empreendimento imobiliário **Verah**, estruturada como uma **sessão única de scroll**: uma experiência finita, contínua e sequencial — não uma página tradicional com seções soltas, mas uma narrativa construída que se revela conforme o usuário rola a tela.

O objetivo de negócio é gerar leads qualificados: o visitante deve sair da experiência querendo preencher o formulário de contato para atendimento personalizado.

---

## 1. Conceito central: "Sessão" (não "página")

- Trate o scroll como uma **linha do tempo controlada**, com começo, meio e fim perceptíveis (indicar progresso — ex.: barra de progresso fina, fixa, no topo ou lateral, mostrando "quanto falta" da sessão).
- Cada bloco de conteúdo (contexto, localização, diferenciais, plantas, condições, chamada final) deve entrar em cena com uma transição própria — nunca "aparecer" de forma seca. Use fade+translate, reveal por máscara, parallax sutil ou scrub de scroll (scroll-linked animation), conforme o tom emocional do bloco.
- A narrativa deve seguir uma lógica de **storytelling construtivo**: abre com uma promessa/emoção (ex.: "um novo jeito de morar em [região]"), constrói contexto (localização, bairro, entorno), apresenta o produto (fachada, áreas comuns, plantas), reforça com prova social/diferenciais técnicos, apresenta condições comerciais, e fecha com uma chamada de decisão.
- Ritmo: nem tudo precisa ser lento. Alterne blocos "respiráveis" (uma imagem grande, um número, uma frase) com blocos mais densos (planta + especificações). Isso evita fadiga de scroll.
- Ao final da sessão, sinalize claramente o encerramento (ex.: "Você chegou ao fim. Vamos conversar?") antes do formulário final, para não parecer que a página "simplesmente acabou".

## 2. Ponto de contato persistente (não-negociável)

- Um CTA (botão ou pílula flutuante, ex.: "Fale com um especialista" / "Quero atendimento") deve estar **sempre visível**, em todas as etapas do scroll, sem exceção — fixo (fixed/sticky), com z-index acima de todas as animações.
- Ele nunca deve competir visualmente com o conteúdo em foco (usar peso visual discreto no repouso, com destaque sutil de hover/pulse periódico para não virar "ruído").
- Ao clicar, abre o formulário de contato — de preferência como **modal/drawer sobreposto**, sem tirar o usuário do fluxo da sessão (ele deve poder fechar e continuar de onde parou).
- Prever pelo menos 1–2 CTAs contextuais adicionais nos momentos de maior intenção (após ver plantas e após ver condições comerciais), além do botão fixo — reforçando sem ser repetitivo.
- Formulário: nome, telefone/WhatsApp, e-mail, e (opcional) "planta de interesse" pré-preenchida conforme o ponto do scroll em que o CTA contextual foi acionado. Validação client-side, estado de sucesso claro, e fallback de envio direto para WhatsApp quando aplicável.

## 3. Estrutura sugerida de blocos (ajustar com o material real do Verah)

1. **Abertura/Hero** — nome do empreendimento, uma imagem/vídeo de impacto, frase-conceito curta, indicador de "role para começar".
2. **Localização e entorno** — mapa estilizado ou ilustração, principais pontos de interesse, tempo até lugares-chave.
3. **Conceito arquitetônico** — fachada, áreas comuns, lazer, diferenciais construtivos.
4. **Plantas** — apresentação sequencial das opções de planta (tabs ou scroll horizontal dentro do bloco), com metragens e destaques de cada tipologia.
5. **Especificações e acabamentos** — materiais, certificações, sustentabilidade, segurança.
6. **Condições comerciais** — formas de pagamento, entrega, diferenciais de investimento (sem preços fixos se ainda não definidos — usar "condições especiais de lançamento" como gancho).
7. **Prova social / autoridade** — construtora, projetos anteriores, prêmios (se houver).
8. **Fechamento + formulário final** — reforço da chamada, formulário completo, informações de contato direto (telefone/WhatsApp/endereço do plantão).

> Observação: como não há ainda os ativos finais do Verah (imagens, plantas, textos de copy), use placeholders claramente identificados e estrutura de dados (JSON/props) fácil de substituir depois — não hardcode conteúdo fictício como se fosse definitivo.

## 4. Stack e uso de cada ferramenta

- **Figma MCP** — fonte de verdade do design. Extrair tokens (cores, tipografia, espaçamentos, componentes) diretamente dos frames do Figma via MCP em vez de recriar visualmente "de olho"; manter 1:1 com o arquivo de design para fachada, plantas e paleta de marca do Verah.
- **Framer MCP** — usar para prototipagem/publicação rápida de blocos e para sincronizar variações de layout responsivo direto do Framer quando fizer sentido, mantendo consistência com o que foi validado lá antes de portar para o código final.
- **Material 3 (skill)** — base de sistema de design para componentes de interface (inputs do formulário, botões, cartões de planta, chips de filtro de tipologia), adaptando os tokens de cor/elevação do M3 à identidade visual do Verah (não usar o visual "Google" padrão — reskin completo).
- **Expo (skill)** — considerar desde já a portabilidade da experiência (ou de partes dela, como o formulário/lead capture) para um contexto mobile/app nativo, caso o Verah venha a precisar de um app companion ou wrapper nativo da LP.
- **Motion.dev** — biblioteca principal de animação declarativa para transições de entrada/saída dos blocos, orquestração de sequências (stagger de imagens, textos) e animações ligadas ao scroll (scroll-linked/scroll-triggered).
- **GSAP** — para animações mais complexas ou de alta performance que exijam controle fino de timeline (ex.: scrub de scroll no hero, pin de seções, parallax multi-camada nas plantas), especialmente onde Motion.dev não cobrir o caso.
- **Transitions.dev** — para transições de página/estado (ex.: abrir/fechar o modal de formulário, transição entre tipologias de planta) de forma fluida e sem "corte seco".
- **shadcn** — biblioteca de componentes base (formulário, modal/drawer, tabs de plantas, tooltip) para acelerar a implementação, estilizados por cima com os tokens do Material 3 / Figma para não parecer um template genérico.

## 5. Diretrizes técnicas gerais

- Performance em primeiro lugar: lazy-load de imagens/vídeos por bloco, uso de `IntersectionObserver` (ou equivalente do Motion/GSAP ScrollTrigger) para só animar/carregar o que está prestes a entrar em viewport.
- Totalmente responsivo — o storytelling de scroll precisa funcionar tanto em mobile (a maioria do tráfego de Meta Ads/Google Ads tende a vir de mobile) quanto desktop; considerar variações de layout, não só reflow.
- Acessibilidade: respeitar `prefers-reduced-motion`, garantir que o CTA fixo e o formulário sejam navegáveis por teclado e leitor de tela.
- Tracking: prever pontos de instrumentação (GTM/pixel) para eventos de scroll depth por bloco, cliques em cada CTA (fixo vs. contextual) e submissão de formulário — para permitir otimização de campanhas depois.
- Estrutura de código modular por bloco de storytelling, com dados de conteúdo (textos, imagens, plantas) separados da lógica de apresentação, para facilitar troca de assets reais do Verah sem reescrever animação.

## 6. Entregável esperado desta etapa

Ao final, a IA/dev deve entregar:
1. Estrutura de blocos da sessão de scroll (wireframe funcional).
2. Sistema de animação de entrada/saída por bloco (Motion.dev/GSAP).
3. CTA fixo + CTAs contextuais funcionando e sincronizados com o formulário modal.
4. Formulário de lead com validação e estado de sucesso.
5. Camada de dados de conteúdo desacoplada (para receber os ativos reais do Verah depois).
