const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const isDev = process.env.ELEVENTY_ENV === "development";

const plugins = [
  tailwindcss('tailwind.config.js'),
  require('postcss-nested'),
  require('postcss-custom-properties'),
  require('postcss-custom-media'),  
  autoprefixer,
];

if (!isDev) {
  const purgecss = require('@fullhuman/postcss-purgecss');
  const cssnano = require('cssnano');

  [].push.apply(plugins, [
    purgecss({
      content: ['src/**/*.njk', 'src/**/*.md', 'src/**/*.js'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: [/sky|peach|mango|petrol|gray|screen\-mobile/]
    }),
    cssnano({
      preset: 'default',
    }),
  ]);
}

module.exports = { plugins };