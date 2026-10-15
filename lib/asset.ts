import type { ImagemBook } from '@/content/verah'

/**
 * Prefixo de publicação. Em produção a página vive em /verah (nginx do
 * lps-icasa); na prévia, no subcaminho do GitHub Pages. O mesmo valor
 * alimenta o `basePath` do next.config — ele não alcança atributos de tags
 * nativas, então `<img>` precisa do prefixo à mão.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/verah'

/** Prévia: não indexa e não grava leads. */
export const PREVIA = process.env.NEXT_PUBLIC_PREVIA === '1'

export function asset(src: string): string {
  return `${BASE_PATH}${src}`
}

/** Toda imagem do book existe em duas larguras: a 640 e a original. */
export function srcSetBook(img: ImagemBook): string {
  return `${asset(img.src.replace('.jpg', '-640.jpg'))} 640w, ${asset(img.src)} ${img.largura}w`
}
