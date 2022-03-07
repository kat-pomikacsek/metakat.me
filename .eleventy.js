require('dotenv').config();
const htmlmin = require('html-minifier');
const fs = require("fs");
const path = require("path");
const shortCodes = require('./src/lib/shortcodes');

const isDev = process.env.ELEVENTY_ENV === "development";

const manifestPath = path.resolve(__dirname, "dist", "assets", "manifest.json");
const manifest = isDev
  ? {
      "main.js": "/assets/index.js",
      "main.css": "/assets/index.css",
    }
  : JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }));

const {
  documentToHtmlString
} = require('@contentful/rich-text-html-renderer');


module.exports = function(eleventyConfig) {
  // Layout aliases make templates more portable.
  eleventyConfig.addLayoutAlias("default", "layouts/default.njk");
  
  //custom shortcodes
  eleventyConfig.addShortcode('formatDate', shortCodes.formatDate);
  eleventyConfig.addShortcode('documentToHtmlString', documentToHtmlString);
  eleventyConfig.addShortcode("renderImage", shortCodes.renderImage);
  eleventyConfig.addShortcode("renderImageBlock", shortCodes.renderImageBlock);
  eleventyConfig.addShortcode("renderImageBlocks", shortCodes.renderImageBlocks);
  eleventyConfig.addShortcode('renderCaseStudyBody', shortCodes.renderCaseStudyBody);
  eleventyConfig.addShortcode('renderCaseStudyDate', shortCodes.renderCaseStudyDate);
  eleventyConfig.addShortcode("renderMethods", shortCodes.renderMethods);
  eleventyConfig.addShortcode("renderOrganizations", shortCodes.renderOrganizations);
  eleventyConfig.addShortcode("renderTeaserImage", shortCodes.renderTeaserImage);
  eleventyConfig.addShortcode("renderPicture", shortCodes.renderPicture);
  eleventyConfig.addShortcode("caseStudyBackgroundClass", shortCodes.caseStudyBackgroundClass);


  // Adds a universal shortcode to return the URL to a webpack asset. In Nunjack templates:
  // {% webpackAsset 'main.js' %} or {% webpackAsset 'main.css' %}
  eleventyConfig.addShortcode("webpackAsset", function(name) {
    if (!manifest[name]) {
      throw new Error(`The asset ${name} does not exist in ${manifestPath}`);
    }
    return manifest[name];
  });

  //Shortcode to output current year in footer
  eleventyConfig.addShortcode("currentYear", function() {
    const year = new Date().getFullYear();
    return `<span class="current-year">${year}</span>`;
  });


  // Reload the page every time the JS/CSS are changed.
  eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] });

  // Copy static files directly to output.
  eleventyConfig.addPassthroughCopy({ "src/static": "static" });

  // Copy all images
  eleventyConfig.addPassthroughCopy({'src/images': 'images'});
  // Copy all fonts
  eleventyConfig.addPassthroughCopy({'src/font': 'font'});

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
      input: 'src',
      output: 'dist',
      includes: '_includes',
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
