'use strict'

const path = require('path')

module.exports = {
  indexPage: 'index',
  basePath: './site',
  staticPath: './static',
  assetsRoot: './dist',
  proxyTable: {},
  mockData: true,
  optimizeCommon: {
    'vendor-lib': [
      'prop-types',
      'classnames'
    ],
    // 'vendor-redux': [
    //   'redux',
    //   'redux-promise-middleware',
    //   'redux-thunk',
    //   'react-redux'
    // ],
    'vendor-react': [
      'react',
      'react-dom',
      'react-router'
    ]
  },
  host: 'localhost',
  port: 8999,
  autoOpen: true,
  useEslint: false,
  visualizer: true,
  extractStyle: true,
  mockData: true
}
