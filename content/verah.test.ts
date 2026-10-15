import { describe, it, expect } from 'vitest'
import { verah, BLOCOS } from './verah'

describe('conteúdo do Verah', () => {
  it('tem os blocos da sessão com id único, terminando nas dúvidas', () => {
    const ids = BLOCOS.map((b) => b.id)
    expect(new Set(ids).size).toBe(BLOCOS.length)
    // A narrativa abre na vista e fecha no FAQ, que é o bloco que leva o
    // HTML servido acima do mínimo de palavras exigido pelo prerender.
    expect(ids[0]).toBe('vista')
    expect(ids.at(-1)).toBe('duvidas')
    expect(ids).toContain('fila')
  })

  it('nunca põe dois blocos densos em sequência', () => {
    const densos = BLOCOS.map((b) => b.ritmo === 'denso')
    const seguidos = densos.some((d, i) => d && densos[i + 1])
    expect(seguidos).toBe(false)
  })

  it('tem as quatro tipologias do book de vendas', () => {
    expect(verah.tipologias.map((t) => [t.tipo, t.area])).toEqual([
      ['B', 52],
      ['C', 54],
      ['D', 56],
      ['A', 70],
    ])
  })

  it('distribui os dez finais do andar entre as tipologias, sem repetir', () => {
    const finais = verah.tipologias.flatMap((t) => t.finais).sort((a, b) => a - b)
    expect(finais).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('tem planta humanizada em A, B e D; o C ainda não', () => {
    const comPlanta = verah.tipologias.filter((t) => t.planta).map((t) => t.tipo)
    expect(comPlanta.sort()).toEqual(['A', 'B', 'D'])
  })

  it('lista os 16 itens de lazer do book, sem contagem', () => {
    expect(verah.lazer.itens).toHaveLength(16)
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
