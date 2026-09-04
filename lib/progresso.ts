/**
 * Fração da sessão já percorrida, entre 0 e 1.
 * Pura de propósito: o bounce do iOS produz scrollY negativo e maior que o
 * total, e o trilho não pode passar dos limites por causa disso.
 */
export function calcularProgresso(
  scrollY: number,
  alturaDocumento: number,
  alturaJanela: number,
): number {
  const rolavel = alturaDocumento - alturaJanela
  if (rolavel <= 0) return 0
  return Math.min(1, Math.max(0, scrollY / rolavel))
}
