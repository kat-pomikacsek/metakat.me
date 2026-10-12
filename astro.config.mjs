import { defineConfig, passthroughImageService, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  compressHTML: true,
  trailingSlash: 'ignore',
  outDir: './dist',
  build: {
    format: 'directory',
  },
  image: {
    service: passthroughImageService(),
    domains: ['images.ctfassets.net'],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Overpass',
      cssVariable: '--font-overpass',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
    },
  ],
});
