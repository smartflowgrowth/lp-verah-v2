export type IdBloco =
  | 'vista'
  | 'endereco'
  | 'torre'
  | 'plantas'
  | 'quintal'
  | 'personalizacao'
  | 'construtora'
  | 'fila'
  | 'duvidas'

export type Bloco = {
  id: IdBloco
  rotulo: string
  ritmo: 'respiravel' | 'medio' | 'denso'
}

/** Ordem da sessão. Nunca dois blocos densos seguidos. */
export const BLOCOS: readonly Bloco[] = [
  { id: 'vista', rotulo: 'A vista', ritmo: 'respiravel' },
  { id: 'endereco', rotulo: 'O endereço', ritmo: 'medio' },
  { id: 'torre', rotulo: 'A torre', ritmo: 'respiravel' },
  { id: 'plantas', rotulo: 'As plantas', ritmo: 'denso' },
  { id: 'quintal', rotulo: 'O quintal', ritmo: 'medio' },
  { id: 'personalizacao', rotulo: 'Seu jeito', ritmo: 'medio' },
  { id: 'construtora', rotulo: '45 anos', ritmo: 'respiravel' },
  { id: 'fila', rotulo: 'A fila', ritmo: 'denso' },
  /* Longo, mas de leitura escaneável: quem chega aqui lê só a pergunta
     que interessa. Denso é o que exige atenção contínua — o scrub das
     plantas e o formulário. */
  { id: 'duvidas', rotulo: 'Dúvidas', ritmo: 'medio' },
] as const

export type Tipologia = {
  id: string
  area: number
  areaRotulo: string
  dormitorios: 2 | 3
  vagas: string
  destaque: string
}

export type Pergunta = {
  pergunta: string
  resposta: string
}

export type ImagemBook = {
  src: string
  alt: string
  largura: number
  altura: number
  legenda: string
}

export const verah = {
  marca: {
    nome: 'VERAH',
    tagline: 'lar à primeira vista',
    selo: 'em breve',
  },

  vista: {
    titulo: 'Um lugar que você reconhece antes de conhecer.',
    apoio:
      'A Serra da Mantiqueira da sua janela. Uma vista que nenhum outro endereço de Caçapava pode oferecer.',
    convite: 'role para começar',
  },

  endereco: {
    logradouro: 'Av. Dr. José de Moura Resende',
    bairro: 'Vera Cruz',
    cidade: 'Caçapava',
    uf: 'SP',
    titulo: 'Endereço urbano, alma de bairro.',
    apoio:
      'Perto da infraestrutura do centro, com a acessibilidade da Dutra e a tranquilidade de uma região consolidada.',
    pontos: [
      { nome: 'Av. Brasil', minutos: 3, nota: 'a avenida mais importante da cidade' },
      { nome: 'Centro', minutos: 4, nota: 'comércio, serviços e bancos' },
      { nome: 'Via Dutra', minutos: 6, nota: 'acesso à Nestlé e às empresas da rodovia' },
    ],
    infraestrutura: 'Escolas, mercados, postos e farmácias no entorno imediato.',
  },

  torre: {
    titulo: 'Uma torre. Nada de vizinhança vertical anônima.',
    apoio:
      'Torre única, com o número de unidades que permite conhecer quem mora ao lado.',
    fatos: [
      { valor: '2', rotulo: 'elevadores' },
      { valor: '100%', rotulo: 'das plantas com varanda' },
      { valor: '2 e 3', rotulo: 'dormitórios' },
    ],
  },

  tipologias: [
    {
      id: 't52',
      area: 52,
      areaRotulo: '52 m²',
      dormitorios: 2,
      vagas: '1 vaga',
      destaque: 'O compacto que não abre mão da varanda.',
    },
    {
      id: 't5470',
      area: 54.7,
      areaRotulo: '54,70 m²',
      dormitorios: 2,
      vagas: '1 vaga',
      destaque: 'Mais social, mesma pegada.',
    },
    {
      id: 't56',
      area: 56,
      areaRotulo: '56 m²',
      dormitorios: 2,
      vagas: '1 vaga',
      destaque: 'O equilíbrio entre estar e guardar.',
    },
    {
      id: 't70',
      area: 70,
      areaRotulo: '70 m²',
      dormitorios: 3,
      vagas: '1 ou 2 vagas',
      destaque: 'Três dormitórios sem apertar o convívio.',
    },
  ] as Tipologia[],

  plantas: {
    titulo: 'Para cada fase da vida, uma dimensão.',
    apoio:
      'Plantas flexíveis, pensadas para adaptarem-se ao seu cotidiano. As imagens definitivas serão divulgadas no lançamento.',
    ctaContextual: 'Quero esta planta',
  },

  lazer: {
    titulo: 'Seu quintal, seu resort.',
    apoio: 'Uma área de lazer que Caçapava nunca viveu.',
    itens: [
      'Piscina adulta e infantil',
      'Quadra de beach sports',
      'Espaço pet',
      'Coworking',
      'Espaço influencer',
      'Fitness de 62,45 m²',
      'Salão de festas de 93,14 m²',
      'Espaço gourmet',
      'Espaço kids',
      'Salão de jogos',
      'Estética e spa',
      'Lavanderia compartilhada',
      'Mercadinho',
      'Pátio externo',
    ],
    imagens: [
      {
        src: '/book/lazer-implantacao.jpg',
        alt: 'Implantação do pavimento de lazer do Verah vista de cima, com piscina, quadra de beach sports e áreas gramadas',
        largura: 1220,
        altura: 662,
        legenda: 'Implantação do lazer',
      },
      {
        src: '/book/lazer-externo.jpg',
        alt: 'Área externa do Verah com piscina adulta e infantil, quadra de beach sports e espaço pet identificados',
        largura: 1220,
        altura: 672,
        legenda: 'Piscina, beach sports e espaço pet',
      },
      {
        src: '/book/lazer-interno.jpg',
        alt: 'Planta das áreas comuns internas do Verah com fitness, coworking, espaço gourmet, salão de festas e espaço kids identificados',
        largura: 1220,
        altura: 681,
        legenda: 'Fitness, coworking, gourmet e salão de festas',
      },
      {
        src: '/book/estrutura.jpg',
        alt: 'Quadro de diferenciais de estrutura do Verah: dois elevadores, varanda em todos os tipos, vagas por tipologia e cobertura de vagas sob demanda',
        largura: 1220,
        altura: 668,
        legenda: 'Estrutura pensada em cada detalhe',
      },
      {
        src: '/book/casa-ideal-ia.jpg',
        alt: 'Página do book do Verah sobre a casa ideal com inteligência artificial, com azulejos em tons de terracota e mostarda',
        largura: 1220,
        altura: 662,
        legenda: 'A casa ideal com inteligência artificial',
      },
    ] as ImagemBook[],
  },

  personalizacao: {
    titulo: 'Escolha cada detalhe. Sem obra, sem dor de cabeça.',
    apoio:
      'Linha exclusiva de personalização para você definir o seu lar como quem constrói uma casa — só que sem a obra.',
    pilares: [
      {
        titulo: 'Personalização de casa',
        texto:
          'Escolha acabamentos e composições antes da entrega, na linha exclusiva do Verah.',
      },
      {
        titulo: 'Inteligência financeira',
        texto:
          'Condições exclusivas de financiamento, com uso do FGTS.',
      },
      {
        titulo: 'Condomínio inteligente',
        texto:
          'Tecnologia em desenvolvimento para tornar o condomínio mais eficiente no financeiro, na logística e na vida em comunidade.',
      },
    ],
    ctaContextual: 'Quero as condições',
  },

  construtora: {
    nome: 'Marcondes Cesar',
    titulo: '45 anos construindo no Vale.',
    numeros: [
      { valor: 400000, prefixo: '+', sufixo: ' m²', rotulo: 'construídos', formatar: true },
      { valor: 75, prefixo: '+', sufixo: '', rotulo: 'empreendimentos', formatar: false },
      { valor: 12400, prefixo: '+', sufixo: '', rotulo: 'clientes', formatar: true },
      { valor: 45, prefixo: '', sufixo: '', rotulo: 'anos de história', formatar: false },
    ],
  },

  fila: {
    encerramento: 'Você chegou ao fim da sessão.',
    titulo: 'Reserve seu lugar na fila de quem chegou antes.',
    apoio:
      'Entre na lista exclusiva e seja um dos primeiros a receber condições de pré-lançamento, plantas, valores e a data prevista de lançamento.',
    aviso:
      'Imagens e informações preliminares, sujeitas a alteração até o lançamento.',
  },

  cta: {
    fixo: 'Cadastre seu interesse',
    rotuloDrawer: 'Entrar na lista exclusiva',
  },

  /**
   * Um termo-alvo por página, exclusivo entre as LPs do subdomínio.
   * `verah caçapava` é termo de marca: quem busca já viu o anúncio.
   */
  seo: {
    termoAlvo: 'verah caçapava',
    url: 'https://lancamentos.icasaimob.com.br/verah/',
    ogImagem: 'https://lancamentos.icasaimob.com.br/verah/og-verah.jpg',
    atualizadaEm: '2026-09-04',
    tituloH1: 'Apartamentos de 2 e 3 dormitórios em Caçapava',
  },

  duvidas: {
    titulo: 'Perguntas frequentes sobre o Verah, em Caçapava',
    apoio:
      'O Verah está em pré-lançamento. Reunimos abaixo o que mais perguntam sobre o empreendimento, a localização e as condições.',
    perguntas: [
      {
        pergunta: 'Onde fica o Verah, em Caçapava?',
        resposta:
          'O Verah fica na Av. Dr. José de Moura Resende, no bairro Vera Cruz, em Caçapava, interior de São Paulo. É uma região consolidada e tranquila, a três minutos de carro da Av. Brasil, a quatro minutos do centro da cidade e com acesso rápido à Via Dutra, o que encurta o caminho para a Nestlé e para as demais empresas instaladas na rodovia. No entorno imediato há escolas, mercados, farmácias e postos de combustível.',
      },
      {
        pergunta: 'Quando o Verah será lançado?',
        resposta:
          'O empreendimento está em fase de pré-lançamento e a data oficial ainda não foi divulgada pela Marcondes Cesar. Quem se cadastra na lista de interesse recebe em primeira mão a data prevista, as plantas completas, os valores e as condições de pré-lançamento — normalmente as melhores condições de toda a comercialização, porque valem enquanto o estoque está inteiro.',
      },
      {
        pergunta: 'Quais são as plantas e as metragens do Verah?',
        resposta:
          'Serão quatro tipologias, de 52 m², 54,70 m², 56 m² e 70 m², em opções de dois e três dormitórios. Todas as plantas têm varanda, sem exceção. As de três dormitórios, com 70 m², podem ter uma ou duas vagas de garagem; as demais tipologias têm uma vaga. As plantas detalhadas serão divulgadas no lançamento e vão primeiro para quem está na lista.',
      },
      {
        pergunta: 'Quantas torres tem o Verah?',
        resposta:
          'Uma só. O Verah é um empreendimento de torre única, com dois elevadores. A escolha por torre única muda a convivência: o número de unidades permite que os moradores se conheçam, em vez da vizinhança vertical anônima de condomínios com várias torres. O projeto também prevê dimensionamento para instalar cobertura nas vagas de garagem, caso o condomínio decida fazer isso no futuro.',
      },
      {
        pergunta: 'O que tem na área de lazer do Verah?',
        resposta:
          'A área de lazer reúne piscina adulta e infantil, quadra de beach sports, espaço pet, coworking, espaço influencer com tratamento acústico, academia de 62,45 m² com área de musculação e alongamento, salão de festas de 93,14 m² setorizado para eventos variados, espaço gourmet dividido em duas áreas, espaço kids, salão de jogos com tratamento acústico, sala de estética e spa, lavanderia compartilhada, mercadinho e pátio externo.',
      },
      {
        pergunta: 'Dá para usar o FGTS na compra?',
        resposta:
          'Sim. O Verah prevê condições exclusivas de financiamento com uso do FGTS. As regras específicas, o percentual de entrada e as parcelas durante a obra são apresentados no lançamento, e variam conforme o perfil de cada comprador e a análise de crédito. A equipe de vendas faz essa simulação de forma individual para quem está na lista de interesse.',
      },
      {
        pergunta: 'Como funciona a personalização do apartamento?',
        resposta:
          'O Verah terá uma linha exclusiva de personalização, para o comprador escolher acabamentos e composições antes da entrega — como quem constrói uma casa, mas sem conviver com a obra. A escolha acontece dentro de um prazo definido no cronograma da construtora; depois dele o apartamento segue o padrão do projeto. Quem entra cedo na lista tem mais margem para personalizar.',
      },
      {
        pergunta: 'O Verah tem vista para a Serra da Mantiqueira?',
        resposta:
          'Sim, e esse é um dos diferenciais do endereço. A posição do terreno e a altura da torre abrem a vista para a Serra da Mantiqueira, algo que poucos endereços de Caçapava conseguem oferecer. A orientação exata de cada unidade em relação à serra é detalhada na apresentação das plantas, no lançamento.',
      },
      {
        pergunta: 'Quem é a construtora do Verah?',
        resposta:
          'A Marcondes Cesar, construtora com 45 anos de história no Vale do Paraíba. São mais de 400 mil metros quadrados construídos, mais de 75 empreendimentos entregues e mais de 12.400 clientes atendidos ao longo desse período. O Verah é o empreendimento em que a construtora está desenvolvendo tecnologia para tornar o condomínio mais eficiente no financeiro, na logística e na construção de comunidade entre os moradores.',
      },
      {
        pergunta: 'Vale a pena comprar ainda no pré-lançamento?',
        resposta:
          'É a fase em que o comprador encontra o estoque completo, e portanto a maior liberdade de escolha de andar, posição e tipologia. As condições comerciais de pré-lançamento também costumam ser as mais vantajosas de toda a comercialização. Em contrapartida, é a fase de maior prazo até a entrega. O cadastro na lista não gera compromisso: serve para receber as informações antes da divulgação pública.',
      },
      {
        pergunta: 'Quais são os diferenciais de estrutura do Verah?',
        resposta:
          'A torre tem dois elevadores, o que reduz a espera nos horários de pico e melhora a circulação dos moradores. Todas as tipologias têm varanda, sem exceção — inclusive as menores. As unidades de três dormitórios podem ter uma ou duas vagas de garagem, conforme a planta escolhida, e as demais têm uma vaga. O projeto já nasce dimensionado para receber cobertura nas vagas, caso o condomínio decida instalar no futuro, sem obra estrutural depois.',
      },
      {
        pergunta: 'O que existe perto do Verah, em Caçapava?',
        resposta:
          'O bairro Vera Cruz é uma região consolidada, com escolas, mercados, farmácias e postos de combustível no entorno imediato — o dia a dia se resolve a pé ou com poucos minutos de carro. A Av. Brasil, principal avenida da cidade, fica a três minutos, e o centro de Caçapava a quatro. Para quem trabalha fora da cidade, o acesso à Via Dutra encurta o trajeto até a Nestlé e as demais empresas instaladas ao longo da rodovia.',
      },
      {
        pergunta: 'Como entro na lista de interesse do Verah?',
        resposta:
          'Basta preencher o formulário desta página com nome, WhatsApp e e-mail. O contato é feito por um especialista da iCasa Imóveis, que responde as dúvidas e envia o material completo assim que ele é liberado pela construtora. Se você já fala com um corretor, pode indicar o nome dele no campo próprio do formulário para que o atendimento continue com a mesma pessoa.',
      },
    ] as Pergunta[],
  },

  contato: {
    /* Corretor da iCasa que atende o Verah — o mesmo da LP do Parque Una.
       Não é o número da Marcondes Cesar: quem atende o lead é a
       imobiliária, não a construtora. */
    whatsapp: '5512981885875',
    mensagemWhatsapp:
      'Olá! Vim da página do VERAH e quero saber mais sobre o pré-lançamento.',
  },
}
// Sem `as const` no objeto: ele brigaria com as anotações `as Tipologia[]` e
// `as ImagemBook[]` de dentro. Os tipos exportados acima já garantem a forma.
