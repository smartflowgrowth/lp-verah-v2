import { SessionProvider } from '@/components/session/SessionProvider'
import { ProgressRail } from '@/components/session/ProgressRail'
import { StickyCta } from '@/components/session/StickyCta'
import { LeadDrawer } from '@/components/lead/LeadDrawer'
import { Vista } from '@/components/session/blocks/Vista'
import { Endereco } from '@/components/session/blocks/Endereco'
import { Torre } from '@/components/session/blocks/Torre'
import { Plantas } from '@/components/session/blocks/Plantas'
import { Quintal } from '@/components/session/blocks/Quintal'
import { Personalizacao } from '@/components/session/blocks/Personalizacao'
import { Construtora } from '@/components/session/blocks/Construtora'
import { Fila } from '@/components/session/blocks/Fila'

export default function Page() {
  return (
    <SessionProvider>
      <ProgressRail />
      <main>
        <Vista />
        <Endereco />
        <Torre />
        <Plantas />
        <Quintal />
        <Personalizacao />
        <Construtora />
        <Fila />
      </main>
      <StickyCta />
      <LeadDrawer />
    </SessionProvider>
  )
}
