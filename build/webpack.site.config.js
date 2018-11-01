'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const exists = require('fs').existsSync
const utils = require('./utils')
const config = require('./config')
const baseConfig = require('./webpack.base.config')
const sitePath = utils.resolve('site')
const entry = utils.getEntry(path.join(sitePath, './entry'))
const vendors = config.optimizeCommon && typeof config.optimizeCommon === 'object'
  ? config.optimizeCommon
  : {}

const createHtmlPlugin = () => {
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  let defaultTplPath = path.join(sitePath, './template.html')
  return Object.keys(entry).map(page => {
    let pageTplPath = path.join(sitePath, `./${page}.html`)
    let templatePath = defaultTplPath
    let chunks = Object.keys(vendors).concat(page)

    if (exists(pageTplPath)) templatePath = pageTplPath

    return new HtmlWebpackPlugin({
      filename: `${page}.html`,
      template: templatePath,
      inject: 'body',
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      chunks
    })
  })
}

module.exports = merge(baseConfig, {
  entry: Object.assign({}, entry, vendors),
  output: {
    path: utils.resolve(config.siteAssetsRoot),
    filename: '[name].js'
  },
  plugins: [
    ...(createHtmlPlugin()),
    ...(config.optimizeCommon && typeof config.optimizeCommon === 'object' ?
      [new webpack.optimize.CommonsChunkPlugin({
        names: Object.keys(config.optimizeCommon),
        minChunks: Infinity
      })] :
      []
    ),
  ],
})