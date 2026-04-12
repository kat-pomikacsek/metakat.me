const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const isProd = process.env.NODE_ENV === 'production';

const plugins = [
  require('postcss-nested'),
  tailwindcss('tailwind.config.cjs'),
  require('postcss-custom-properties'),
  require('postcss-custom-media'),
  autoprefixer,
];

if (isProd) {
  const purgecss = require('@fullhuman/postcss-purgecss');
  const cssnano = require('cssnano');

  plugins.push(
    purgecss({
      content: ['src/**/*.{astro,ts,js}', 'src/**/*.css'],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: [/sky|peach|mango|petrol|gray|screen\-mobile/],
    }),
    cssnano({
      preset: 'default',
    }),
  );
}

module.exports = { plugins };
