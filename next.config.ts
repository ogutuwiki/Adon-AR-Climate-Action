
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Basic PWA setup, can be enhanced with next-pwa for service workers etc.
  // For now, this ensures the manifest.json is linked.
  // For full PWA, consider using a library like @ducanh2912/next-pwa
  // and configuring service workers.
  // This basic setup is for manifest linking primarily.
  // experimental: {
  //   appDir: true, // This is default in Next.js 13.4+
  // },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     // config.output.publicPath = `/_next/`; // Or your custom asset prefix
  //   }
  //   return config;
  // },
};

export default nextConfig;
