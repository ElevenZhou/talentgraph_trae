/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // 排除 pdfjs-dist 的 worker 文件，避免 SWC 解析失败
    config.resolve.alias.canvas = false
    config.module.rules.push({
      test: /pdfjs-dist\/build\/pdf\.worker\.mjs/,
      type: 'asset/resource',
    })
    return config
  },
}

module.exports = nextConfig
