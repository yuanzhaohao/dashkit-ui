'use strict'

const path = require('path')

module.exports = {
  srcPath: './src',
  sitePath: './site',
  siteAssetsRoot: './gh-pages',
  publishPath: './publish',
  proxyTable: {},
  mockData: false,
  optimizeCommon: {
    'vendor-lib': [
      'prop-types',
      'classnames',
      'react-transition-group'
    ],
    'vendor-react': [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  },
  host: 'localhost',
  port: 8999,
  autoOpen: true,
  useEslint: false,
  extractStyle: false,
  mockData: true
}
