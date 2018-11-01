'use strict'

const path = require('path')
const merge = require('webpack-merge')
const utils = require('./utils')
const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  entry: utils.resolve('src/index.tsx'),
  stats: {
    children: false
  },
  output: {
    path: path.join(__dirname, '../publish/dist'),
    libraryTarget: 'umd',
    library: 'Dashkit',
    filename: 'dashkit.js',
  },
})