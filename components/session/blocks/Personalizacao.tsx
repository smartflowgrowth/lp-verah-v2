'use client'

import { motion } from 'motion/react'
import { Block } from '../Block'
import { verah } from '@/content/verah'
import { useSessao } from '../SessionProvider'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'
import { escalonar, filhoEscalonado } from '@/lib/motion/presets'

export function Personalizacao() {
  const modo = useSessionMotion()
  const { abrirDrawer } = useSessao()
  const { personalizacao } = verah

  return (
    <Block id="personalizacao" className="px-6 py-28 md:py-40">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[1.05]">
          {personalizacao.titulo}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-75">
          {personalizacao.apoio}
        </p>

        <motion.div
          custom={modo}
          variants={escalonar}
          initial="oculto"
          whileInView="visivel"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 grid gap-10 sm:grid-cols-3"
        >
          {personalizacao.pilares.map((pilar) => (
            <motion.div key={pilar.titulo} custom={modo} variants={filhoEscalonado}>
              <div className="mb-5 h-px w-10 bg-brick" />
              <h3 className="font-display text-xl leading-snug">{pilar.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-70">{pilar.texto}</p>
            </motion.div>
          ))}
        </motion.div>

        <button
          type="button"
          onClick={() => abrirDrawer('personalizacao')}
          className="mt-16 rounded-full bg-gold px-7 py-4 text-sm font-medium text-cocoa transition-opacity hover:opacity-90"
        >
          {personalizacao.ctaContextual}
        </button>
      </div>
    </Block>
  )
}
