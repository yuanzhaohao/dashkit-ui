'use strict'

process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.publish.config')

const distConfig = {
  output: {
    filename: 'dashkit.production.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      sourceMap: false,
      compress: {
        warnings: false,
        collapse_vars: true,
        reduce_vars: true
      }
    }),
  ]
}

module.exports =  merge(webpackConfig, distConfig)