'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const portfinder = require('portfinder')
const open = require('open')
const utils = require('./utils')
const config = require('./config')
const webpackConfig = require('./webpack.dev.config')

const HOST = config.host || 'localhost'
const PORT = config.port || '8787'

const app = express()
const compiler = webpack(webpackConfig)
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  quiet: true,
})

app.use('/static', express.static(utils.resolve('./static')))
app.use(require('connect-history-api-fallback')())
app.use(devMiddleware)

utils.log('starting dev server...')
devMiddleware.waitUntilValid(function() {
  const page = config.indexPage || 'index';
  const uri = `http://${HOST}:${PORT}/${page}.html`

  utils.success(`Listening at ${uri}\n`)
  open(uri);
})

portfinder.basePort = PORT
portfinder.getPort((err, port) => {
  if (err) {
    throw err
  } else {
    const server = app.listen(port)
  }
})
