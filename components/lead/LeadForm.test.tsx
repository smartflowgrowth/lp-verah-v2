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
    fireEvent.submit(screen.getByRole('button', { name: /Entrar na lista/ }).closest('form')!)
    expect(await screen.findByText('Escolha uma faixa.')).toBeInTheDocument()
    expect(submitLead).not.toHaveBeenCalled()
  })

  // Planta fica em branco de propósito: é o caso de quem chega pelo botão
  // fixo, e era exatamente o que travava o envio sem aviso.
  it('envia a faixa de renda escolhida, mesmo sem planta', async () => {
    render(<LeadForm />)
    preencherObrigatorios()
    fireEvent.click(screen.getByLabelText('R$ 6 a 12 mil'))
    fireEvent.submit(screen.getByRole('button', { name: /Entrar na lista/ }).closest('form')!)
    await waitFor(() => expect(submitLead).toHaveBeenCalledTimes(1))
    expect(vi.mocked(submitLead).mock.calls[0][0]).toMatchObject({
      renda: '6-a-12',
      interesse: 'morador',
      telefone: '12981885875',
    })
  })
})
