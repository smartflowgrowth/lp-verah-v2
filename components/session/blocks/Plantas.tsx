'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Block } from '../Block'
import { verah } from '@/content/verah'
import { useSessao } from '../SessionProvider'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'

/**
 * Desktop: seção pinada, as quatro tipologias passam com scrub horizontal.
 * Mobile: rolagem horizontal por swipe, sem pin — pin em toque briga com o
 * gesto nativo e trava a página.
 */
export function Plantas() {
  const raiz = useRef<HTMLDivElement>(null)
  const trilho = useRef<HTMLDivElement>(null)
  const modo = useSessionMotion()
  const { abrirDrawer } = useSessao()
  const [visivel, setVisivel] = useState(verah.tipologias[0])

  useEffect(() => {
    if (!modo.anima || !raiz.current || !trilho.current) return
    if (!window.matchMedia('(min-width: 768px)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const elemento = raiz.current
    const faixa = trilho.current
    const ctx = gsap.context(() => {
      const percorrer = faixa.scrollWidth - window.innerWidth
      if (percorrer <= 0) return

      gsap.to(faixa, {
        x: -percorrer,
        ease: 'none',
        scrollTrigger: {
          trigger: elemento,
          start: 'top top',
          end: () => `+=${percorrer}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(
              verah.tipologias.length - 1,
              Math.floor(self.progress * verah.tipologias.length),
            )
            setVisivel(verah.tipologias[i])
          },
        },
      })
    }, elemento)

    return () => ctx.revert()
  }, [modo.anima])

  return (
    <Block id="plantas" className="overflow-hidden">
      <div ref={raiz} className="relative">
        <div className="px-6 pt-28 md:pt-32">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[1.05]">
              {verah.plantas.titulo}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-75">
              {verah.plantas.apoio}
            </p>
          </div>
        </div>

        <div
          ref={trilho}
          className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-16 md:mt-20 md:overflow-visible md:px-[12vw] md:pb-0"
        >
          {verah.tipologias.map((t) => (
            <article
              key={t.id}
              className="flex w-[78vw] shrink-0 snap-center flex-col justify-between rounded-2xl border border-cocoa/15 p-8 md:w-[34vw] md:p-10"
            >
              <div>
                <p className="font-display text-[clamp(3rem,7vw,5rem)] leading-none">
                  {t.areaRotulo}
                </p>
                <p className="mt-4 text-sm uppercase tracking-[0.16em] opacity-60">
                  {t.dormitorios} dormitórios · {t.vagas}
                </p>
                <p className="mt-8 text-base leading-relaxed opacity-80">{t.destaque}</p>
              </div>
              <button
                type="button"
                onClick={() => abrirDrawer('plantas', t.areaRotulo)}
                className="mt-10 self-start rounded-full border border-cocoa/30 px-6 py-3 text-sm transition-colors hover:border-gold hover:bg-gold/15"
              >
                {verah.plantas.ctaContextual}
              </button>
            </article>
          ))}
        </div>

        {/* Indicador da tipologia em foco, só no desktop pinado. */}
        <p className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 text-[11px] uppercase tracking-[0.24em] opacity-45 md:block">
          {visivel.areaRotulo} — {visivel.dormitorios} dormitórios
        </p>
      </div>
    </Block>
  )
}
