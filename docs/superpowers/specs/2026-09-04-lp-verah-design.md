# LP Verah — Sessão de scroll

**Data:** 04/09/2026
**Origem:** `prompt-lp-verah.md`
**Estágio desta rodada:** validação interna. Sem deploy, sem SEO de produção,
sem integração real de lead.

---

## 1. O que é o Verah

Empreendimento da **Marcondes Cesar Construtora**, em **pré-lançamento**.

| Campo | Valor |
|---|---|
| Endereço | Av. Dr. José de Moura Resende — Vera Cruz — Caçapava/SP |
| Produto | Torre única, 2 e 3 dormitórios |
| Tipologias | 52 m², 54,70 m², 56 m², 70 m² |
| Estrutura | 2 elevadores; varanda em todas as tipologias; 3 dorm com 1 ou 2 vagas, demais 1 vaga; cobertura de vagas sob demanda |
| Entorno | Via Dutra (acesso à Nestlé); Av. Brasil a 3 min; Centro a 4 min |
| Vista | Serra da Mantiqueira |
| Lazer | Fitness 62,45 m²; salão de festas 93,14 m²; coworking; espaço influencer; estética/spa; gourmet; kids; lavanderia compartilhada; mercadinho; salão de jogos; pátio externo; espaço pet; quadra beach sports; piscina infantil e adulta |
| Diferenciais | Personalização tipo casa; condições com FGTS; automação/IA de condomínio |
| Construtora | 45 anos; +400.000 m² construídos; +75 empreendimentos; +12.400 clientes |
| WhatsApp | 5512981893999 |

**Não existe ainda:** preço, data de lançamento, prazo de entrega, render de
fachada, planta de apartamento. O gancho comercial é **prioridade na fila de
pré-lançamento**.

### Fontes

- `prompt-lp-verah.md` — briefing.
- `https://verah.marcondescesar.com.br` — site oficial (React/Vite/Tailwind).
  Copy, tokens, tipografia e números da construtora foram extraídos dele.
- `~/Documents/google-ads/assets/lancamentos/verah/` — 5 páginas do book, em
  JPG. Plantas das áreas comuns (térreo e lazer) e quadro de estrutura.
  **São as únicas imagens reais disponíveis.**

---

## 2. Identidade

Tokens lidos das CSS custom properties do site oficial — valores exatos, não
amostrados de imagem:

```
--cream       #dfd0bd    fundo
--cocoa       #461f12    texto, CTA em repouso
--brick       #88341c    acento, ícones
--gold        #bf7c2c    CTA ativo, destaque
```

Tipografia: **Marcellus** (display, com fallback `Optima, "Cormorant
Garamond", serif`) e **Montserrat** 300–700 (texto). Ambas no Google Fonts.

Marca: VERAH em serif de traço fino, com o A desenhado como Λ.
Tagline: **"lar à primeira vista"**.

---

## 3. Conceito da sessão

Eixo narrativo: **o reconhecimento**. A sessão não descreve um prédio — ela
encena o instante em que alguém reconhece um lugar como seu. Abre abstrata (a
vista, a serra), materializa em endereço, em planta, em rotina, e fecha na
decisão.

**Direção de arte: tipográfica e cinética.** A sessão se sustenta em
tipografia, textura, SVG animado e números. Nenhuma foto de banco de imagens,
nenhum render inventado. As 5 imagens do book são o único material
fotográfico e por isso concentram-se num bloco só, onde ganham peso.

Essa decisão é uma resposta à restrição real (não há ativos visuais) e não uma
concessão: uma marca serif e terrosa em pré-lançamento comunica melhor por
contenção do que por render genérico.

### Os oito blocos

| # | Bloco | Conteúdo | Tratamento |
|---|---|---|---|
| 1 | A vista | VERAH, tagline, "em breve" | Logo mascarado por scrub de scroll; silhueta da Mantiqueira revelada por `stroke-dashoffset`; textura de grão. Indicador de "role para começar". |
| 2 | O endereço | Vera Cruz, Caçapava; Dutra, Av. Brasil 3 min, Centro 4 min, infraestrutura | Contadores que sobem ao entrar em viewport. Diagrama esquemático em SVG desenhado à mão — relações e tempos, não cartografia; sem tile de terceiro e sem pretensão de precisão geográfica. |
| 3 | A torre única | Torre única; 2 elevadores; varanda em todas | Bloco respirável: uma frase, um número, muito ar. |
| 4 | As plantas | 52 / 54,70 / 56 / 70 m²; 2 e 3 dorm; vagas por tipologia | Bloco denso. Seção pinada; as 4 tipologias passam com scrub horizontal. **CTA contextual ao sair.** |
| 5 | O quintal | Lazer completo | As 5 imagens do book. Único bloco fotográfico. |
| 6 | A personalização | Escolher como numa casa; FGTS; IA de condomínio | **CTA contextual ao sair.** |
| 7 | 45 anos | 400.000 m², 75 empreendimentos, 12.400 clientes, 45 anos | Prova social por números; fundo `--cocoa`, inversão de contraste. |
| 8 | A fila | "Você chegou ao fim." + formulário completo + contato direto | Encerramento explícito antes do formulário. |

Ritmo: 1 respirável → 2 médio → 3 respirável → 4 denso → 5 médio → 6 médio →
7 respirável → 8 denso. Nunca dois densos seguidos.

---

## 4. Arquitetura

Next.js 15 (App Router, `output: 'export'`), TypeScript, Tailwind v4,
shadcn/ui, Motion, GSAP + ScrollTrigger.

```
verah/
  app/
    layout.tsx       fontes, metadata, providers
    page.tsx         monta a sessão a partir do manifesto de blocos
    globals.css      tokens da marca via @theme
  content/
    verah.ts         todo o conteúdo, tipado
  components/
    session/
      SessionProvider.tsx   progresso, bloco ativo, estado do drawer
      ProgressRail.tsx      trilho de progresso
      Block.tsx             wrapper: registra observer, aplica reveal
      blocks/01-Vista.tsx … 08-Fila.tsx
    lead/
      LeadDrawer.tsx        drawer/modal shadcn
      LeadForm.tsx          react-hook-form + zod
      submitLead.ts         interface única de envio
    ui/                     shadcn
  lib/
    motion/presets.ts       variantes compartilhadas
    scroll/useScrollProgress.ts
    scroll/useBlockObserver.ts
    scroll/useReducedMotion.ts
    track.ts                camada de eventos
```

**Regra estrutural:** nenhum componente de bloco conhece o conteúdo. Cada um
recebe props tipadas de `content/verah.ts`. Trocar copy, acrescentar uma
tipologia ou plugar um render mais tarde não encosta em código de animação.

`content/verah.ts` é TypeScript, não JSON, para que o tipo de cada bloco seja
verificado em build — um campo faltando quebra o build, não a página no ar.

---

## 5. Sistema de animação

Duas bibliotecas no mesmo projeto exigem fronteira explícita:

- **Motion** — entradas e saídas discretas: reveal de bloco, stagger de texto,
  abertura do drawer, troca de tipologia. Declarativo, dentro do React.
- **GSAP + ScrollTrigger** — scrub contínuo e pin: mascaramento do logo no
  herói, parallax da silhueta da Mantiqueira, pin do bloco 4 enquanto as
  tipologias passam.

**Um único ScrollTrigger global** cria o contexto e publica o progresso; os
blocos consomem. Sem ScrollTrigger espalhado por componente — é o que torna
esse tipo de página impossível de depurar depois.

`useReducedMotion` é um hook central que, quando `prefers-reduced-motion:
reduce`, degrada toda animação para fade de 150 ms **e desativa pin e scrub do
GSAP**. Media query no CSS não basta: o GSAP escreve `transform` inline e
venceria a regra.

---

## 6. Progresso e pontos de contato

**Trilho de progresso** derivado de um único `useScrollProgress` (rAF sobre
`scrollY / (scrollHeight - innerHeight)`), nunca de oito observers
concorrentes. Desktop: vertical à direita, 8 marcas, nome do bloco no hover.
Mobile: barra de 2 px no topo.

**CTA fixo**, não-negociável: pílula `--cocoa`, canto inferior direito no
desktop, barra com `safe-area-inset-bottom` no mobile. `z-index` acima de toda
animação. Repouso discreto; pulse a cada 45 s e somente com o usuário parado.
**Oculto no bloco 8** — o formulário já está na tela e o botão competiria
consigo mesmo.

**CTAs contextuais**, dois, nos momentos de maior intenção:
- ao sair do bloco 4 (plantas) — abre o formulário com `plantaInteresse` já
  preenchida com a tipologia visível no momento do clique;
- ao sair do bloco 6 (personalização).

---

## 7. Formulário

Campos: nome, WhatsApp (máscara BR), e-mail, interesse
(Morador / Investidor / Corretor — a segmentação que a construtora já usa no
site oficial), `plantaInteresse` opcional, e honeypot oculto.

Validação com zod via react-hook-form. Estado de sucesso explícito, sem
redirect. Navegável por teclado; drawer com foco preso e retorno de foco ao
fechar.

`submitLead(dados): Promise<Resultado>` é a **única** interface de envio.
Nesta rodada devolve sucesso simulado e registra no console. Na rodada de
publicação vira o `fetch` para a Edge Function `lead-lp` com
`origem: 'lp-verah'`, sem alterar nenhum componente.

O telefone é normalizado para 10–11 dígitos antes de sair do formulário: o
`lead-lp` recusa 13 dígitos, e a máscara com `+55` produziria exatamente isso.

Fallback: link para `https://api.whatsapp.com/send?phone=5512981893999` com
mensagem pré-montada, sempre disponível no bloco 8.

---

## 8. Tracking

`track(evento, props)` empurra para `window.dataLayer`. Eventos:

| Evento | Quando | Props |
|---|---|---|
| `sessao_bloco_visto` | bloco entra em viewport, uma vez por sessão | `bloco`, `indice` |
| `cta_click` | qualquer CTA | `origem`: `fixo` \| `plantas` \| `personalizacao` |
| `form_abriu` | drawer abre | `origem` |
| `form_enviou` | envio com sucesso | `interesse`, `plantaInteresse` |

Nenhum pixel instalado nesta rodada. Os pontos ficam prontos; GTM e Meta Pixel
entram na publicação.

---

## 9. Performance e acessibilidade

- Lazy-load das 5 imagens do book; `loading="lazy"`, `width` e `height` reais.
- Nada anima ou carrega antes de estar prestes a entrar em viewport.
- Fontes com `font-display: swap`, sem `preload` — 77 KiB em prioridade alta
  disputariam banda com o LCP.
- Responsivo por variação de layout, não só reflow: o bloco 4 é scrub
  horizontal pinado no desktop e carrossel por swipe no mobile.
- CTA fixo e formulário navegáveis por teclado e leitor de tela.
- `prefers-reduced-motion` respeitado em CSS e em GSAP.

---

## 10. Testes

Vitest onde há lógica pura e falha silenciosa:

- schema zod do formulário — aceita e recusa o que deve;
- normalização de telefone — `+55 (12) 98189-3999` → `12981893999`; recusa
  13 dígitos;
- `useScrollProgress` — 0 no topo, 1 no fim, monotônico.

Animação, ritmo e layout verificam-se olhando, com Playwright em desktop e
mobile. Não há asserção útil sobre "a transição ficou boa".

---

## 11. Decisões e o que ficou de fora

**Material 3 não será usado**, contrariando a seção 4 do prompt. Não existe
como skill nesta configuração, e seus tokens de elevação e forma brigam com
uma marca serif e terrosa — o reskin completo custaria mais que partir dos
tokens reais do Verah, que estão disponíveis e exatos. shadcn entra sem M3,
estilizado direto pela marca.

**O Figma MCP oficial foi instalado** (`https://mcp.figma.com/mcp`, escopo
`user`, em 04/09/2026), mas **não será usado no Verah**: o arquivo Figma
pertence à agência da construtora e não temos acesso. A extração de tokens 1:1
prevista no prompt foi feita a partir das CSS custom properties do site
oficial — que são a mesma fonte de verdade, já compilada. O servidor fica
disponível para projetos futuros. Requer plano Figma pago para devolver código
e variáveis.

**Framer MCP não será instalado.** Não existe servidor oficial da Framer — só
implementações de terceiros, que exigiriam acesso de escrita a um projeto
Framer. E não existe projeto Framer do Verah, então não haveria o que ler.
Revisitar apenas se surgir um projeto Framer com necessidade concreta.

**Expo fica fora desta rodada.** Portabilidade para app nativo não tem
requisito concreto hoje; a decisão que a preserva é manter `submitLead` e
`content/verah.ts` livres de dependência de DOM, o que já está no desenho.

**Transitions.dev não será adotado.** Motion cobre transição de estado e do
drawer; uma terceira biblioteca de animação aumentaria a superfície sem
resolver nada que as duas já não resolvam.

**Fora do escopo desta rodada:** deploy, SEO de produção (as regras do
`lps-icasa` valem, mas se aplicam na publicação), `LP_ALLOWED_ORIGINS`,
GTM/Pixel instalados, e conteúdo que ainda não existe (preço, data,
renders, plantas de apartamento).

---

## 12. Entregáveis

1. Estrutura dos 8 blocos da sessão, navegável.
2. Sistema de animação de entrada/saída por bloco, com fronteira Motion/GSAP.
3. Trilho de progresso da sessão.
4. CTA fixo + 2 CTAs contextuais, sincronizados com o drawer.
5. Formulário com validação, estado de sucesso e fallback WhatsApp.
6. `content/verah.ts` — camada de conteúdo desacoplada e tipada.
7. Pontos de tracking instrumentados.
8. Testes Vitest da lógica pura.
