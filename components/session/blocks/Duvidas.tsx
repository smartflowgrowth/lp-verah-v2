'use client'

import { motion } from 'motion/react'
import { Block } from '../Block'
import { verah } from '@/content/verah'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'
import { escalonar, filhoEscalonado } from '@/lib/motion/presets'

/**
 * `details`/`summary` nativos, e não um acordeão em JavaScript: a resposta
 * continua no HTML servido mesmo fechada. Disso dependem duas coisas — as
 * 1.263 palavras que a build do lps-icasa exige, e a validade do JSON-LD
 * FAQPage, que só vale com as respostas presentes na página. De quebra,
 * abre e fecha sem JavaScript nenhum e já vem acessível por teclado.
 *
 * As perguntas são `h2` de propósito: a regra de SEO do projeto pede ao
 * menos três `h2` com o termo-alvo, e forçá-lo nas manchetes de venda
 * estragaria a copy. Aqui ele aparece por conta própria, porque é assim
 * que as pessoas perguntam.
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
            <motion.div key={item.pergunta} custom={modo} variants={filhoEscalonado}>
              <details className="group border-t border-cocoa/15 last:border-b">
                <summary
                  className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 transition-colors hover:text-brick focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold [&::-webkit-details-marker]:hidden"
                >
                  <h2 className="font-display text-lg leading-snug sm:text-xl">{item.pergunta}</h2>
                  {/* Cruz que vira menos: dois traços, um deles gira. */}
                  <span
                    aria-hidden="true"
                    className="relative mt-2 block size-3 shrink-0 text-brick"
                  >
                    <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-current" />
                    <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 rotate-90 bg-current transition-transform duration-300 group-open:rotate-0 motion-reduce:transition-none" />
                  </span>
                </summary>
                <p className="pb-6 pr-9 text-sm leading-relaxed opacity-75">{item.resposta}</p>
              </details>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Block>
  )
}
