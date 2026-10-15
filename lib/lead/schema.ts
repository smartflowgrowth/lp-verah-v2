import { z } from 'zod'
import { normalizarTelefone } from './telefone'

export const INTERESSES = ['morador', 'investidor', 'corretor'] as const

export const ROTULO_INTERESSE: Record<(typeof INTERESSES)[number], string> = {
  morador: 'Quero morar',
  investidor: 'Quero investir',
  corretor: 'Sou corretor',
}

/**
 * Renda familiar mensal, em três faixas pensadas para o Verah: 2 e 3
 * dormitórios de 52 a 70 m² em Caçapava, com financiamento e FGTS. O corte
 * de R$ 12 mil acompanha o teto do Minha Casa Minha Vida; abaixo de R$ 6 mil
 * o cliente costuma depender de subsídio e de um prazo mais longo.
 */
export const RENDAS = ['ate-6', '6-a-12', 'acima-12'] as const

export const ROTULO_RENDA: Record<(typeof RENDAS)[number], string> = {
  'ate-6': 'Até R$ 6 mil',
  '6-a-12': 'R$ 6 a 12 mil',
  'acima-12': 'Acima de R$ 12 mil',
}

export const esquemaLead = z.object({
  nome: z
    .string()
    .trim()
    .min(5, 'Escreva seu nome e sobrenome.')
    .refine((v) => v.split(/\s+/).length >= 2, 'Escreva seu nome e sobrenome.'),

  telefone: z
    .string()
    .transform(normalizarTelefone)
    .refine(
      (d) => d.length === 10 || d.length === 11,
      'Informe um número com DDD.',
    ),

  /* Opcional: muita gente no celular abandona o formulário no campo de
     e-mail. O telefone já basta para o atendimento. Vazio passa; o que
     for preenchido ainda precisa ser um e-mail válido. */
  email: z.union([z.literal(''), z.email('Confira o e-mail.')]).optional(),

  interesse: z.enum(INTERESSES, { message: 'Escolha uma opção.' }),

  renda: z.enum(RENDAS, { message: 'Escolha uma faixa.' }),

  /* `nullish`, e não `optional`: um grupo de rádio sem nenhuma opção marcada
     chega do react-hook-form como `null`. Com `optional` o envio era barrado
     sem mensagem nenhuma — o erro caía num campo que não tem onde aparecer. */
  plantaInteresse: z.string().nullish(),

  /** Opcional: quem preencher veio por indicação de um corretor. */
  corretor: z.string().trim().max(80, 'Nome muito longo.').optional(),

  /** Honeypot. Preenchido significa bot: a mesma convenção do lead-lp. */
  empresa: z.string().max(0).optional(),
})

/**
 * O telefone passa por `.transform()`, então entrada e saída do schema são
 * tipos diferentes: o formulário guarda a string com máscara, o envio recebe
 * os dígitos limpos. O react-hook-form precisa dos dois.
 */
export type EntradaLead = z.input<typeof esquemaLead>
export type DadosLead = z.output<typeof esquemaLead>
