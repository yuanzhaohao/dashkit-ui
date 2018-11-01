'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const siteConfig = require('./webpack.site.config')
const config = require('./config')

module.exports = merge(siteConfig, {
  devtool: '#source-map',
  output: {
    filename: 'js/[name].[chunkhash:7].js',
    chunkFilename: 'js/[id].[chunkhash:7].js'
  },
  plugins: [
    ...(config.extractStyle
      ? [
        new OptimizeCSSPlugin({
          cssProcessorOptions: {
            safe: true,
            map: { inline: false }
          }
        }),
        new ExtractTextPlugin('[name].[contenthash:7].css', { allChunks: true })
      ]
      : []
    ),
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
    new webpack.HashedModuleIdsPlugin(),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + ['js', 'css'].join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  ]
})
