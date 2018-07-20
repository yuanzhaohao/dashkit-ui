'use strict'

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const express = require('express')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const utils = require('./utils')
const config = require('./config')
const baseWebpackConfig = require('./webpack.base.config')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  devtool: 'cheap-module-eval-source-map',

  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    compress: true,
    host: HOST || config.host,
    port: PORT || config.port,
    open: config.autoOpen,
    overlay: { warnings: false, errors: true },
    proxy: config.proxyTable,
    quiet: true,
    watchOptions: {
      aggregateTimeout: 350,
      poll: 1500
    },
    setup(app) {
      app.use('/static', express.static(utils.resolve('./static')))

      // mock data
      let mockPath = utils.resolve('./mock')
      if (config.mockData && fs.existsSync(mockPath)) {
        const mockRouter = express.Router()
        mockRouter.all('/:method', (req, res) => {
          let method = req.params.method.replace(/\.json$/, '')
          let jsonPath = path.join(mockPath, method + '.json')
          delete require.cache[require.resolve(jsonPath)]
          let data = require(jsonPath)
          res.json(data)
        });
        app.use('/mock-api', mockRouter)
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    ...(config.extractStyle === true ? [new ExtractTextPlugin('[name].css', { allChunks: true })] : [])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = PORT || config.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      resolve(devWebpackConfig)
    }
  })
})
