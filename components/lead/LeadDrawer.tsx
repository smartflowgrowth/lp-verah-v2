'use client'

import { useEffect, useState } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { LeadForm } from './LeadForm'
import { useSessao } from '@/components/session/SessionProvider'
import { verah } from '@/content/verah'

/**
 * Sobreposto: o usuário fecha e continua exatamente de onde parou.
 *
 * Trava de scroll, foco preso, Esc e devolução do foco vêm do vaul, por baixo
 * do Drawer do shadcn — não são reimplementados aqui.
 */
export function LeadDrawer() {
  const { drawerAberto, fecharDrawer, plantaInteresse } = useSessao()
  const [direcao, setDirecao] = useState<'bottom' | 'right'>('bottom')

  // De baixo no celular, lateral no desktop — sem trocar de componente.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const aplicar = () => setDirecao(mq.matches ? 'right' : 'bottom')
    aplicar()
    mq.addEventListener('change', aplicar)
    return () => mq.removeEventListener('change', aplicar)
  }, [])

  return (
    <Drawer
      open={drawerAberto}
      onOpenChange={(aberto) => {
        if (!aberto) fecharDrawer()
      }}
      direction={direcao}
    >
      {/* O max-w-sm do componente base é estreito demais para o formulário;
          o `!` vence a variante composta que o shadcn aplica por direção. */}
      <DrawerContent className="border-cocoa/15 bg-cream text-cocoa sm:w-[440px] sm:max-w-[440px]!">
        <div className="overflow-y-auto p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <DrawerHeader className="p-0 text-left">
            <DrawerTitle className="font-display text-2xl leading-tight">
              {verah.fila.titulo}
            </DrawerTitle>
            <DrawerDescription className="mt-2 text-sm opacity-70">
              {verah.fila.apoio}
            </DrawerDescription>
          </DrawerHeader>
          <div className="mt-6">
            <LeadForm plantaInteresse={plantaInteresse} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
