import '@testing-library/jest-dom/vitest'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LeadForm } from './LeadForm'
import { submitLead } from '@/lib/lead/submitLead'

vi.mock('@/lib/lead/submitLead', () => ({
  submitLead: vi.fn(async () => ({ ok: true })),
  urlWhatsapp: () => '#',
}))
vi.mock('@/lib/track', () => ({ track: vi.fn() }))
// O jsdom não implementa scrollIntoView, que o formulário usa com o teclado.
Element.prototype.scrollIntoView = vi.fn()

function preencherObrigatorios() {
  fireEvent.change(screen.getByLabelText(/Nome e sobrenome/i), {
    target: { value: 'Maria Souza' },
  })
  fireEvent.change(screen.getByLabelText(/WhatsApp com DDD/i), {
    target: { value: '12981885875' },
  })
  fireEvent.click(screen.getByLabelText('Quero morar'))
}

describe('formulário de lead', () => {
  beforeEach(() => vi.mocked(submitLead).mockClear())

  it('não envia sem a faixa de renda', async () => {
    render(<LeadForm />)
    preencherObrigatorios()
    fireEvent.click(screen.getByLabelText('A · 70 m²'))
    fireEvent.submit(screen.getByRole('button', { name: /Entrar na lista/ }).closest('form')!)
    expect(await screen.findByText('Escolha uma faixa.')).toBeInTheDocument()
    expect(submitLead).not.toHaveBeenCalled()
  })

  // Planta em branco é o caso de quem chega pelo botão fixo: precisa avisar,
  // e não travar calado como acontecia quando o campo era opcional.
  it('não envia sem planta e mostra o aviso', async () => {
    render(<LeadForm />)
    preencherObrigatorios()
    fireEvent.click(screen.getByLabelText('R$ 10 a R$ 15 mil'))
    fireEvent.submit(screen.getByRole('button', { name: /Entrar na lista/ }).closest('form')!)
    expect(await screen.findByText('Escolha uma planta.')).toBeInTheDocument()
    expect(submitLead).not.toHaveBeenCalled()
  })

  it('envia com renda e planta escolhidas', async () => {
    render(<LeadForm />)
    preencherObrigatorios()
    fireEvent.click(screen.getByLabelText('R$ 10 a R$ 15 mil'))
    fireEvent.click(screen.getByLabelText('A · 70 m²'))
    fireEvent.submit(screen.getByRole('button', { name: /Entrar na lista/ }).closest('form')!)
    await waitFor(() => expect(submitLead).toHaveBeenCalledTimes(1))
    expect(vi.mocked(submitLead).mock.calls[0][0]).toMatchObject({
      renda: '10-a-15',
      plantaInteresse: 'Tipo A · 70 m²',
      interesse: 'morador',
    })
  })

  it('aceita a planta que já chega marcada pelo card', async () => {
    render(<LeadForm plantaInteresse="Tipo B · 52 m²" />)
    preencherObrigatorios()
    fireEvent.click(screen.getByLabelText('Acima de R$ 15 mil'))
    fireEvent.submit(screen.getByRole('button', { name: /Entrar na lista/ }).closest('form')!)
    await waitFor(() => expect(submitLead).toHaveBeenCalledTimes(1))
    expect(vi.mocked(submitLead).mock.calls[0][0].plantaInteresse).toBe('Tipo B · 52 m²')
  })
})
