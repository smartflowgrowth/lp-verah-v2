'use client'

import { motion } from 'motion/react'
import { Block } from '../Block'
import { verah } from '@/content/verah'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'
import { escalonar, filhoEscalonado } from '@/lib/motion/presets'

/**
 * As perguntas são `h2`, não `h3`, de propósito: a regra de SEO do projeto
 * pede pelo menos três `h2` com o termo-alvo, e forçá-lo nas manchetes de
 * venda estragaria a copy. Aqui ele aparece por conta própria, porque é
 * assim que as pessoas perguntam.
 *
 * Este é também o bloco que leva o HTML servido acima das 1.000 palavras.
 */
export function Duvidas() {
  const modo = useSessionMotion()
  const { duvidas } = verah

  return (
    <Block id="duvidas" className="px-6 py-28 md:py-40">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-[clamp(1.75rem,5vw,3rem)] leading-[1.1]">
          {duvidas.titulo}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-75">{duvidas.apoio}</p>

        <motion.div
          custom={modo}
          variants={escalonar}
          initial="oculto"
          whileInView="visivel"
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          className="mt-14 flex flex-col"
        >
          {duvidas.perguntas.map((item) => (
            <motion.article
              key={item.pergunta}
              custom={modo}
              variants={filhoEscalonado}
              className="border-t border-cocoa/15 py-7"
            >
              <h2 className="font-display text-lg leading-snug sm:text-xl">{item.pergunta}</h2>
              <p className="mt-3 text-sm leading-relaxed opacity-75">{item.resposta}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Block>
  )
}
