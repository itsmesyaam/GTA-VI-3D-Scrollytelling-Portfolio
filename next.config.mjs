const isProd = process.env.NODE_ENV === 'production';
const repoBasePath = '/GTA-VI-3D-Scrollytelling-Portfolio';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? repoBasePath : '',
  assetPrefix: isProd ? repoBasePath : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
