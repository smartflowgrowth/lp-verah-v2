import type { Metadata } from 'next'
import { Marcellus, Montserrat } from 'next/font/google'
import './globals.css'

const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marcellus',
  display: 'swap',
})

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VERAH — lar à primeira vista | Caçapava',
  description:
    'Apartamentos de 2 e 3 dormitórios em Caçapava, de 52 a 70 m², com vista para a Serra da Mantiqueira. Pré-lançamento Marcondes Cesar.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${marcellus.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  )
}
