import { defineConfig, passthroughImageService } from 'astro/config';

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
    service: passthroughImageService(),
    domains: ['images.ctfassets.net'],
  },
});
