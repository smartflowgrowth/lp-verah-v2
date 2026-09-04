'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useSessionMotion } from '@/lib/scroll/useSessionMotion'
import { useSessao } from './SessionProvider'
import { CtaPrincipal } from './CtaPrincipal'

/**
 * O CTA recolhido ao canto, a partir da segunda sessão.
 *
 * No herói ele não aparece: lá o mesmo botão vive no fluxo do bloco,
 * centralizado sob a frase de abertura. E some de novo no bloco final, onde
 * o formulário já está na tela e o botão competiria consigo mesmo.
 */
export function StickyCta() {
  const { blocoAtivo, drawerAberto } = useSessao()
  const modo = useSessionMotion()
  const [pulsar, setPulsar] = useState(false)

  const oculto = blocoAtivo === 'vista' || blocoAtivo === 'fila' || drawerAberto

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
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:inset-x-auto md:bottom-8 md:right-8 md:px-0 md:pb-0"
        >
          <CtaPrincipal destaque={pulsar} className={`w-full md:w-auto ${pulsar ? 'animate-pulse' : ''}`} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
