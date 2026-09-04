import { describe, it, expect } from 'vitest'
import { decidirMovimento } from './useSessionMotion'

/**
 * `prefers-reduced-motion` é requisito de acessibilidade da sessão e a única
 * chave que desliga pin e scrub do GSAP — media query no CSS não cobre isso,
 * porque o GSAP escreve transform inline e venceria a regra.
 */
describe('decidirMovimento', () => {
  it('anima normalmente quando o usuário não pediu menos movimento', () => {
    const m = decidirMovimento(false)
    expect(m.anima).toBe(true)
    expect(m.deslocamento).toBeGreaterThan(0)
  })

  it('desliga a animação e zera o deslocamento com movimento reduzido', () => {
    const m = decidirMovimento(true)
    expect(m.anima).toBe(false)
    expect(m.deslocamento).toBe(0)
  })

  it('encurta a duração quando o movimento é reduzido', () => {
    expect(decidirMovimento(true).duracao).toBeLessThan(decidirMovimento(false).duracao)
  })
})
