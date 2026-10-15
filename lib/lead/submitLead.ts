import { ROTULO_RENDA, type DadosLead } from './schema'
import { PREVIA } from '@/lib/asset'

export type ResultadoEnvio = { ok: true } | { ok: false; motivo: string }

/**
 * A LP não fala com o banco. Ela chama a Edge Function `lead-lp`, que grava
 * em `clientes` com service_role. A chave abaixo é publicável e só autoriza a
 * chamada da função — não dá acesso a nenhuma tabela.
 */
const SUPABASE = {
  url: 'https://yxzruvarveymsjghictn.supabase.co',
  publishableKey: 'sb_publishable_5gEm99MnntJg9nLzn0nXZw_-jeH5Ga2',
  funcao: 'lead-lp',
} as const

/** O slug vira `origem: 'lp-verah'` do lado da função. */
const EMPREENDIMENTO = 'verah'

/** Perder o registro é ruim; perder a conversa é pior. */
const TIMEOUT_MS = 4000

function capturarUtms(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const p = new URLSearchParams(window.location.search)
  const utms: Record<string, string> = {}
  for (const chave of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const v = p.get(chave)
    if (v) utms[chave] = v.slice(0, 200)
  }
  return utms
}

export async function submitLead(dados: DadosLead): Promise<ResultadoEnvio> {
  // A prévia roda em paralelo com a página no ar: nenhum lead de teste pode
  // cair na base real.
  if (PREVIA) {
    console.info('[verah] prévia: lead não enviado', dados)
    return { ok: true }
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const resp = await fetch(`${SUPABASE.url}/functions/v1/${SUPABASE.funcao}`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        apikey: SUPABASE.publishableKey,
        Authorization: `Bearer ${SUPABASE.publishableKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: dados.nome,
        telefone: dados.telefone,
        email: dados.email || null,
        empreendimento: EMPREENDIMENTO,
        // Cabe na qualificação: o corretor indicado e o interesse declarado.
        qualificacao: [
          `Interesse: ${dados.interesse}`,
          `Renda familiar: ${ROTULO_RENDA[dados.renda]}`,
          `Planta: ${dados.plantaInteresse}`,
          dados.corretor ? `Corretor indicado: ${dados.corretor}` : null,
        ]
          .filter(Boolean)
          .join(' | '),
        pagina: typeof window !== 'undefined' ? window.location.href.slice(0, 500) : '',
        empresa: dados.empresa || '', // honeypot, validado no servidor
        ...capturarUtms(),
      }),
    })

    if (!resp.ok) {
      const texto = await resp.text().catch(() => '')
      console.error('[verah] lead-lp recusou o lead:', resp.status, texto)
      return { ok: false, motivo: 'Não conseguimos registrar agora. Tente pelo WhatsApp.' }
    }
    return { ok: true }
  } catch (e) {
    console.error('[verah] falha ao enviar o lead:', e)
    return { ok: false, motivo: 'Não conseguimos registrar agora. Tente pelo WhatsApp.' }
  } finally {
    clearTimeout(timer)
  }
}

/** Fallback: a conversa vale mais que o registro. */
export function urlWhatsapp(numero: string, mensagem: string): string {
  return `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensagem)}`
}
