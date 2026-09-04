export type EventoSessao =
  | 'sessao_bloco_visto'
  | 'cta_click'
  | 'form_abriu'
  | 'form_enviou'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

/**
 * Único ponto de saída de telemetria. Nenhum pixel instalado nesta rodada —
 * os eventos ficam no dataLayer esperando o GTM da publicação.
 */
export function track(
  evento: EventoSessao,
  props: Record<string, unknown> = {},
): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event: evento, ...props })
}
