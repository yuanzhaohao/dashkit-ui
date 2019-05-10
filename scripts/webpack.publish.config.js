'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const utils = require('./utils');
const config = require('./config');
const baseConfig = require('./webpack.base.config');
const publishPath = utils.resolve(config.publishPath);

module.exports = merge(baseConfig, {
  entry: utils.resolve('src/index.tsx'),
  output: {
    filename: 'dashkit.development.js',
    path: path.join(publishPath, './dist'),
    libraryTarget: 'umd',
    library: 'Dashkit',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        map: false,
      },
    }),
    new ExtractTextPlugin('dashkit.css', {
      allChunks: true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
});
