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
                <a
                  href={`#${bloco.id}`}
                  aria-current={ativo ? 'true' : undefined}
                  className="flex items-center justify-end gap-3"
                >
                  <span
                    className={`text-[11px] uppercase transition-all duration-300 ${
                      ativo
                        ? 'font-medium tracking-[0.2em] text-cocoa opacity-100'
                        : 'tracking-[0.16em] text-cocoa/55 opacity-100 group-hover:text-cocoa'
                    }`}
                  >
                    {bloco.rotulo}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`block rounded-full transition-all duration-300 ${
                      ativo ? 'h-7 w-[3px] bg-gold' : 'h-[3px] w-[3px] bg-cocoa/35 group-hover:bg-cocoa/70'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
