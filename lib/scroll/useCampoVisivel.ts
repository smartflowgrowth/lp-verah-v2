'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * No celular o teclado virtual cobre metade da tela, e o campo que acabou de
 * receber foco costuma ficar embaixo dele — a pessoa digita às cegas ou
 * precisa rolar a cada campo.
 *
 * O teclado não altera `innerHeight`, então `dvh` e afins não ajudam: quem
 * enxerga o teclado é a `visualViewport`, que encolhe quando ele abre. Ouvir
 * o `resize` dela é o que permite recentralizar no momento certo.
 *
 * O `focusin` cobre o outro caso: trocar de campo com o teclado já aberto,
 * quando a viewport não muda de tamanho e nenhum `resize` dispara.
 */
export function useCampoVisivel<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const raiz = ref.current
    if (!raiz) return

    const centralizar = () => {
      const ativo = document.activeElement as HTMLElement | null
      if (!ativo || !raiz.contains(ativo)) return
      if (!/^(INPUT|TEXTAREA|SELECT)$/.test(ativo.tagName)) return
      ativo.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }

    // Espera o teclado terminar de subir antes de medir.
    const aoFocar = () => window.setTimeout(centralizar, 320)

    const vv = window.visualViewport
    vv?.addEventListener('resize', centralizar)
    raiz.addEventListener('focusin', aoFocar)

    return () => {
      vv?.removeEventListener('resize', centralizar)
      raiz.removeEventListener('focusin', aoFocar)
    }
  }, [])

  return ref
}

/**
 * Verdadeiro enquanto o teclado virtual está aberto.
 *
 * O teclado não mexe em `innerHeight` — quem encolhe é a `visualViewport`.
 * A diferença entre as duas é a altura que o teclado ocupa; 150 px separa
 * com folga um teclado de uma barra de navegação recolhendo.
 *
 * Serve para tirar da tela o que não é campo (título, chips, aviso legal) no
 * momento em que cada pixel decide se o botão de enviar fica alcançável.
 */
export type EstadoTeclado = {
  aberto: boolean
  /** Altura realmente visível, em px, enquanto o teclado está aberto. */
  alturaVisivel: number | null
}

export function useTecladoAberto(): EstadoTeclado {
  const [estado, setEstado] = useState<EstadoTeclado>({ aberto: false, alturaVisivel: null })

  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return
    const medir = () => {
      const aberto = window.innerHeight - vv.height > 150
      setEstado({ aberto, alturaVisivel: aberto ? Math.round(vv.height) : null })
    }
    medir()
    vv.addEventListener('resize', medir)
    return () => vv.removeEventListener('resize', medir)
  }, [])

  return estado
}
