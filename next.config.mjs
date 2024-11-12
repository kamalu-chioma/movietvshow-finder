// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**', // Allows all paths under /t/p
      },
    ],
  },
  env: {
    OCR_SPACE_API_KEY: process.env.OCR_SPACE_API_KEY,
    OCR_SPACE_API_URL: process.env.OCR_SPACE_API_URL,
  },
};

export default nextConfig;
