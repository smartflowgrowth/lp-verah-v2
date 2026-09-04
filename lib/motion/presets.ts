import type { Variants } from 'motion/react'

// A entrada dos blocos não vive aqui: a opacidade de cada sessão é acoplada
// ao scroll dentro de `Block`, para que uma sessão apague antes da próxima
// acender. O que sobra aqui é o escalonamento do conteúdo interno.

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
