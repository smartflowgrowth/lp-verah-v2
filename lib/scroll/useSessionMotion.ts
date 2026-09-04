'use client'

import { useReducedMotion } from 'motion/react'

export type ModoMovimento = {
  /** Falso quando o usuário pediu menos movimento. Desliga pin e scrub do GSAP. */
  anima: boolean
  duracao: number
  deslocamento: number
}

/**
 * A política de movimento da sessão, separada de como se descobre a
 * preferência. Pura de propósito: é a única chave que desliga pin e scrub do
 * GSAP, e uma regressão aqui quebra a acessibilidade sem quebrar nada visível.
 */
export function decidirMovimento(reduzir: boolean): ModoMovimento {
  return reduzir
    ? { anima: false, duracao: 0.15, deslocamento: 0 }
    : { anima: true, duracao: 0.7, deslocamento: 28 }
}

/**
 * Fonte única da decisão de animar. Media query no CSS não basta: o GSAP
 * escreve transform inline e venceria a regra.
 */
export function useSessionMotion(): ModoMovimento {
  return decidirMovimento(useReducedMotion() ?? false)
}
