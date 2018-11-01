'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const siteConfig = require('./webpack.site.config')

module.exports = merge(siteConfig, {
  devtool: '#source-map',
  output: {
    filename: 'js/[name].[chunkhash:7].js',
    chunkFilename: 'js/[id].[chunkhash:7].js'
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
