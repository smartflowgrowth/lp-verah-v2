'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'
import { useSessao } from './SessionProvider'
import { track } from '@/lib/track'
import { BLOCOS, type IdBloco } from '@/content/verah'

type Props = {
  id: IdBloco
  children: React.ReactNode
  className?: string
}

/**
 * Registra o bloco na sessão, controla sua presença e emite o evento uma vez.
 * Nenhum bloco abre observer por conta própria.
 *
 * A sessão não deve ser lida como papel contínuo rolando: cada bloco acende ao
 * chegar e apaga ao sair, deixando um intervalo limpo entre uma sessão e a
 * seguinte. Por isso a opacidade é acoplada ao scroll — e não um reveal único
 * de entrada, que deixaria o bloco anterior visível ao lado do próximo.
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

  // 0 quando o topo do bloco encosta na base da tela, 1 quando o fim dele
  // sai por cima. Acende nos primeiros 30% da travessia e apaga nos últimos
  // 30%: com margens menores, duas sessões ficavam cheias ao mesmo tempo.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const opacidade = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

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
      // A margem vertical é o "intervalo limpo" entre uma sessão e a
      // seguinte: sem ela, a próxima já entrou antes de a anterior apagar.
      className={`relative my-[14vh] ${className}`}
      // Com movimento reduzido nada desvanece: o conteúdo fica sempre opaco.
      style={modo.anima ? { opacity: opacidade } : undefined}
    >
      {children}
    </motion.section>
  )
}
