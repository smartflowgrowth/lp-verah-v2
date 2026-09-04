'use client'

import { Block } from '../Block'
import { LeadForm } from '@/components/lead/LeadForm'
import { verah } from '@/content/verah'
import { urlWhatsapp } from '@/lib/lead/submitLead'

export function Fila() {
  const { fila, contato, marca } = verah

  return (
    <Block id="fila" className="px-6 py-28 md:py-40">
      <div className="mx-auto max-w-2xl">
        <p className="text-center text-[11px] uppercase tracking-[0.3em] opacity-45">
          {fila.encerramento}
        </p>
        <h2 className="mt-8 text-center font-display text-[clamp(2rem,6vw,3.5rem)] leading-[1.05]">
          {fila.titulo}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed opacity-75">
          {fila.apoio}
        </p>

        <div className="mt-14 rounded-2xl border border-cocoa/15 p-6 sm:p-8">
          <LeadForm />
        </div>

        <div className="mt-12 text-center">
          <a
            href={urlWhatsapp(contato.whatsapp, contato.mensagemWhatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline underline-offset-4 opacity-70 transition-opacity hover:opacity-100"
          >
            Prefere conversar agora? Chame no WhatsApp
          </a>
        </div>

        <p className="mt-16 text-center text-[11px] leading-relaxed opacity-40">{fila.aviso}</p>
        <p className="mt-4 text-center font-display text-lg tracking-[0.2em] opacity-50">
          {marca.nome}
        </p>
      </div>
    </Block>
  )
}
