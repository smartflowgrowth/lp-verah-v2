/**
 * Reduz o telefone aos 10 ou 11 dígitos que a Edge Function lead-lp aceita.
 * O código do país só é removido quando sobra um número válido sem ele —
 * 55 também é DDD do Rio Grande do Sul.
 */
export function normalizarTelefone(bruto: string): string {
  const digitos = bruto.replace(/\D/g, '')
  if (digitos.length > 11 && digitos.startsWith('55')) {
    return digitos.slice(2)
  }
  return digitos
}

/** Máscara progressiva para exibição durante a digitação. */
export function formatarTelefone(bruto: string): string {
  const d = normalizarTelefone(bruto).slice(0, 11)
  if (d.length === 0) return ''
  if (d.length <= 2) return `(${d}`
  const corte = d.length > 10 ? 7 : 6
  if (d.length <= corte) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, corte)}-${d.slice(corte)}`
}
