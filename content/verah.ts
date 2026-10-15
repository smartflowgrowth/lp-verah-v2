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
  { id: 'personalizacao', rotulo: 'Por que agora', ritmo: 'medio' },
  { id: 'construtora', rotulo: '45 anos', ritmo: 'respiravel' },
  { id: 'fila', rotulo: 'A fila', ritmo: 'denso' },
  /* Longo, mas de leitura escaneável: quem chega aqui lê só a pergunta
     que interessa. Denso é o que exige atenção contínua — o scrub das
     plantas e o formulário. */
  { id: 'duvidas', rotulo: 'Dúvidas', ritmo: 'medio' },
] as const

export type Tipologia = {
  id: string
  /** Letra do book de vendas. */
  tipo: 'A' | 'B' | 'C' | 'D'
  area: number
  areaRotulo: string
  /** O que vai para o lead e para o seletor do formulário. */
  rotulo: string
  dormitorios: 2 | 3
  dormitoriosRotulo: string
  vagas: string
  finais: number[]
  comodos: string[]
  destaque: string
  /** Sem planta, o card mostra "planta em breve". */
  planta?: ImagemBook
}

export type ItemLazer = {
  nome: string
  nota?: string
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
    selo: 'pré-lançamento',
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
    aviso: 'Tempos aproximados de deslocamento.',
  },

  torre: {
    titulo: 'Uma torre. Nada de vizinhança vertical anônima.',
    apoio:
      'Torre única de 11 andares, com o número de unidades que permite conhecer quem mora ao lado.',
    fatos: [
      { valor: '11', rotulo: 'andares' },
      { valor: '10', rotulo: 'apartamentos por andar' },
      { valor: '2', rotulo: 'elevadores' },
      { valor: '100%', rotulo: 'das plantas com varanda' },
    ],
    fachada: {
      src: '/book/fachada.jpg',
      alt: 'Perspectiva da fachada do Verah: torre única de 11 andares com varandas em madeira e a portaria com o nome Verah, na Av. Dr. José de Moura Resende, em Caçapava',
      largura: 1200,
      altura: 1433,
      legenda: 'Perspectiva ilustrativa da fachada',
    } as ImagemBook,
  },

  /** Ordem crescente de metragem. Letras e finais conforme o book de vendas. */
  tipologias: [
    {
      id: 'tipo-b',
      tipo: 'B',
      area: 52,
      areaRotulo: '52 m²',
      rotulo: 'Tipo B · 52 m²',
      dormitorios: 2,
      dormitoriosRotulo: '2 dorms, 1 suíte',
      vagas: '1 vaga',
      finais: [3, 8],
      comodos: [
        '2 dormitórios, sendo 1 suíte',
        'Sala de estar e jantar integrada',
        'Cozinha com área de serviço',
        'Varanda',
        '1 vaga de garagem',
      ],
      destaque: 'O compacto que não abre mão da varanda.',
      planta: {
        src: '/book/planta-b.jpg',
        alt: 'Planta humanizada do Tipo B do Verah, 52 m²: dois dormitórios sendo uma suíte, sala de estar e jantar integrada, cozinha com área de serviço e varanda',
        largura: 1600,
        altura: 992,
        legenda: 'Tipo B · 52 m²',
      },
    },
    {
      id: 'tipo-c',
      tipo: 'C',
      area: 54,
      areaRotulo: '54 m²',
      rotulo: 'Tipo C · 54 m²',
      dormitorios: 2,
      dormitoriosRotulo: '2 dorms, 1 suíte',
      vagas: '1 vaga',
      finais: [4, 9],
      comodos: ['2 dormitórios, sendo 1 suíte', 'Varanda', '1 vaga de garagem'],
      destaque: 'Mais social, mesma pegada.',
    },
    {
      id: 'tipo-d',
      tipo: 'D',
      area: 56,
      areaRotulo: '56 m²',
      rotulo: 'Tipo D · 56 m²',
      dormitorios: 2,
      dormitoriosRotulo: '2 dorms, 1 suíte',
      vagas: '1 vaga',
      finais: [5, 10],
      comodos: [
        '2 dormitórios, sendo 1 suíte',
        'Living integrado à cozinha',
        'Bancada americana',
        'Varanda',
        '1 vaga de garagem',
      ],
      destaque: 'O equilíbrio entre estar e receber.',
      planta: {
        src: '/book/planta-d.jpg',
        alt: 'Planta humanizada do Tipo D do Verah, 56 m²: dois dormitórios sendo uma suíte, living integrado à cozinha com bancada americana e varanda',
        largura: 1600,
        altura: 826,
        legenda: 'Tipo D · 56 m²',
      },
    },
    {
      id: 'tipo-a',
      tipo: 'A',
      area: 70,
      areaRotulo: '70 m²',
      rotulo: 'Tipo A · 70 m²',
      dormitorios: 3,
      dormitoriosRotulo: '3 dorms com suíte',
      vagas: '1 ou 2 vagas',
      finais: [1, 2, 6, 7],
      comodos: [
        '3 dormitórios com suíte',
        'Living com jantar amplo',
        'Cozinha integrada com bancada',
        'Varanda',
        '1 ou 2 vagas de garagem',
      ],
      destaque: 'Três dormitórios sem apertar o convívio.',
      planta: {
        src: '/book/planta-a.jpg',
        alt: 'Planta humanizada do Tipo A do Verah, 70 m²: três dormitórios com suíte, living com jantar amplo, cozinha integrada com bancada e varanda',
        largura: 1600,
        altura: 933,
        legenda: 'Tipo A · 70 m²',
      },
    },
  ] as Tipologia[],

  plantas: {
    titulo: 'Para cada fase da vida, uma dimensão.',
    apoio:
      'Quatro tipologias de 2 e 3 dormitórios, todas com suíte e varanda. Cada final de unidade tem a sua planta.',
    ctaContextual: 'Quero esta planta',
    emBreve: 'Planta em breve',
    avisoMetragem:
      'Metragens privativas aproximadas, sujeitas a confirmação no memorial descritivo e no registro da incorporação.',
    avisoPlanta:
      'Plantas humanizadas com sugestão de decoração. Móveis e objetos não fazem parte do contrato.',
  },

  lazer: {
    titulo: 'Seu quintal, seu resort.',
    apoio: 'Uma área de lazer que Caçapava nunca viveu.',
    /* Só a lista, sem contagem: o book fala em "10 áreas de lazer" numa
       página e lista 16 itens em outra. */
    itens: [
      { nome: 'Piscina adulta e infantil' },
      { nome: 'Quadra de beach sports' },
      { nome: 'Espaço pet' },
      { nome: 'Vestiário e banheiro' },
      { nome: 'Espaço fitness', nota: '62,45 m², musculação e alongamento' },
      { nome: 'Coworking', nota: 'afastado das áreas de maior ruído' },
      { nome: 'Espaço influencer', nota: 'sala com tratamento de ruído' },
      { nome: 'Espaço estética', nota: 'climatizado, com área de spa e massagem' },
      { nome: 'Espaço gourmet', nota: 'em duas áreas, junto ao lazer externo' },
      { nome: 'Espaço kids' },
      { nome: 'Salão de festas', nota: '93,14 m², setorizado para eventos' },
      { nome: 'Copa do salão de festas' },
      { nome: 'Salão de jogos', nota: 'com tratamento acústico' },
      { nome: 'Lavanderia compartilhada' },
      { nome: 'Mercadinho' },
      { nome: 'Pátio externo' },
    ] as ItemLazer[],
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
        largura: 1600,
        altura: 881,
        legenda: 'Piscina, beach sports e espaço pet',
      },
      {
        src: '/book/lazer-interno.jpg',
        alt: 'Planta das áreas comuns internas do Verah com fitness, coworking, espaço gourmet, salão de festas e espaço kids identificados',
        largura: 1600,
        altura: 893,
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
    titulo: 'Por que garantir no pré-\u2060lançamento.',
    apoio:
      'Quem entra agora escolhe primeiro, personaliza com mais margem e encontra as melhores condições da comercialização.',
    pilares: [
      {
        titulo: 'Escolha antecipada',
        texto:
          'Acesso às melhores unidades, andares e finais antes da abertura geral de vendas.',
      },
      {
        titulo: 'Personalização',
        texto:
          'Linha exclusiva para escolher acabamentos e composições antes da entrega, sem conviver com a obra.',
      },
      {
        titulo: 'Financiamento',
        texto: 'Condições de financiamento com possibilidade de uso do FGTS.',
      },
      {
        titulo: 'Condomínio inteligente',
        texto:
          'Tecnologia própria, em desenvolvimento, pensada para eficiência e vida em comunidade.',
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
      'Entre na lista de espera exclusiva e receba em primeira mão a tabela, as condições e o espelho de unidades do Verah.',
    aviso:
      'Imagens, perspectivas e plantas meramente ilustrativas. Móveis, objetos e itens decorativos não fazem parte do contrato. Metragens, tipologias, itens de lazer e especificações sujeitos a alteração até o registro da incorporação. Material de pré-lançamento, sem caráter de oferta.',
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
    atualizadaEm: '2026-10-15',
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
          'O empreendimento está em fase de pré-lançamento e a data oficial ainda não foi divulgada pela Marcondes Cesar. Quem se cadastra na lista de interesse recebe em primeira mão a data prevista, a tabela de valores, o espelho de unidades e as condições de pré-lançamento — normalmente as melhores condições de toda a comercialização, porque valem enquanto o estoque está inteiro.',
      },
      {
        pergunta: 'Quais são as plantas e as metragens do Verah?',
        resposta:
          'São quatro tipologias, todas com suíte e varanda: Tipo B, com 52 m² e dois dormitórios; Tipo C, com 54 m² e dois dormitórios; Tipo D, com 56 m² e dois dormitórios; e Tipo A, com 70 m² e três dormitórios. O Tipo A pode ter uma ou duas vagas de garagem; os demais têm uma vaga. As plantas humanizadas dos tipos A, B e D já estão nesta página; a do Tipo C será divulgada em breve. As metragens são privativas e aproximadas, sujeitas a confirmação no memorial descritivo.',
      },
      {
        pergunta: 'Qual planta fica em cada final de unidade?',
        resposta:
          'Cada andar tem dez apartamentos, e o final da unidade indica a planta. Os finais 1, 2, 6 e 7 são do Tipo A, de 70 m² e três dormitórios. Os finais 3 e 8 são do Tipo B, de 52 m². Os finais 4 e 9 são do Tipo C, de 54 m². E os finais 5 e 10 são do Tipo D, de 56 m². Quem entra na lista no pré-lançamento tem acesso antecipado ao espelho de unidades para escolher andar e final antes da abertura geral de vendas.',
      },
      {
        pergunta: 'Quantas torres tem o Verah?',
        resposta:
          'Uma só. O Verah é um empreendimento de torre única, com 11 andares, dez apartamentos por andar e dois elevadores. A escolha por torre única muda a convivência: o número de unidades permite que os moradores se conheçam, em vez da vizinhança vertical anônima de condomínios com várias torres. O projeto também prevê dimensionamento para instalar cobertura nas vagas de garagem, caso o condomínio decida fazer isso no futuro.',
      },
      {
        pergunta: 'O que tem na área de lazer do Verah?',
        resposta:
          'Na área externa, piscina adulta e infantil, quadra de beach sports, espaço pet e vestiário com banheiro. Na área interna, espaço fitness de 62,45 m² com musculação e alongamento, coworking afastado das áreas de maior ruído, espaço influencer com tratamento de ruído, espaço estética climatizado com área de spa e massagem, espaço gourmet em duas áreas junto ao lazer externo, espaço kids, salão de festas de 93,14 m² setorizado para eventos com copa própria, salão de jogos com tratamento acústico, lavanderia compartilhada, mercadinho e pátio externo.',
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
