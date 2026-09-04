'use client'

import { BLOCOS } from '@/content/verah'
import { useSessao } from './SessionProvider'

/**
 * Vertical à direita no desktop, barra fina no topo no mobile.
 * Consome o progresso da sessão; não mede scroll por conta própria.
 */
export function ProgressRail() {
  const { progresso, blocoAtivo } = useSessao()
  const percentual = Math.round(progresso * 100)

  return (
    <>
      {/* Mobile: barra no topo */}
      <div
        className="fixed inset-x-0 top-0 z-40 h-[2px] bg-cocoa/10 md:hidden"
        role="progressbar"
        aria-label="Progresso da sessão"
        aria-valuenow={percentual}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-gold transition-[width] duration-150 ease-out"
          style={{ width: `${percentual}%` }}
        />
      </div>

      {/* Desktop: trilho vertical */}
      <nav
        className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 md:block"
        aria-label="Blocos da sessão"
      >
        <ol className="flex flex-col gap-4">
          {BLOCOS.map((bloco) => {
            const ativo = bloco.id === blocoAtivo
            return (
              <li key={bloco.id} className="group flex items-center justify-end gap-3">
                <span
                  className={`text-[10px] uppercase tracking-[0.18em] transition-opacity duration-300 ${
                    ativo ? 'opacity-70' : 'opacity-0 group-hover:opacity-50'
                  }`}
                >
                  {bloco.rotulo}
                </span>
                <a
                  href={`#${bloco.id}`}
                  aria-label={`Ir para ${bloco.rotulo}`}
                  aria-current={ativo ? 'true' : undefined}
                  className={`block rounded-full transition-all duration-300 ${
                    ativo ? 'h-6 w-[3px] bg-gold' : 'h-[3px] w-[3px] bg-cocoa/30 hover:bg-cocoa/60'
                  }`}
                />
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
