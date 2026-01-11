/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd', '@ant-design/icons', '@ant-design/pro-components'],
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ];
  },
  webpack: (config, { isServer }) => {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    // 添加规则处理静态文件
    config.module.rules.push({
      test: /\.(txt|md|LICENSE|README)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/[hash][ext][query]'
      }
    });
    
    return config;
  },
};

module.exports = nextConfig;
