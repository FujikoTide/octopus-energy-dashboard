import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
      // optional: log when restored from HMR cache in dev
      hmrRefreshes: true,
    },
  },
}

export default nextConfig
