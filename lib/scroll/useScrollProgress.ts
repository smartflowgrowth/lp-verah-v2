'use client'

import { useEffect, useState } from 'react'
import { calcularProgresso } from '@/lib/progresso'

/**
 * Um único ponto de leitura de scroll na aplicação inteira. O trilho, o CTA
 * fixo e o bloco ativo consomem daqui — não abrem observers próprios.
 */
export function useScrollProgress(): number {
  const [progresso, setProgresso] = useState(0)

  useEffect(() => {
    let quadro = 0

    const medir = () => {
      quadro = 0
      setProgresso(
        calcularProgresso(
          window.scrollY,
          document.documentElement.scrollHeight,
          window.innerHeight,
        ),
      )
    }

    const agendar = () => {
      if (quadro === 0) quadro = requestAnimationFrame(medir)
    }

    medir()
    window.addEventListener('scroll', agendar, { passive: true })
    window.addEventListener('resize', agendar)

    return () => {
      if (quadro !== 0) cancelAnimationFrame(quadro)
      window.removeEventListener('scroll', agendar)
      window.removeEventListener('resize', agendar)
    }
  }, [])

  return progresso
}
