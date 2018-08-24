'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const portfinder = require('portfinder')
const openBrowser = require('react-dev-utils/openBrowser')
const proxyMiddleware = require('http-proxy-middleware')
const utils = require('./utils')
const config = require('./config')
const webpackConfig = require('./webpack.dev.config')

const HOST = config.host || 'localhost'
const PORT = config.port || '8787'
const URI = `http://${HOST}:${PORT}/`

const app = express()
const compiler = webpack(webpackConfig)
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  quiet: true,
})

app.use('/static', express.static(utils.resolve(config.staticPath)))
app.use(require('connect-history-api-fallback')())
app.use(devMiddleware)

// proxy api requests
if (config.proxyTable && Object.keys(config.proxyTable).length > 0) {
  Object.keys(config.proxyTable).forEach(function(context) {
    let options = config.proxyTable[context]
    if (typeof options === 'string') {
      options = {
        target: options
      };
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })
}

// mock data
let mockPath = utils.resolve('./mock')
if (config.mockData && fs.existsSync(mockPath)) {
  const mockRouter = express.Router()

  app.use(proxyMiddleware('/mock-api', {
    target: URI,
    pathRewrite: {
      '^/mock-api' : '/mock-api'
    }
  }))

  mockRouter.all('/:method', (req, res) => {
    let method = req.params.method.replace(/\.json$/, '')
    let jsonPath = path.join(mockPath, method + '.json')
    delete require.cache[require.resolve(jsonPath)]
    let data = require(jsonPath)
    res.json(data)
  });
  app.use('/mock-api', mockRouter)
}

utils.log('starting dev server...')
devMiddleware.waitUntilValid(function() {
  const page = config.indexPage || 'index';
  const uri = `${URI}${page}.html`

  utils.success(`Listening at ${uri}\n`)
  openBrowser(uri);
})

portfinder.basePort = PORT
portfinder.getPort((err, port) => {
  if (err) {
    throw err
  } else {
    const server = app.listen(port)
  }
})
