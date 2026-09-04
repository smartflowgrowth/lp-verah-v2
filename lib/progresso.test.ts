import { describe, it, expect } from 'vitest'
import { calcularProgresso } from './progresso'

describe('calcularProgresso', () => {
  it('devolve 0 no topo', () => {
    expect(calcularProgresso(0, 5000, 1000)).toBe(0)
  })

  it('devolve 1 no fim', () => {
    expect(calcularProgresso(4000, 5000, 1000)).toBe(1)
  })

  it('devolve a fração no meio', () => {
    expect(calcularProgresso(2000, 5000, 1000)).toBe(0.5)
  })

  it('devolve 0 quando a página não rola', () => {
    expect(calcularProgresso(0, 800, 1000)).toBe(0)
  })

  it('trava em 0 e 1 fora dos limites, para não quebrar o trilho no bounce do iOS', () => {
    expect(calcularProgresso(-200, 5000, 1000)).toBe(0)
    expect(calcularProgresso(9999, 5000, 1000)).toBe(1)
  })
})
