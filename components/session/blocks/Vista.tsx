'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Block } from '../Block'
import { verah } from '@/content/verah'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'
import { CtaPrincipal } from '../CtaPrincipal'
import { asset, srcSetBook } from '@/lib/asset'

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
        .to('[data-fachada]', { yPercent: 6, scale: 1.04, ease: 'none' }, 0)
    }, elemento)

    return () => ctx.revert()
  }, [modo.anima])

  return (
    <Block id="vista" className="grao min-h-[100svh] overflow-hidden bg-cocoa text-cream">
      <div
        ref={raiz}
        className="relative flex min-h-[100svh] flex-col items-center justify-center px-6"
      >
        {/* A fachada é o LCP: carrega cedo e sem lazy. É decorativa aqui — a
            mesma imagem aparece com descrição no bloco da torre. */}
        <div data-fachada className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <img
            src={asset(verah.torre.fachada.src)}
            srcSet={srcSetBook(verah.torre.fachada)}
            sizes="100vw"
            alt=""
            width={verah.torre.fachada.largura}
            height={verah.torre.fachada.altura}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[50%_38%]"
          />
          {/* Véu cocoa: segura o contraste do nome e do CTA sobre o céu
              claro do render, mais denso embaixo, onde fica o texto. */}
          <div className="absolute inset-0 bg-gradient-to-b from-cocoa/60 via-cocoa/55 to-cocoa/90" />
        </div>

        <div data-marca className="relative z-10 text-center">
          <p className="mb-6 text-[11px] uppercase tracking-[0.42em] opacity-60">
            {verah.marca.selo}
          </p>
          {/* O nome do empreendimento vem primeiro e a manchete depois,
              dentro do mesmo h1 — é a regra do projeto, e é o que põe o
              termo-alvo no h1 sem apagar a marca. */}
          <h1 className="font-display text-[clamp(3.5rem,16vw,11rem)] leading-[0.85] tracking-[0.06em]">
            {verah.marca.nome}
            <span className="mt-5 block text-[11px] font-body uppercase tracking-[0.34em] opacity-70">
              {verah.marca.tagline}
            </span>
            <span className="mt-3 block font-body text-[13px] font-light tracking-wide opacity-70 sm:text-sm">
              {verah.seo.tituloH1}
            </span>
          </h1>
        </div>

        <p className="relative z-10 mt-8 max-w-xl text-center font-display text-xl leading-relaxed opacity-80 sm:text-2xl md:mt-12">
          {verah.vista.titulo}
        </p>

        {/* No herói o CTA vive no fluxo, centralizado sob a frase. A partir
            da segunda sessão quem assume é o StickyCta, no canto.
            Ele sai de cena junto com o herói: deixá-lo apenas rolar fazia um
            botão cortado pela metade atravessar o topo da tela no caminho. */}
        <motion.div
          className="relative z-10 mt-6 md:mt-10"
          style={modo.anima ? { opacity: opacidadeCta } : undefined}
        >
          <CtaPrincipal claro />
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
              stroke="var(--color-gold)"
              strokeWidth="1.5"
              strokeOpacity="0.6"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="absolute bottom-24 z-10 text-[10px] uppercase tracking-[0.28em] opacity-60 md:bottom-10">
          {verah.vista.convite}
        </p>
      </div>
    </Block>
  )
}
