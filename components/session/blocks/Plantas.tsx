'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Block } from '../Block'
import { verah, type ImagemBook } from '@/content/verah'
import { useSessao } from '../SessionProvider'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'
import { asset, srcSetBook } from '@/lib/asset'

/** Fundo das plantas humanizadas do book: o card usa o mesmo tom e a
    imagem se funde nele, sem moldura. */
const FUNDO_PLANTA = 'bg-[#381a10]'

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
  const [ampliada, setAmpliada] = useState<ImagemBook | null>(null)

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

  // Esc fecha a planta ampliada.
  useEffect(() => {
    if (!ampliada) return
    const fechar = (e: KeyboardEvent) => e.key === 'Escape' && setAmpliada(null)
    window.addEventListener('keydown', fechar)
    return () => window.removeEventListener('keydown', fechar)
  }, [ampliada])

  return (
    <Block id="plantas" className="overflow-hidden">
      <div ref={raiz} className="relative md:flex md:min-h-[100svh] md:flex-col md:justify-center">
        <div className="px-6 pt-28 md:pt-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05]">
              {verah.plantas.titulo}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed opacity-75">
              {verah.plantas.apoio}
            </p>
            {/* Indicador da tipologia em foco. Vive no cabeçalho, não sob os
                cards: embaixo ele disputava atenção com os próprios cards. */}
            <p
              aria-live="polite"
              className="mt-6 hidden text-[11px] uppercase tracking-[0.24em] text-brick md:block"
            >
              Tipo {visivel.tipo} — {visivel.areaRotulo} · {visivel.dormitoriosRotulo} · finais{' '}
              {formatarFinais(visivel.finais)}
            </p>
          </div>
        </div>

        <div
          ref={trilho}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-12 md:mt-10 md:overflow-visible md:px-[8vw] md:pb-20"
        >
          {verah.tipologias.map((t) => (
            <article
              key={t.id}
              className={`flex w-[86vw] shrink-0 snap-center flex-col overflow-hidden rounded-2xl text-cream md:w-[72vw] md:max-w-[62rem] md:flex-row ${FUNDO_PLANTA}`}
            >
              <div className="relative flex aspect-[16/10] items-center justify-center md:aspect-auto md:w-[58%]">
                {t.planta ? (
                  <button
                    type="button"
                    onClick={() => setAmpliada(t.planta!)}
                    className="group h-full w-full cursor-zoom-in p-3 md:p-6"
                    aria-label={`Ampliar a planta do Tipo ${t.tipo}`}
                  >
                    <img
                      src={asset(t.planta.src)}
                      srcSet={srcSetBook(t.planta)}
                      sizes="(min-width: 768px) 36rem, 86vw"
                      alt={t.planta.alt}
                      width={t.planta.largura}
                      height={t.planta.altura}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <span className="absolute bottom-3 right-3 rounded-full bg-cream/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] backdrop-blur">
                      Ampliar
                    </span>
                  </button>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 border-b border-cream/10 md:border-b-0 md:border-r">
                    <span className="font-display text-7xl opacity-20">{t.tipo}</span>
                    <span className="text-[11px] uppercase tracking-[0.24em] opacity-60">
                      {verah.plantas.emBreve}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between p-7 md:p-9">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
                    Planta · Tipo {t.tipo}
                  </p>
                  <p className="mt-3 font-display text-[clamp(3rem,6vw,4.5rem)] leading-none">
                    {t.area}
                    <span className="ml-1 text-2xl text-gold">m²</span>
                  </p>
                  <ul className="mt-6 space-y-2 text-sm leading-snug opacity-85">
                    {t.comodos.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-gold">
                    Finais {formatarFinais(t.finais)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => abrirDrawer('plantas', t.rotulo)}
                  className="mt-8 self-start rounded-full border border-cream/30 px-6 py-3 text-sm transition-colors hover:border-gold hover:bg-gold/20"
                >
                  {verah.plantas.ctaContextual}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="px-6 pb-8 md:pt-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <caption className="sr-only">Tipologias do Verah por final de unidade</caption>
              <thead>
                <tr className="border-b border-cocoa/25 text-[11px] uppercase tracking-[0.2em] opacity-60">
                  <th className="py-3 pr-4 font-medium">Tipo</th>
                  <th className="py-3 pr-4 font-medium">Dormitórios</th>
                  <th className="py-3 pr-4 font-medium">Área</th>
                  <th className="py-3 pr-4 font-medium">Vagas</th>
                  <th className="py-3 font-medium">Finais</th>
                </tr>
              </thead>
              <tbody>
                {[...verah.tipologias]
                  .sort((a, b) => a.tipo.localeCompare(b.tipo))
                  .map((t) => (
                    <tr key={t.id} className="border-b border-cocoa/10">
                      <td className="py-4 pr-4 font-display text-xl">{t.tipo}</td>
                      <td className="py-4 pr-4">{t.dormitoriosRotulo}</td>
                      <td className="py-4 pr-4">{t.areaRotulo}</td>
                      <td className="py-4 pr-4">{t.vagas.replace(/ vagas?/, '')}</td>
                      <td className="py-4">{formatarFinais(t.finais)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[11px] italic leading-relaxed opacity-50">
            {verah.plantas.avisoMetragem} {verah.plantas.avisoPlanta}
          </p>
        </div>
      </div>

      {ampliada && (
        // Planta em tela cheia. No celular a imagem fica mais larga que a
        // tela e rola nos dois eixos: é o "zoom" sem biblioteca.
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ampliada.legenda}
          className={`fixed inset-0 z-[90] flex flex-col ${FUNDO_PLANTA} text-cream`}
        >
          <div className="flex items-center justify-between px-5 py-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-gold">{ampliada.legenda}</p>
            <button
              type="button"
              onClick={() => setAmpliada(null)}
              autoFocus
              className="rounded-full border border-cream/30 px-4 py-2 text-sm"
            >
              Fechar
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            <img
              src={asset(ampliada.src)}
              alt={ampliada.alt}
              width={ampliada.largura}
              height={ampliada.altura}
              className="m-auto block w-[200vw] max-w-none md:h-full md:w-auto md:max-w-full md:object-contain"
            />
          </div>
          <p className="px-5 py-3 text-[11px] italic opacity-60">{verah.plantas.avisoPlanta}</p>
        </div>
      )}
    </Block>
  )
}

function formatarFinais(finais: number[]): string {
  if (finais.length === 1) return String(finais[0])
  return `${finais.slice(0, -1).join(', ')} e ${finais.at(-1)}`
}
