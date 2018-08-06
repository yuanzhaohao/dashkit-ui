'use strict'

const path = require('path')

module.exports = {
  indexPage: 'index',
  staticPath: './static',
  assetsRoot: './dist',
  proxyTable: {
    '/mock-api': {
      target: 'http://localhost:8787/',
      pathRewrite: {
        '^/mock-api' : '/mock-api'
      }
    },
  },
  optimizeCommon: {
    'vendor-lib': [
      'axios',
      'classnames'
    ],
    'vendor-redux': [
      'redux',
      'redux-promise-middleware',
      'redux-thunk'
    ],
    'vendor-react': [
      'react',
      'react-dom',
      'react-router',
      'react-redux'
    ]
  },
  host: 'localhost',
  port: 8999,
  autoOpen: true,
  useEslint: false,
  visualizer: true,
  extractStyle: false,
  mockData: true
}
