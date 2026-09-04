import { describe, it, expect } from 'vitest'
import { verah, BLOCOS } from './verah'

describe('conteúdo do Verah', () => {
  it('tem os oito blocos da sessão, em ordem e com id único', () => {
    expect(BLOCOS).toHaveLength(8)
    const ids = BLOCOS.map((b) => b.id)
    expect(new Set(ids).size).toBe(8)
  })

  it('tem as quatro tipologias reais do empreendimento', () => {
    expect(verah.tipologias.map((t) => t.area)).toEqual([52, 54.7, 56, 70])
  })

  it('nomeia todas as cinco imagens do book', () => {
    expect(verah.lazer.imagens).toHaveLength(5)
    for (const img of verah.lazer.imagens) {
      expect(img.src.startsWith('/book/')).toBe(true)
      expect(img.alt.length).toBeGreaterThan(10)
      expect(img.largura).toBeGreaterThan(0)
      expect(img.altura).toBeGreaterThan(0)
    }
  })

  it('guarda o WhatsApp em dígitos, pronto para a URL', () => {
    expect(verah.contato.whatsapp).toMatch(/^\d{12,13}$/)
  })
})
