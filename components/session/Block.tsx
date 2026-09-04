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

  // Dois trechos independentes, medidos contra a ALTURA DA TELA e não contra
  // a altura do bloco: acende enquanto o topo sobe da base até 60% da tela,
  // e apaga enquanto o fim sobe de 40% até o topo.
  //
  // Uma fração da travessia não serve. O bloco do lazer tem 3809 px, então
  // "30% da travessia" davam 1413 px — mais de uma tela inteira — e o
  // conteúdo do topo ficava permanentemente translúcido enquanto era lido.
  // Com distâncias fixas, o miolo de qualquer bloco fica sempre opaco.
  const { scrollYProgress: entrando } = useScroll({
    target: ref,
    offset: ['start end', 'start 55%'],
  })
  const { scrollYProgress: saindo } = useScroll({
    target: ref,
    offset: ['end 45%', 'end start'],
  })
  const opacidade = useTransform([entrando, saindo], ([e, s]: number[]) =>
    Math.max(0, Math.min(e, 1 - s)),
  )

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
      // A margem vertical é a folga que permite uma sessão apagar antes de a
      // seguinte acender. Com blocos encostados os dois requisitos brigam:
      // o bloco precisa estar opaco enquanto está na tela para ser legível,
      // e precisa ter apagado quando o próximo chega. O espaço resolve.
      // (Margens verticais de irmãos colapsam, então o intervalo é 30vh.)
      //
      // `first`/`last` zeram as pontas: a margem no primeiro bloco abria a
      // página com uma faixa vazia antes do logo e empurrava o CTA do herói
      // para fora da tela. O intervalo é ENTRE sessões, não nas bordas.
      className={`relative my-[30vh] first:mt-0 last:mb-0 ${className}`}
      // Com movimento reduzido nada desvanece: o conteúdo fica sempre opaco.
      style={modo.anima ? { opacity: opacidade } : undefined}
    >
      {children}
    </motion.section>
  )
}
