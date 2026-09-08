import { describe, it, expect } from 'vitest'
import { normalizarTelefone, formatarTelefone } from './telefone'
import { verah } from '@/content/verah'

describe('normalizarTelefone', () => {
  it('remove máscara e código do país', () => {
    expect(normalizarTelefone('+55 (12) 98189-3999')).toBe('12981893999')
  })

  it('mantém celular já limpo', () => {
    expect(normalizarTelefone('12981893999')).toBe('12981893999')
  })

  it('mantém fixo de dez dígitos', () => {
    expect(normalizarTelefone('(12) 3456-7890')).toBe('1234567890')
  })

  it('não corta o 55 quando ele é o DDD', () => {
    // 55 é o DDD do Rio Grande do Sul; 11 dígitos já é o formato final.
    expect(normalizarTelefone('55987654321')).toBe('55987654321')
  })

  it('devolve só os dígitos quando o valor é curto demais', () => {
    expect(normalizarTelefone('12 9818')).toBe('129818')
  })
})

describe('formatarTelefone', () => {
  it('formata celular de onze dígitos', () => {
    expect(formatarTelefone('12981893999')).toBe('(12) 98189-3999')
  })

  it('formata fixo de dez dígitos', () => {
    expect(formatarTelefone('1234567890')).toBe('(12) 3456-7890')
  })

  it('formata parcialmente durante a digitação', () => {
    expect(formatarTelefone('12')).toBe('(12')
    expect(formatarTelefone('129')).toBe('(12) 9')
  })
})

/**
 * O campo de telefone usa como exemplo o próprio número que atende o
 * empreendimento. Este teste existe porque as duas coisas já divergiram: o
 * placeholder ficou meses com o número da construtora depois que o contato
 * passou a ser o do corretor. Derivar um do outro resolve, e o teste
 * garante que a derivação continua válida se o número mudar.
 */
describe('placeholder do campo de telefone', () => {
  it('é o número de contato do empreendimento, formatado', () => {
    const placeholder = formatarTelefone(verah.contato.whatsapp)
    expect(normalizarTelefone(placeholder)).toBe(normalizarTelefone(verah.contato.whatsapp))
    expect(placeholder).toMatch(/^\(\d{2}\) \d{4,5}-\d{4}$/)
  })
})
