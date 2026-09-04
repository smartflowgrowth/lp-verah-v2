'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Block } from '../Block'
import { verah } from '@/content/verah'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'
import { escalonar, filhoEscalonado } from '@/lib/motion/presets'

export function Quintal() {
  const modo = useSessionMotion()
  const { lazer } = verah

  return (
    <Block id="quintal" className="px-6 py-28 md:py-40">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[1.05]">{lazer.titulo}</h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-75">{lazer.apoio}</p>

        <motion.ul
          custom={modo}
          variants={escalonar}
          initial="oculto"
          whileInView="visivel"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 flex flex-wrap gap-2"
        >
          {lazer.itens.map((item) => (
            <motion.li
              key={item}
              custom={modo}
              variants={filhoEscalonado}
              className="rounded-full border border-cocoa/20 px-4 py-2 text-xs tracking-wide"
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-16 flex flex-col gap-12">
          {lazer.imagens.map((img) => (
            <figure key={img.src}>
              <Image
                src={img.src}
                alt={img.alt}
                width={img.largura}
                height={img.altura}
                loading="lazy"
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="w-full rounded-xl"
              />
              <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] opacity-50">
                {img.legenda}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Block>
  )
}
