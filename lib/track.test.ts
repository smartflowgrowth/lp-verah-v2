import { describe, it, expect, beforeEach } from 'vitest'
import { track } from './track'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

describe('track', () => {
  beforeEach(() => {
    window.dataLayer = []
  })

  it('empurra o evento com as props para o dataLayer', () => {
    track('cta_click', { origem: 'fixo' })
    expect(window.dataLayer).toEqual([{ event: 'cta_click', origem: 'fixo' }])
  })

  it('cria o dataLayer quando ele ainda não existe', () => {
    delete window.dataLayer
    track('form_abriu', { origem: 'plantas' })
    expect(window.dataLayer).toHaveLength(1)
  })

  it('aceita evento sem props', () => {
    track('sessao_bloco_visto')
    expect(window.dataLayer?.[0]).toEqual({ event: 'sessao_bloco_visto' })
  })
})
