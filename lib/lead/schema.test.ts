import { describe, it, expect } from 'vitest'
import { esquemaLead } from './schema'

const valido = {
  nome: 'Matheus Almeida',
  telefone: '+55 (12) 98189-3999',
  email: 'matheus@exemplo.com.br',
  interesse: 'morador' as const,
  empresa: '',
}

describe('esquemaLead', () => {
  it('aceita um cadastro válido e normaliza o telefone', () => {
    const r = esquemaLead.safeParse(valido)
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.telefone).toBe('12981893999')
  })

  it('recusa nome com menos de duas palavras', () => {
    const r = esquemaLead.safeParse({ ...valido, nome: 'Matheus' })
    expect(r.success).toBe(false)
  })

  it('recusa e-mail malformado', () => {
    const r = esquemaLead.safeParse({ ...valido, email: 'matheus@' })
    expect(r.success).toBe(false)
  })

  it('recusa telefone com dígitos a mais mesmo depois de tirar o país', () => {
    const r = esquemaLead.safeParse({ ...valido, telefone: '5512981893999123' })
    expect(r.success).toBe(false)
  })

  it('recusa interesse fora da lista', () => {
    const r = esquemaLead.safeParse({ ...valido, interesse: 'curioso' })
    expect(r.success).toBe(false)
  })

  it('recusa quando o honeypot vem preenchido', () => {
    const r = esquemaLead.safeParse({ ...valido, empresa: 'bot' })
    expect(r.success).toBe(false)
  })

  it('aceita o corretor indicado, que é opcional', () => {
    const semCorretor = esquemaLead.safeParse(valido)
    expect(semCorretor.success).toBe(true)
    const comCorretor = esquemaLead.safeParse({ ...valido, corretor: '  Ana Souza  ' })
    expect(comCorretor.success).toBe(true)
    if (comCorretor.success) expect(comCorretor.data.corretor).toBe('Ana Souza')
  })

  it('recusa nome de corretor absurdamente longo', () => {
    const r = esquemaLead.safeParse({ ...valido, corretor: 'x'.repeat(81) })
    expect(r.success).toBe(false)
  })

  it('aceita plantaInteresse opcional', () => {
    const r = esquemaLead.safeParse({ ...valido, plantaInteresse: '70 m²' })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.plantaInteresse).toBe('70 m²')
  })
})
