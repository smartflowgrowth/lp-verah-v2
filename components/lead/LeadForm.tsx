'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  esquemaLead,
  INTERESSES,
  ROTULO_INTERESSE,
  type DadosLead,
  type EntradaLead,
} from '@/lib/lead/schema'
import { submitLead, urlWhatsapp } from '@/lib/lead/submitLead'
import { formatarTelefone } from '@/lib/lead/telefone'
import { verah } from '@/content/verah'
import { track } from '@/lib/track'
import { useCampoVisivel, useTecladoAberto } from '@/lib/scroll/useCampoVisivel'

type Props = {
  plantaInteresse?: string
  aoConcluir?: () => void
}

/* py menor no celular: cada 4 px economizados por campo é mais formulário
   visível na faixa que sobra acima do teclado. text-base evita o zoom
   automático do Safari no iOS, que dispara com fonte menor que 16 px e
   desalinha a página inteira. */
const campoBase =
  'w-full rounded-lg border border-cocoa/20 bg-cream px-4 text-base outline-none transition-colors placeholder:text-cocoa/40 focus:border-gold focus:ring-2 focus:ring-gold/30 sm:py-3 sm:text-sm'

export function LeadForm({ plantaInteresse, aoConcluir }: Props) {
  // Mantém o campo em foco visível quando o teclado do celular sobe.
  const formRef = useCampoVisivel<HTMLFormElement>()
  const teclado = useTecladoAberto()
  /* Tudo encolhe enquanto o teclado ocupa metade da tela, e volta ao normal
     quando ele fecha. text-base (16px) permanece: abaixo disso o Safari do
     iOS dá zoom ao focar. */
  const campo = `${campoBase} ${teclado.aberto ? 'py-2' : 'py-2.5'}`
  const rotulo = `block text-xs uppercase tracking-[0.14em] opacity-70 ${
    teclado.aberto ? 'mb-0.5' : 'mb-1'
  }`
  const chip = `flex-1 cursor-pointer whitespace-nowrap rounded-full border border-cocoa/20 px-2 text-center text-xs transition-colors has-[:checked]:border-gold has-[:checked]:bg-gold/20 sm:flex-none sm:px-4 sm:text-sm ${
    teclado.aberto ? 'py-1.5' : 'py-2'
  }`
  const legenda = `text-xs uppercase tracking-[0.14em] opacity-70 ${
    teclado.aberto ? 'mb-1' : 'mb-1.5 sm:mb-2'
  }`
  const [enviado, setEnviado] = useState(false)
  const [erroEnvio, setErroEnvio] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    // <entrada, contexto, saída> — o schema transforma o telefone, então
    // entrada e saída são tipos diferentes e o resolver exige os três.
  } = useForm<EntradaLead, unknown, DadosLead>({
    resolver: zodResolver(esquemaLead),
    defaultValues: { plantaInteresse, empresa: '' },
  })

  async function aoEnviar(dados: DadosLead) {
    setErroEnvio(null)
    const r = await submitLead(dados)
    if (r.ok) {
      track('form_enviou', {
        interesse: dados.interesse,
        plantaInteresse: dados.plantaInteresse ?? null,
        temCorretor: Boolean(dados.corretor),
      })
      setEnviado(true)
      aoConcluir?.()
      return
    }
    setErroEnvio(r.motivo)
  }

  if (enviado) {
    return (
      <div className="py-8 text-center" role="status" aria-live="polite">
        <p className="font-display text-2xl">Pronto. Seu lugar está guardado.</p>
        <p className="mt-3 text-sm opacity-70">
          Você será um dos primeiros a receber as condições de pré-lançamento.
        </p>
        <a
          href={urlWhatsapp(verah.contato.whatsapp, verah.contato.mensagemWhatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-gold px-6 py-3 text-sm font-medium text-cocoa"
        >
          Falar agora no WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(aoEnviar)}
      noValidate
      /* Com o teclado aberto os campos se aproximam: são os ~30 px que
         separam o botão de enviar de ficar abaixo da borda. Volta ao
         normal assim que o teclado fecha. */
      className={`flex flex-col ${teclado.aberto ? 'gap-1.5' : 'gap-3'} sm:gap-4`}
    >
      <div>
        <label htmlFor="nome" className={rotulo}>
          Nome e sobrenome
        </label>
        <input id="nome" type="text" autoComplete="name" className={campo} {...register('nome')} />
        {errors.nome && <p className="mt-1 text-xs text-brick">{errors.nome.message}</p>}
      </div>

      <div>
        <label
          htmlFor="telefone"
          className={rotulo}
        >
          WhatsApp com DDD
        </label>
        <input
          id="telefone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="(12) 98189-3999"
          className={campo}
          {...register('telefone', {
            onChange: (e) => setValue('telefone', formatarTelefone(e.target.value)),
          })}
        />
        {errors.telefone && <p className="mt-1 text-xs text-brick">{errors.telefone.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className={rotulo}>
          E-mail <span className="normal-case opacity-60">(opcional)</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={campo}
          {...register('email')}
        />
        {errors.email && <p className="mt-1 text-xs text-brick">{errors.email.message}</p>}
      </div>

      <fieldset>
        <legend className={legenda}>
          Seu interesse
        </legend>
        {/* Uma linha só no celular: quebrar em duas custava 40 px da faixa
            que sobra acima do teclado. */}
        <div className="flex flex-nowrap gap-1.5 sm:flex-wrap sm:gap-2">
          {INTERESSES.map((valor) => (
            <label
              key={valor}
              className={chip}
            >
              <input type="radio" value={valor} className="sr-only" {...register('interesse')} />
              {ROTULO_INTERESSE[valor]}
            </label>
          ))}
        </div>
        {errors.interesse && <p className="mt-1 text-xs text-brick">{errors.interesse.message}</p>}
      </fieldset>

      <fieldset>
        <legend className={legenda}>
          Planta de interesse <span className="normal-case opacity-60">(opcional)</span>
        </legend>
        {/* Chega marcada quando a pessoa veio do CTA de um card de planta;
            em branco quando veio do botão fixo ou do formulário do fim. */}
        <div className="flex flex-nowrap gap-1.5 sm:flex-wrap sm:gap-2">
          {verah.tipologias.map((t) => (
            <label
              key={t.id}
              className={chip}
            >
              <input
                type="radio"
                value={t.areaRotulo}
                className="sr-only"
                {...register('plantaInteresse')}
              />
              {t.areaRotulo}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="corretor"
          className={rotulo}
        >
          Corretor responsável <span className="normal-case opacity-60">(opcional)</span>
        </label>
        <input
          id="corretor"
          type="text"
          autoComplete="off"
          placeholder="Se veio por indicação, nos diga de quem"
          className={campo}
          {...register('corretor')}
        />
        {errors.corretor && <p className="mt-1 text-xs text-brick">{errors.corretor.message}</p>}
      </div>

      {/* Honeypot: invisível para gente, irresistível para bot. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px opacity-0"
        {...register('empresa')}
      />

      {erroEnvio && <p className="text-xs text-brick">{erroEnvio}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-full bg-cocoa px-6 py-4 text-sm font-medium tracking-wide text-cream transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? 'Enviando…' : verah.cta.rotuloDrawer}
      </button>

      {/* O aviso reaparece assim que o teclado fecha; some só enquanto ele
          está roubando metade da tela. */}
      <p
        className={`text-center text-[10px] leading-snug opacity-50 sm:text-[11px] sm:leading-relaxed ${
          teclado.aberto ? 'hidden sm:block' : ''
        }`}
      >
        Ao enviar, você concorda em receber contato da equipe de vendas.
      </p>
    </form>
  )
}
