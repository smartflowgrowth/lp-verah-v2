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
import { useTecladoAberto } from '@/lib/scroll/useCampoVisivel'
import { verah } from '@/content/verah'

/**
 * Sobreposto: o usuário fecha e continua exatamente de onde parou.
 *
 * Trava de scroll, foco preso, Esc e devolução do foco vêm do vaul, por baixo
 * do Drawer do shadcn — não são reimplementados aqui.
 */
export function LeadDrawer() {
  const { drawerAberto, fecharDrawer, plantaInteresse } = useSessao()
  const teclado = useTecladoAberto()
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
      {/* 92dvh vence o max-h-[80vh] que o componente base aplica ao drawer
          de baixo: com o teclado aberto, cada faixa de tela conta. */}
      {/*
        Com o teclado aberto, a altura vem da visualViewport em pixels — e
        não de dvh. `dvh` deriva de innerHeight, que o teclado NÃO altera:
        no iPhone o drawer ficaria com 747 px enquanto só 476 estão
        visíveis, e metade do formulário nasceria embaixo do teclado.
      */}
      {/*
        A altura sai de uma variável CSS, e não de um style inline: a classe
        precisa de `!` para vencer o max-h que o componente base aplica por
        direção, e `!important` numa classe vence style inline — o limite do
        teclado era simplesmente ignorado.
      */}
      <DrawerContent
        className="border-cocoa/15 bg-cream text-cocoa max-h-[var(--altura-util)]! sm:max-h-none! sm:w-[440px] sm:max-w-[440px]!"
        style={
          {
            '--altura-util': teclado.alturaVisivel ? `${teclado.alturaVisivel}px` : '92dvh',
          } as React.CSSProperties
        }
      >
        <div
          className={`overflow-y-auto overscroll-contain sm:p-6 ${
            teclado.aberto
              ? 'px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]'
              : 'p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]'
          }`}
        >
          {/* Com o teclado aberto o cabeçalho sai de cena: são ~50 px que
              decidem se o botão de enviar fica alcançável sem rolar. O
              DrawerTitle continua no DOM porque o diálogo é rotulado por
              ele — só deixa de ocupar altura. */}
          <DrawerHeader className={`p-0 text-left ${teclado.aberto ? 'sr-only' : ''}`}>
            {/* Curto no celular: a pessoa acabou de clicar no CTA e já sabe
                o que está fazendo ali. O título completo custaria duas
                linhas da faixa que sobra acima do teclado. */}
            <DrawerTitle className="font-display text-base leading-tight sm:text-2xl">
              <span className="sm:hidden">Entre na lista do Verah</span>
              <span className="hidden sm:inline">{verah.fila.titulo}</span>
            </DrawerTitle>
            {/* O texto de apoio some no celular: é contexto que a pessoa já
                leu na página, e ali ele empurraria os campos para baixo do
                teclado. */}
            <DrawerDescription className="mt-2 hidden text-sm opacity-70 sm:block">
              {verah.fila.apoio}
            </DrawerDescription>
          </DrawerHeader>
          <div className="mt-5 sm:mt-6">
            <LeadForm plantaInteresse={plantaInteresse} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
