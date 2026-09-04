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
  // Faixa fina no meio da tela: o bloco é "o ativo" quando cruza o centro.
  //
  // Threshold por fração (`amount`) não serve aqui. Um bloco mais alto que
  // ~3x a viewport nunca consegue ter 35% de si mesmo visível, e o quintal
  // (3809 px numa tela de 900 px, máximo de 24%) cai exatamente nesse caso —
  // ficaria eternamente fora do trilho e sem emitir evento.
  const visivel = useInView(ref, { margin: '-50% 0px -50% 0px' })
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
      // Revela quando o topo do bloco sobe 15% acima da borda inferior —
      // independe da altura do bloco, ao contrário de `amount`.
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
    >
      {children}
    </motion.section>
  )
}
