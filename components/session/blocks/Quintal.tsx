'use client'

import { motion } from 'motion/react'
import { Block } from '../Block'
import { verah } from '@/content/verah'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'
import { escalonar, filhoEscalonado } from '@/lib/motion/presets'
import { asset, srcSetBook } from '@/lib/asset'

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
          className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {lazer.itens.map((item) => (
            <motion.li
              key={item.nome}
              custom={modo}
              variants={filhoEscalonado}
              className="flex gap-3"
            >
              <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brick" aria-hidden="true" />
              <span>
                <span className="block text-[15px]">{item.nome}</span>
                {item.nota && <span className="block text-xs opacity-55">{item.nota}</span>}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-16 flex flex-col gap-12">
          {lazer.imagens.map((img) => (
            <figure key={img.src}>
              {/*
                (obrigatorio no export estatico) o componente do Next nao
                emite srcset, e a regra do projeto exige srcset em toda
                imagem de conteudo. O `sizes` descreve a largura REAL de
                renderizacao - 64rem e o max-w-5xl do container, nao 100vw.
                O prefixo vem de `asset`: o basePath do Next nao alcanca
                atributos de uma tag nativa.
              */}
              <img
                src={asset(img.src)}
                srcSet={srcSetBook(img)}
                sizes="(min-width: 1024px) 64rem, 100vw"
                alt={img.alt}
                width={img.largura}
                height={img.altura}
                loading="lazy"
                decoding="async"
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
