import { describe, it, expect } from 'vitest'
import { asset, srcSetBook } from './asset'

describe('asset', () => {
  it('prefixa com o basePath de produção por padrão', () => {
    expect(asset('/book/fachada.jpg')).toBe('/verah/book/fachada.jpg')
  })

  it('monta o srcset com a versão 640 e a original', () => {
    expect(
      srcSetBook({ src: '/book/x.jpg', alt: 'x', largura: 1600, altura: 900, legenda: '' }),
    ).toBe('/verah/book/x-640.jpg 640w, /verah/book/x.jpg 1600w')
  })
})
