// Makes Sass faster!
const Fiber = require('fibers');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const path = require('path');

const isDev = process.env.NODE_ENV === "development";

const baseFilename = isDev ? "index" : "index.[contenthash]";

module.exports = {
  // Our "entry" point
  entry: [
    path.resolve(__dirname, "src", "assets", "js", "index.js"),
    path.resolve(__dirname, "src", "assets", "css", "index.scss"),
  ],
  output: {
    // The global variable name any `exports` from `index.js` will be available at
    library: 'SITE',
    path: path.resolve(__dirname, "dist", "assets"),
    filename: `${baseFilename}.js`,
  },
  module: {
    rules: [
      // Transpile and polyfill our JavaScript
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        // Setting up compiling our Sass
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              // eslint-disable-next-line global-require
              implementation: require('sass'),
              sassOptions: {
                fiber: Fiber,
                outputStyle: 'expanded',
              },
            },
          },
        ],
      },
    ],
  },
  // Any `import`s from `node_modules` will compiled in to a `vendor.js` file.
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${baseFilename}.css`,
    }),
    new WebpackManifestPlugin({ publicPath: "/assets/" }),
  ],
};
