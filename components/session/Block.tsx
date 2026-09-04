'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'
import { useSessao } from './SessionProvider'
import { revelarBloco } from '@/lib/motion/presets'
import { track } from '@/lib/track'
import { BLOCOS, type IdBloco } from '@/content/verah'

type Props = {
  id: IdBloco
  children: React.ReactNode
  className?: string
}

/**
 * Registra o bloco na sessão, revela na entrada e emite o evento uma única
 * vez. Nenhum bloco abre observer por conta própria.
 */
export function Block({ id, children, className = '' }: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const modo = useSessionMotion()
  const { marcarBlocoAtivo } = useSessao()
  const visivel = useInView(ref, { amount: 0.35 })
  const jaContado = useRef(false)

  useEffect(() => {
    if (!visivel) return
    marcarBlocoAtivo(id)
    if (jaContado.current) return
    jaContado.current = true
    const indice = BLOCOS.findIndex((b) => b.id === id)
    track('sessao_bloco_visto', { bloco: id, indice: indice + 1 })
  }, [visivel, id, marcarBlocoAtivo])

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative ${className}`}
      custom={modo}
      variants={revelarBloco}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.section>
  )
}
