import type { Variants } from 'motion/react'

/** Entrada padrão de bloco. `custom` recebe o ModoMovimento do hook. */
export const revelarBloco: Variants = {
  oculto: (m: { deslocamento: number }) => ({ opacity: 0, y: m.deslocamento }),
  visivel: (m: { duracao: number }) => ({
    opacity: 1,
    y: 0,
    transition: { duration: m.duracao, ease: [0.22, 1, 0.36, 1] },
  }),
}

/** Container que escalona os filhos. */
export const escalonar: Variants = {
  oculto: {},
  visivel: (m: { anima: boolean }) => ({
    transition: { staggerChildren: m.anima ? 0.09 : 0 },
  }),
}

/** Filho de um container escalonado. */
export const filhoEscalonado: Variants = {
  oculto: (m: { deslocamento: number }) => ({ opacity: 0, y: m.deslocamento * 0.6 }),
  visivel: (m: { duracao: number }) => ({
    opacity: 1,
    y: 0,
    transition: { duration: m.duracao, ease: [0.22, 1, 0.36, 1] },
  }),
}
