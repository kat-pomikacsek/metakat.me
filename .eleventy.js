const htmlmin = require('html-minifier');
const fs = require("fs");
const path = require("path");

const manifestPath = path.resolve(__dirname, "dist", "assets", "manifest.json");
const manifest = JSON.parse(
  fs.readFileSync(manifestPath, { encoding: "utf8" })
);

module.exports = function(eleventyConfig) {
  // Layout aliases make templates more portable.
  eleventyConfig.addLayoutAlias("default", "layouts/default.njk");
  
  // Adds a universal shortcode to return the URL to a webpack asset. In Nunjack templates:
  // {% webpackAsset 'main.js' %} or {% webpackAsset 'main.css' %}
  eleventyConfig.addShortcode("webpackAsset", function(name) {
    if (!manifest[name]) {
      throw new Error(`The asset ${name} does not exist in ${manifestPath}`);
    }
    return manifest[name];
  });

  // Reload the page every time the JS/CSS are changed.
  eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] });

  // Copy all images
  eleventyConfig.addPassthroughCopy('./src/images', "images");
  // Copy all fonts
  eleventyConfig.addPassthroughCopy('./src/font', "font");

  if (process.env.ELEVENTY_ENV === 'production') {
    eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
      if (outputPath.endsWith('.html')) {
        const minified = htmlmin.minify(content, {
          collapseInlineTagWhitespace: false,
          collapseWhitespace: true,
          removeComments: true,
          sortClassName: true,
          useShortDoctype: true,
        });

        return minified;
      }

      return content;
    });
  }

  return {
    dir: {
      includes: '_includes',
      input: 'src/site',
      output: 'dist',
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: 'njk',
    templateFormats: [
      'njk',
      'md',
    ],
    passthroughFileCopy: true,
  };
};
