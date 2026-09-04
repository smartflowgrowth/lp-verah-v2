import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // A página é servida em lancamentos.icasaimob.com.br/verah/ pelo nginx do
  // lps-icasa. Sem basePath, todo asset sairia apontando para a raiz do
  // domínio e a página subiria sem CSS nem JavaScript.
  basePath: '/verah',
  // O otimizador de imagem do Next precisa de servidor, e o export não tem.
  images: { unoptimized: true },
}

export default nextConfig
