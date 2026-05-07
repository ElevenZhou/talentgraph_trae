/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 生产环境不使用 SWC 编译 pdfjs-dist（文件太大导致解析失败）
  experimental: {
    swcPlugins: [],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false
    // 跳过 pdfjs-dist worker 的 SWC 编译
    config.module.rules.push({
      test: /pdfjs-dist[\\/]build[\\/]/,
      use: 'null-loader',
    })
    return config
  },
}

module.exports = nextConfig
