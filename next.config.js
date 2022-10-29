/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: ['node_modules']
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en'
  }
};

module.exports = nextConfig;
