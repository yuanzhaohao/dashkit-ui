'use strict'

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('./config')
const baseWebpackConfig = require('./webpack.base.config')

const devWebpackConfig = merge(baseWebpackConfig, {
  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    ...(config.extractStyle === true
      ? [new ExtractTextPlugin('[name].css', { allChunks: true })]
      : []
    )
  ]
})

module.exports = devWebpackConfig
