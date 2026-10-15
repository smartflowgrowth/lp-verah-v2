'use client'

import { motion } from 'motion/react'
import { Block } from '../Block'
import { verah } from '@/content/verah'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'
import { escalonar, filhoEscalonado } from '@/lib/motion/presets'
import { asset, srcSetBook } from '@/lib/asset'

export function Torre() {
  const modo = useSessionMotion()
  const { torre } = verah

  return (
    <Block id="torre" className="px-6 py-28 md:py-40">
      <div className="mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-[0.9fr_1fr] md:gap-20">
        <figure className="order-2 md:order-1">
          {/* `sizes` pela largura real da coluna: ~45% de 64rem no desktop. */}
          <img
            src={asset(torre.fachada.src)}
            srcSet={srcSetBook(torre.fachada)}
            sizes="(min-width: 768px) 28rem, 100vw"
            alt={torre.fachada.alt}
            width={torre.fachada.largura}
            height={torre.fachada.altura}
            loading="lazy"
            decoding="async"
            className="w-full rounded-2xl"
          />
          <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] opacity-50">
            {torre.fachada.legenda}
          </figcaption>
        </figure>

        <div className="order-1 md:order-2">
          <h2 className="font-display text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.05]">
            {torre.titulo}
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed opacity-75">{torre.apoio}</p>

          <motion.dl
            custom={modo}
            variants={escalonar}
            initial="oculto"
            whileInView="visivel"
            viewport={{ once: true, amount: 0.4 }}
            className="mt-14 grid grid-cols-2 gap-x-10 gap-y-10"
          >
            {torre.fatos.map((fato) => (
              <motion.div key={fato.rotulo} custom={modo} variants={filhoEscalonado}>
                <div className="mb-4 h-px w-8 bg-brick" />
                <dt className="font-display text-5xl leading-none">{fato.valor}</dt>
                <dd className="mt-3 text-[11px] uppercase tracking-[0.2em] opacity-60">
                  {fato.rotulo}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </Block>
  )
}
