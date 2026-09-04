import type { DadosLead } from './schema'

export type ResultadoEnvio =
  | { ok: true }
  | { ok: false; motivo: string }

/**
 * Única interface de envio de lead da aplicação.
 *
 * Nesta rodada é um stub: a validação interna não deve sujar o CRM.
 * Na publicação, o corpo desta função vira o fetch para a Edge Function
 * `lead-lp` com `origem: 'lp-verah'` — e nenhum componente muda.
 */
export async function submitLead(dados: DadosLead): Promise<ResultadoEnvio> {
  if (process.env.NODE_ENV !== 'production') {
    console.info('[verah] lead capturado (stub, não enviado):', dados)
  }
  await new Promise((r) => setTimeout(r, 600))
  return { ok: true }
}

/** Fallback: a conversa vale mais que o registro. */
export function urlWhatsapp(numero: string, mensagem: string): string {
  return `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensagem)}`
}
