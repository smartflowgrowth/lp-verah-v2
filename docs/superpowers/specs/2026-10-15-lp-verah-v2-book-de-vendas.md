# LP Verah v2 — Atualização com o Book de Vendas

**Data:** 15/10/2026
**Origem:** `Book_de_Vendas_VERAH_1.pdf` (15 páginas, pré-lançamento)
**Base:** LP em produção em `lancamentos.icasaimob.com.br/verah/`
(spec anterior: `2026-09-04-lp-verah-design.md`)
**Estágio:** rascunho para aprovação. Nada desta rodada vai para produção
antes da validação.

---

## 1. Objetivo

Trocar o conteúdo "prévia" da LP pelas informações e imagens do book de
vendas — fachada, plantas humanizadas, metragens finais, finais de unidade,
números da torre — **sem mexer na mecânica que está captando leads**
(sessão de scroll, drawer, formulário, tracking, WhatsApp).

## 2. Ambiente temporário (decidido)

| Item | Decisão |
|---|---|
| Repositório | Novo: `smartflowgrowth/lp-verah-v2`, criado a partir do estado atual de `lp-verah` |
| Prévia | GitHub Pages do repo temporário |
| `basePath` | Configurável por env (`NEXT_PUBLIC_BASE_PATH`): `/lp-verah-v2` na prévia, `/verah` em produção |
| Indexação | Prévia com `noindex, nofollow` (meta + `robots.txt`) para não competir com a página oficial |
| Leads na prévia | O envio do formulário **não** grava no destino real: modo de teste (flag por env) que só registra no console/tracking de teste |
| Fim do ciclo | Aprovada a v2, o diff é aplicado em `lp-verah` (PR), publicado no nginx do `lps-icasa`, e o repo temporário é apagado |

Pré-requisito externo: o conector do GitHub falhou nesta sessão. Se
continuar indisponível, o repo precisa ser criado manualmente (vazio) e
liberado para o Claude; o resto é feito daqui.

## 3. Inventário: book × página atual

### 3.1 Dados que mudam

| Dado | Página atual | Book | Decisão |
|---|---|---|---|
| Tipo C | 54,70 m² | **54 m²** | **54 m²** (texto, cards, FAQ, formulário) |
| Letras das tipologias | ids internos (`t52`…) | **A, B, C, D** | Adotar A–D |
| Finais | — | A: 1, 2, 6, 7 · B: 3, 8 · C: 4, 9 · D: 5, 10 | Novo |
| Torre | "torre única", 2 elevadores | **11 andares, 10 apto/andar**, 2 elevadores | Novo |
| Lazer | 14 itens | 16 itens (+ vestiário e banheiro, + copa do salão de festas) | Atualizar lista |
| Plantas | "imagens definitivas no lançamento" | Plantas humanizadas de A, B e D | Substituir copy |
| Pré-lançamento | 3 pilares | 4 motivos (+ **Escolha antecipada**) | Atualizar |
| Avisos legais | 1 linha genérica | Textos completos (p. 5, 6–8, 13, 15) | Adotar os do book |

### 3.2 Imagens novas (extraídas do PDF em resolução original)

| Página | Imagem | Resolução | Uso |
|---|---|---|---|
| 3 | Render da fachada | 2160×2880 | Herói + bloco Torre |
| 6 | Planta Tipo B — 52 m² | 2360×1476 | Card B |
| 7 | Planta Tipo D — 56 m² | 2440×1364 | Card D |
| 8 | Planta Tipo A — 70 m² | 2440×1386 | Card A |
| 2 | Ilustração em traço da torre | 2160×2700 | Apoio visual (opcional, Torre ou Fila) |
| 13 | Azulejos (Casa Ideal IA) | 1040×1130 | Já existe uma versão em `public/book/` |

Cada imagem sai em duas larguras (640 e ~1600) com `srcset`, seguindo a
regra já aplicada em `Quintal.tsx`. As plantas do book trazem a metragem
"carimbada" na imagem; recortar esse rótulo se ele duplicar o número do card.

**Tipo C não tem planta no book.** O card do C mostra só os dados, com o
selo "planta em breve" e o mesmo CTA.

## 4. Mudanças por bloco

A ordem dos blocos e o ritmo (`BLOCOS` em `content/verah.ts`) não mudam.

### 4.1 A vista (herói)
- Fundo: render da fachada, com véu cocoa para manter contraste do título e
  do CTA. Mobile usa recorte vertical (a imagem já é retrato).
- Copy segue a atual; avaliar a linha do book "Uma vista que poucos
  conhecem" como apoio.
- `selo`: "em breve" → "pré-lançamento".

### 4.2 O endereço
- Sem mudança de dados (3/4/6 min já batem). Acrescentar a nota
  "tempos aproximados de deslocamento".

### 4.3 A torre
- Fachada ao lado do texto (desktop) / acima (mobile).
- Fatos: **11 andares · 10 apartamentos por andar · 2 elevadores · 100% com
  varanda**. Os "2 e 3 dormitórios" saem daqui (já estão nas plantas).

### 4.4 As plantas (bloco principal da mudança)
- Mantém o carrossel horizontal (scrub pinado no desktop, swipe no mobile).
- Ordem: B 52 → C 54 → D 56 → A 70 (crescente, como hoje).
- Card novo:
  - Letra do tipo + metragem em destaque.
  - Planta humanizada (clique abre em tela cheia / lightbox com zoom no
    mobile).
  - Lista de cômodos do book (ex.: "2 dormitórios, sendo 1 suíte · Sala de
    estar e jantar integrada · Cozinha com área de serviço · Varanda · 1 vaga").
  - **Finais** da tipologia.
  - CTA "Quero esta planta" (já envia a tipologia para o drawer).
- Abaixo do carrossel: tabela-resumo Tipo / Dormitórios / Área / Vagas /
  Finais, e o aviso "Metragens privativas aproximadas…" + "Planta humanizada
  com sugestão de decoração…".
- Desktop: o pin fica mais longo porque os cards crescem; validar que o
  scrub continua confortável.

### 4.5 O quintal
- Lista atualizada para 16 itens, com as notas curtas do book
  (ex.: "Espaço estética — climatizado, com área de spa e massagem").
- Imagens atuais continuam (implantação, externo, interno). Trocar pelas
  versões em alta do PDF (p. 10–11), que são as mesmas pranchas com melhor
  resolução.

### 4.6 Seu jeito (personalização)
- Passa a ser "Por que garantir no pré-lançamento", com os 4 motivos do
  book: Escolha antecipada · Personalização · Financiamento (FGTS) ·
  Condomínio inteligente.
- Mantém o CTA contextual "Quero as condições".

### 4.7 45 anos (construtora)
- Sem mudança (números não estão no book; seguem do site oficial).

### 4.8 A fila
- Copy alinhada ao book: "receba em primeira mão a tabela, as condições e o
  espelho de unidades".
- Aviso legal completo da p. 15.

### 4.9 Dúvidas
Atualizar respostas que ficaram desatualizadas:
- "Quais são as plantas e as metragens?" — A–D, 52/54/56/70 m², finais,
  plantas já disponíveis na página.
- "Quantas torres?" — acrescentar 11 andares e 10 por andar.
- "O que tem na área de lazer?" — 16 itens.
- "Quando será lançado?" — mantém (data não divulgada).
- Nova pergunta: "Qual planta fica em cada final?"

### 4.10 Formulário
- Seletor de tipologia passa a mostrar "Tipo A — 70 m²" etc. e 54 m² no C.
- Nenhuma outra mudança no schema, no envio ou no tracking.

## 5. SEO
- `atualizadaEm` → data da publicação da v2.
- Imagem OG: trocar pela fachada (1200×630).
- FAQ continua alimentando o JSON-LD; revisar após as novas respostas.

## 6. Fora de escopo
- Preço, tabela, espelho de unidades, data de lançamento (não estão no
  book; continuam sendo o gancho do cadastro).
- Mudança no destino dos leads ou na integração do formulário.
- Redesenho da identidade ou da sessão de scroll.

## 7. Critérios de aceite
1. Todas as metragens, finais e números da torre batem com o book.
2. Plantas A, B, D visíveis e legíveis no mobile (com zoom); C com "em breve".
3. Fachada no herói sem perder contraste do título/CTA (WCAG AA).
4. Formulário e drawer funcionando igual à produção; tipologia escolhida
   chega no lead.
5. `npm run lint`, `npm test` e `npm run build` limpos; testes de conteúdo
   atualizados (54 m², 16 itens de lazer, finais).
6. Lighthouse mobile da prévia ≥ ao da produção atual em Performance e
   Acessibilidade.
7. Prévia com `noindex` e sem gravar leads reais.

## 8. Pendências com o cliente
- Arquivos originais (sem compressão do PDF) do render e das plantas, se
  existirem.
- Planta do Tipo C, quando disponível.
- "10 áreas de lazer" (p. 14) × 16 itens listados (p. 12): qual número usar
  em chamadas curtas? Proposta: não usar contagem, só a lista.
