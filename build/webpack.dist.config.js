'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const utils = require('./utils')
const config = require('./config')
const baseConfig = require('./webpack.base.config')
const publishPath = utils.resolve(config.publishPath)
console.log(publishPath)

module.exports = merge(baseConfig, {
  entry: utils.resolve('src/index.tsx'),
  stats: {
    children: false
  },
  output: {
    path: path.join(publishPath, './dist'),
    libraryTarget: 'umd',
    library: 'Dashkit',
    filename: 'dashkit.min.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      sourceMap: true,
      compress: {
        warnings: false,
        collapse_vars: true,
        reduce_vars: true
      }
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        map: {
          inline: false
        }
      }
    }),
    new ExtractTextPlugin('[name].[contenthash:7].css', {
      allChunks: true
    })
  ]
})