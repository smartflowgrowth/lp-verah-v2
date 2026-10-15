'use client'

import { verah } from '@/content/verah'
import { useSessao } from './SessionProvider'

/**
 * O botão de cadastro, usado em dois lugares: no fluxo do herói (abaixo da
 * frase de abertura) e dentro do CTA fixo, a partir da segunda sessão.
 *
 * Ancorar o do herói no fluxo — em vez de posicioná-lo por porcentagem da
 * viewport — é o que o mantém abaixo da frase em qualquer altura de tela.
 */
export function CtaPrincipal({
  className = '',
  destaque = false,
  claro = false,
}: {
  className?: string
  destaque?: boolean
  /** Sobre fundo escuro (o herói com a fachada), o botão inverte. */
  claro?: boolean
}) {
  const { abrirDrawer } = useSessao()

  return (
    <button
      type="button"
      onClick={() => abrirDrawer('fixo')}
      className={`rounded-full px-7 py-4 text-sm font-medium tracking-wide shadow-lg backdrop-blur transition-colors duration-300 ${
        claro ? 'bg-cream text-cocoa hover:bg-gold' : 'bg-cocoa/95 text-cream hover:bg-cocoa'
      } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
        destaque ? 'ring-2 ring-gold/50' : ''
      } ${className}`}
    >
      {verah.cta.fixo}
    </button>
  )
}
