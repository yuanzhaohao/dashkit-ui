'use strict'

const path = require('path')

module.exports = {
  staticPath: './static',
  assetsRoot: './dist',
  proxyTable: {
    '/api': {
      target: 'http://blackcat.dev/',
      changeOrigin: true,
      pathRewrite: {
        '^/api' : '/api'
      }
    },
    '/mock-api': {
      target: 'http://localhost:8999/',
      pathRewrite: {
        '^/mock-api' : '/mock-api'
      }
    },
    '/media': {
      target: 'http://blackcat.dev/',
      changeOrigin: true,
      pathRewrite: {
        '^/media' : '/media'
      }
    }
  },
  optimizeCommon: {
    'vendor-lib': [
      'axios',
      'classnames'
    ],
    'vendor-react': [
      'react',
      'react-dom',
      'react-router'
    ]
  },
  host: '0.0.0.0',
  port: 8999,
  autoOpen: true,
  useEslint: false,
  visualizer: true,
  extractStyle: false,
  mockData: true
}
