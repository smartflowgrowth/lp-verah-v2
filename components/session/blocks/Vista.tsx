'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Block } from '../Block'
import { verah } from '@/content/verah'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'
import { CtaPrincipal } from '../CtaPrincipal'

export function Vista() {
  const raiz = useRef<HTMLDivElement>(null)
  const modo = useSessionMotion()

  // O CTA do herói apaga nos primeiros 200 px de scroll, bem antes de o
  // conteúdo alcançar a borda de cima — sem isso ele sobe junto e atravessa
  // o topo da tela cortado pela metade, no caminho até o CTA do canto
  // assumir.
  //
  // Medido em pixels do documento, e não com `useScroll({ target })`: com
  // alvo, a MotionValue ficava presa em 1 e o botão nunca apagava.
  const { scrollY } = useScroll()
  const opacidadeCta = useTransform(scrollY, [0, 200], [1, 0])

  useEffect(() => {
    if (!modo.anima || !raiz.current) return

    // Registrado aqui, e não no escopo do módulo: o ScrollTrigger toca em
    // window, e este arquivo também é avaliado no pré-render do servidor.
    gsap.registerPlugin(ScrollTrigger)

    const elemento = raiz.current
    const ctx = gsap.context(() => {
      // Silhueta da serra: traço que se desenha na entrada.
      const traco = elemento.querySelector<SVGPathElement>('#serra')
      if (traco) {
        const comprimento = traco.getTotalLength()
        gsap.set(traco, { strokeDasharray: comprimento, strokeDashoffset: comprimento })
        gsap.to(traco, { strokeDashoffset: 0, duration: 2.4, ease: 'power2.out', delay: 0.4 })
      }

      // Scrub do herói: a marca sobe e desvanece enquanto a serra desce.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: elemento,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
        .to('[data-marca]', { y: -80, opacity: 0.15, ease: 'none' }, 0)
        .to('[data-serra]', { y: 40, ease: 'none' }, 0)
    }, elemento)

    return () => ctx.revert()
  }, [modo.anima])

  return (
    <Block id="vista" className="grao min-h-[100svh] overflow-hidden">
      <div
        ref={raiz}
        className="relative flex min-h-[100svh] flex-col items-center justify-center px-6"
      >
        <div data-marca className="relative z-10 text-center">
          <p className="mb-6 text-[11px] uppercase tracking-[0.42em] opacity-60">
            {verah.marca.selo}
          </p>
          <h1 className="font-display text-[clamp(3.5rem,16vw,11rem)] leading-[0.85] tracking-[0.06em]">
            {verah.marca.nome}
          </h1>
          <p className="mt-5 text-[11px] uppercase tracking-[0.34em] opacity-70">
            {verah.marca.tagline}
          </p>
        </div>

        <p className="relative z-10 mt-12 max-w-xl text-center font-display text-xl leading-relaxed opacity-80 sm:text-2xl">
          {verah.vista.titulo}
        </p>

        {/* No herói o CTA vive no fluxo, centralizado sob a frase. A partir
            da segunda sessão quem assume é o StickyCta, no canto.
            Ele sai de cena junto com o herói: deixá-lo apenas rolar fazia um
            botão cortado pela metade atravessar o topo da tela no caminho. */}
        <motion.div
          className="relative z-10 mt-10"
          style={modo.anima ? { opacity: opacidadeCta } : undefined}
        >
          <CtaPrincipal />
        </motion.div>

        <div
          data-serra
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
          aria-hidden="true"
        >
          <svg viewBox="0 0 1200 220" className="w-full" fill="none">
            <path
              id="serra"
              d="M0 200 L140 150 L240 178 L360 96 L470 152 L560 118 L690 186 L810 128 L930 170 L1060 112 L1200 168"
              stroke="var(--color-brick)"
              strokeWidth="1.5"
              strokeOpacity="0.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="absolute bottom-24 z-10 text-[10px] uppercase tracking-[0.28em] opacity-40 md:bottom-10">
          {verah.vista.convite}
        </p>
      </div>
    </Block>
  )
}
