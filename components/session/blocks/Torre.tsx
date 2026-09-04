'use client'

import { motion } from 'motion/react'
import { Block } from '../Block'
import { verah } from '@/content/verah'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'
import { escalonar, filhoEscalonado } from '@/lib/motion/presets'

export function Torre() {
  const modo = useSessionMotion()
  const { torre } = verah

  return (
    <Block id="torre" className="px-6 py-32 md:py-48">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-[clamp(2rem,6.5vw,4.5rem)] leading-[1.05]">
          {torre.titulo}
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed opacity-75">{torre.apoio}</p>

        <motion.dl
          custom={modo}
          variants={escalonar}
          initial="oculto"
          whileInView="visivel"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-20 flex flex-wrap items-end justify-center gap-x-16 gap-y-10"
        >
          {torre.fatos.map((fato) => (
            <motion.div key={fato.rotulo} custom={modo} variants={filhoEscalonado}>
              <dt className="font-display text-6xl leading-none">{fato.valor}</dt>
              <dd className="mt-3 text-[11px] uppercase tracking-[0.2em] opacity-60">
                {fato.rotulo}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </Block>
  )
}
