'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { Block } from '../Block'
import { verah } from '@/content/verah'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'

function Contador({
  alvo,
  prefixo,
  sufixo,
  formatar,
  anima,
}: {
  alvo: number
  prefixo: string
  sufixo: string
  formatar: boolean
  anima: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const visivel = useInView(ref, { once: true, amount: 0.6 })
  const [valor, setValor] = useState(anima ? 0 : alvo)

  useEffect(() => {
    if (!visivel || !anima) return
    const inicio = performance.now()
    const duracao = 1800
    let quadro = requestAnimationFrame(function passo(agora) {
      const t = Math.min(1, (agora - inicio) / duracao)
      const suave = 1 - Math.pow(1 - t, 3)
      setValor(Math.round(alvo * suave))
      if (t < 1) quadro = requestAnimationFrame(passo)
    })
    return () => cancelAnimationFrame(quadro)
  }, [visivel, anima, alvo])

  const texto = formatar ? valor.toLocaleString('pt-BR') : String(valor)

  return (
    <span ref={ref}>
      {prefixo}
      {texto}
      {sufixo}
    </span>
  )
}

export function Construtora() {
  const modo = useSessionMotion()
  const { construtora } = verah

  return (
    <Block id="construtora" className="bg-cocoa px-6 py-28 text-cream md:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-[11px] uppercase tracking-[0.32em] opacity-60">{construtora.nome}</p>
        <h2 className="mt-6 font-display text-[clamp(2rem,6vw,4rem)] leading-[1.05]">
          {construtora.titulo}
        </h2>

        <dl className="mt-20 grid grid-cols-2 gap-12 md:grid-cols-4">
          {construtora.numeros.map((n) => (
            <div key={n.rotulo}>
              <dt className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-none">
                <Contador
                  alvo={n.valor}
                  prefixo={n.prefixo}
                  sufixo={n.sufixo}
                  formatar={n.formatar}
                  anima={modo.anima}
                />
              </dt>
              <dd className="mt-3 text-[10px] uppercase tracking-[0.18em] opacity-60">
                {n.rotulo}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Block>
  )
}
