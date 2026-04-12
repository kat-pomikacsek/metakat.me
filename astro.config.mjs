import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  compressHTML: true,
  trailingSlash: 'ignore',
  outDir: './dist',
  build: {
    format: 'directory',
  },
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
});
