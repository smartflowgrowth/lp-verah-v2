'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { verah } from '@/content/verah'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'
import { useSessao } from './SessionProvider'

/**
 * Um único botão em duas posições: centralizado sob a frase de abertura
 * enquanto o visitante está no herói, e recolhido ao canto a partir da
 * segunda sessão. O `layout` do Motion faz a viagem entre as duas — são o
 * mesmo elemento, então ele desliza em vez de piscar.
 *
 * Some no bloco final, onde o formulário já está na tela.
 */
export function StickyCta() {
  const { blocoAtivo, drawerAberto, abrirDrawer } = useSessao()
  const modo = useSessionMotion()
  const [pulsar, setPulsar] = useState(false)

  const noHeroi = blocoAtivo === 'vista'
  const oculto = blocoAtivo === 'fila' || drawerAberto

  // Pulso discreto a cada 45 s, e só com o usuário parado.
  useEffect(() => {
    if (oculto || noHeroi || !modo.anima) return
    let ocioso: ReturnType<typeof setTimeout>
    const intervalo = setInterval(() => {
      ocioso = setTimeout(() => {
        setPulsar(true)
        setTimeout(() => setPulsar(false), 1400)
      }, 1500)
    }, 45000)
    const cancelar = () => {
      clearTimeout(ocioso)
      setPulsar(false)
    }
    window.addEventListener('scroll', cancelar, { passive: true })
    return () => {
      clearInterval(intervalo)
      clearTimeout(ocioso)
      window.removeEventListener('scroll', cancelar)
    }
  }, [oculto, noHeroi, modo.anima])

  return (
    <AnimatePresence>
      {!oculto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: modo.duracao * 0.6 }}
          className={
            noHeroi
              ? 'pointer-events-none fixed inset-x-0 top-[63%] z-50 flex justify-center px-4'
              : 'pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:inset-x-auto md:bottom-8 md:right-8 md:px-0 md:pb-0'
          }
        >
          <motion.button
            layout
            transition={{ duration: modo.duracao, ease: [0.22, 1, 0.36, 1] }}
            type="button"
            onClick={() => abrirDrawer('fixo')}
            className={`pointer-events-auto rounded-full bg-cocoa/95 px-7 py-4 text-sm font-medium tracking-wide text-cream shadow-lg backdrop-blur transition-colors duration-300 hover:bg-cocoa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              noHeroi ? '' : 'w-full md:w-auto'
            } ${pulsar ? 'animate-pulse ring-2 ring-gold/50' : ''}`}
          >
            {verah.cta.fixo}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
