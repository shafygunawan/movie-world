const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    index: {
      import: './src/app.js',
      dependOn: 'shared',
    },
    vendor: {
      import: './src/vendor.js',
      dependOn: 'shared',
    },
    shared: [
      'regenerator-runtime',
      '@chenfengyuan/datepicker/dist/datepicker.min.css',
      'swiper/swiper-bundle.min.css',
      'swiper',
      'jquery',
      '@chenfengyuan/datepicker/dist/datepicker.esm',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js',
  },
  module: {
    rules: [{
      test: /\.css$/i,
      use: [{
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              autoprefixer,
            ],
          },
        },
      },
      ],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images'),
          to: path.resolve(__dirname, 'dist/images'),
        },
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist/favicon.ico'),
        },
      ],
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
  },
};
