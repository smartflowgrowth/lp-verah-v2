import type { Metadata } from 'next'
import { Marcellus, Montserrat } from 'next/font/google'
import { verah } from '@/content/verah'
import { PREVIA } from '@/lib/asset'
import './globals.css'

const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marcellus',
  display: 'swap',
  // Sem preload, por regra do projeto: as fontes somam ~77 KiB em prioridade
  // alta, a mesma do recurso do LCP, e em 4G lento roubam banda dele dentro
  // da janela medida. Com font-display swap o texto aparece na fonte de
  // sistema e troca depois de qualquer jeito.
  preload: false,
})

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: false,
})

const TITULO = 'Verah Caçapava — apartamentos de 2 e 3 dormitórios'
const DESCRICAO =
  'Verah, em Caçapava: apartamentos de 2 e 3 dormitórios, de 52 a 70 m², com varanda e vista para a Serra da Mantiqueira. Entre na lista de espera.'

export const metadata: Metadata = {
  metadataBase: new URL(verah.seo.url),
  title: TITULO,
  description: DESCRICAO,
  // Autorreferente e absoluto, idêntico a seo.url.
  alternates: { canonical: verah.seo.url },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: verah.seo.url,
    siteName: 'iCasa Imóveis — Lançamentos',
    title: TITULO,
    description: DESCRICAO,
    images: [{ url: verah.seo.ogImagem, width: 1200, height: 630, alt: TITULO }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITULO,
    description: DESCRICAO,
    images: [verah.seo.ogImagem],
  },
  robots: PREVIA ? { index: false, follow: false } : { index: true, follow: true },
}

/**
 * Três entidades, como manda a regra do projeto: o empreendimento, a
 * imobiliária que atende, e o FAQ — este último só porque as respostas
 * estão de fato visíveis na página, no bloco de dúvidas.
 */
function dadosEstruturados() {
  const { endereco, tipologias, construtora, duvidas, contato, seo } = verah

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ApartmentComplex',
      name: 'Verah',
      url: seo.url,
      image: seo.ogImagem,
      description: DESCRICAO,
      numberOfAccommodationUnits: tipologias.length,
      address: {
        '@type': 'PostalAddress',
        streetAddress: endereco.logradouro,
        addressLocality: endereco.cidade,
        addressRegion: endereco.uf,
        addressCountry: 'BR',
      },
      amenityFeature: verah.lazer.itens.map(({ nome }) => ({
        '@type': 'LocationFeatureSpecification',
        name: nome,
        value: true,
      })),
      accommodationFloorPlan: tipologias.map((t) => ({
        '@type': 'FloorPlan',
        name: t.rotulo,
        numberOfBedrooms: t.dormitorios,
        floorSize: { '@type': 'QuantitativeValue', value: t.area, unitCode: 'MTK' },
      })),
      builder: { '@type': 'Organization', name: construtora.nome },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: 'iCasa Imóveis',
      url: 'https://lancamentos.icasaimob.com.br/',
      telephone: `+${contato.whatsapp}`,
      areaServed: { '@type': 'City', name: endereco.cidade },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: duvidas.perguntas.map((p) => ({
        '@type': 'Question',
        name: p.pergunta,
        acceptedAnswer: { '@type': 'Answer', text: p.resposta },
      })),
    },
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${marcellus.variable} ${montserrat.variable}`}>
      <body>
        {children}
        {PREVIA && (
          <p className="pointer-events-none fixed left-3 top-3 z-[80] rounded-full bg-brick px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cream">
            Prévia — cadastros não são gravados
          </p>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados()) }}
        />
      </body>
    </html>
  )
}
