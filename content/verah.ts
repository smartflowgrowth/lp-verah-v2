export type IdBloco =
  | 'vista'
  | 'endereco'
  | 'torre'
  | 'plantas'
  | 'quintal'
  | 'personalizacao'
  | 'construtora'
  | 'fila'

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
] as const

export type Tipologia = {
  id: string
  area: number
  areaRotulo: string
  dormitorios: 2 | 3
  vagas: string
  destaque: string
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
    fixo: 'Falar com um especialista',
    rotuloDrawer: 'Entrar na lista exclusiva',
  },

  contato: {
    whatsapp: '5512981893999',
    mensagemWhatsapp:
      'Olá! Vim da página do VERAH e quero saber mais sobre o pré-lançamento.',
  },
}
// Sem `as const` no objeto: ele brigaria com as anotações `as Tipologia[]` e
// `as ImagemBook[]` de dentro. Os tipos exportados acima já garantem a forma.
