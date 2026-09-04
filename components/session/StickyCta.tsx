'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { verah } from '@/content/verah'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'
import { useSessao } from './SessionProvider'

/**
 * Sempre visível, exceto no bloco final — lá o formulário já está na tela e o
 * botão competiria consigo mesmo.
 */
export function StickyCta() {
  const { blocoAtivo, drawerAberto, abrirDrawer } = useSessao()
  const modo = useSessionMotion()
  const [pulsar, setPulsar] = useState(false)

  const oculto = blocoAtivo === 'fila' || drawerAberto

  // Pulso discreto a cada 45 s, e só com o usuário parado.
  useEffect(() => {
    if (oculto || !modo.anima) return
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
  }, [oculto, modo.anima])

  return (
    <AnimatePresence>
      {!oculto && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: modo.duracao * 0.6 }}
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:inset-x-auto md:right-8 md:bottom-8 md:px-0 md:pb-0"
        >
          <button
            type="button"
            onClick={() => abrirDrawer('fixo')}
            className={`w-full rounded-full bg-cocoa/95 px-7 py-4 text-sm font-medium tracking-wide text-cream shadow-lg backdrop-blur transition-colors duration-300 hover:bg-cocoa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:w-auto ${
              pulsar ? 'animate-pulse ring-2 ring-gold/50' : ''
            }`}
          >
            {verah.cta.fixo}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
