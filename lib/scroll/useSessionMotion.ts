'use client'

import { useReducedMotion } from 'motion/react'

export type ModoMovimento = {
  /** Falso quando o usuário pediu menos movimento. Desliga pin e scrub do GSAP. */
  anima: boolean
  duracao: number
  deslocamento: number
}

/**
 * Fonte única da decisão de animar. Media query no CSS não basta: o GSAP
 * escreve transform inline e venceria a regra.
 */
export function useSessionMotion(): ModoMovimento {
  const reduzir = useReducedMotion()
  return reduzir
    ? { anima: false, duracao: 0.15, deslocamento: 0 }
    : { anima: true, duracao: 0.7, deslocamento: 28 }
}
