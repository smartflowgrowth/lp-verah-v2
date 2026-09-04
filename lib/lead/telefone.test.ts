import { describe, it, expect } from 'vitest'
import { normalizarTelefone, formatarTelefone } from './telefone'

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
