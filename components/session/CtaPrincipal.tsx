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
}: {
  className?: string
  destaque?: boolean
}) {
  const { abrirDrawer } = useSessao()

  return (
    <button
      type="button"
      onClick={() => abrirDrawer('fixo')}
      className={`rounded-full bg-cocoa/95 px-7 py-4 text-sm font-medium tracking-wide text-cream shadow-lg backdrop-blur transition-colors duration-300 hover:bg-cocoa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
        destaque ? 'ring-2 ring-gold/50' : ''
      } ${className}`}
    >
      {verah.cta.fixo}
    </button>
  )
}
