import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // A página é servida em lancamentos.icasaimob.com.br/verah/ pelo nginx do
  // lps-icasa. Sem basePath, todo asset sairia apontando para a raiz do
  // domínio e a página subiria sem CSS nem JavaScript.
  //
  // Na prévia (GitHub Pages do repo temporário) o build recebe outro prefixo
  // por NEXT_PUBLIC_BASE_PATH — o mesmo valor que `lib/asset.ts` lê.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '/verah',
  // O otimizador de imagem do Next precisa de servidor, e o export não tem.
  images: { unoptimized: true },
}

export default nextConfig
