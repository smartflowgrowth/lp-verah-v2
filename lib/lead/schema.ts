import { z } from 'zod'
import { normalizarTelefone } from './telefone'

export const INTERESSES = ['morador', 'investidor', 'corretor'] as const

export const ROTULO_INTERESSE: Record<(typeof INTERESSES)[number], string> = {
  morador: 'Quero morar',
  investidor: 'Quero investir',
  corretor: 'Sou corretor',
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

  plantaInteresse: z.string().optional(),

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
