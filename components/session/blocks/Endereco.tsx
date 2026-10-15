'use client'

import { motion } from 'motion/react'
import { Block } from '../Block'
import { verah } from '@/content/verah'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'
import { escalonar, filhoEscalonado } from '@/lib/motion/presets'

export function Endereco() {
  const modo = useSessionMotion()
  const { endereco } = verah

  return (
    <Block id="endereco" className="px-6 py-28 md:py-40">
      <div className="mx-auto max-w-4xl">
        <p className="text-[11px] uppercase tracking-[0.28em] opacity-50">
          {endereco.logradouro} — {endereco.bairro} — {endereco.cidade}/{endereco.uf}
        </p>
        <h2 className="mt-6 font-display text-[clamp(2rem,6vw,4rem)] leading-[1.05]">
          {endereco.titulo}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-75">{endereco.apoio}</p>

        <motion.ul
          custom={modo}
          variants={escalonar}
          initial="oculto"
          whileInView="visivel"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-cocoa/10 sm:grid-cols-3"
        >
          {endereco.pontos.map((ponto) => (
            <motion.li
              key={ponto.nome}
              custom={modo}
              variants={filhoEscalonado}
              className="bg-cream p-7"
            >
              <p className="font-display text-5xl leading-none text-brick">
                {ponto.minutos}
                <span className="ml-1 text-lg opacity-60">min</span>
              </p>
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.12em]">{ponto.nome}</p>
              <p className="mt-1 text-xs leading-relaxed opacity-60">{ponto.nota}</p>
            </motion.li>
          ))}
        </motion.ul>

        <p className="mt-8 text-sm opacity-60">{endereco.infraestrutura}</p>
        <p className="mt-2 text-[11px] italic opacity-45">{endereco.aviso}</p>
      </div>
    </Block>
  )
}
