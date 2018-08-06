'use strict'

const path = require('path')

module.exports = {
  indexPage: 'index',
  staticPath: './static',
  assetsRoot: './dist',
  proxyTable: {},
  mockData: true,
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
