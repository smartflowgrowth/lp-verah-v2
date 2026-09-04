'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useScrollProgress } from '@/lib/scroll/useScrollProgress'
import { track } from '@/lib/track'
import type { IdBloco } from '@/content/verah'

export type OrigemCta = 'fixo' | 'plantas' | 'personalizacao'

type EstadoSessao = {
  progresso: number
  blocoAtivo: IdBloco
  marcarBlocoAtivo: (id: IdBloco) => void
  drawerAberto: boolean
  origemAbertura: OrigemCta
  plantaInteresse?: string
  abrirDrawer: (origem: OrigemCta, planta?: string) => void
  fecharDrawer: () => void
}

const Contexto = createContext<EstadoSessao | null>(null)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const progresso = useScrollProgress()
  const [blocoAtivo, setBlocoAtivo] = useState<IdBloco>('vista')
  const [drawerAberto, setDrawerAberto] = useState(false)
  const [origemAbertura, setOrigemAbertura] = useState<OrigemCta>('fixo')
  const [plantaInteresse, setPlantaInteresse] = useState<string | undefined>()

  const abrirDrawer = useCallback((origem: OrigemCta, planta?: string) => {
    setOrigemAbertura(origem)
    setPlantaInteresse(planta)
    setDrawerAberto(true)
    track('cta_click', { origem })
    track('form_abriu', { origem })
  }, [])

  const fecharDrawer = useCallback(() => setDrawerAberto(false), [])

  const valor = useMemo(
    () => ({
      progresso,
      blocoAtivo,
      marcarBlocoAtivo: setBlocoAtivo,
      drawerAberto,
      origemAbertura,
      plantaInteresse,
      abrirDrawer,
      fecharDrawer,
    }),
    [
      progresso,
      blocoAtivo,
      drawerAberto,
      origemAbertura,
      plantaInteresse,
      abrirDrawer,
      fecharDrawer,
    ],
  )

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>
}

export function useSessao(): EstadoSessao {
  const ctx = useContext(Contexto)
  if (!ctx) throw new Error('useSessao precisa estar dentro de SessionProvider')
  return ctx
}
