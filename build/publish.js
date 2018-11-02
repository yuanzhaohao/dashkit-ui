'use strict'

process.env.NODE_ENV = 'production'

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const rm = require('rimraf')
const webpack = require('webpack')
const merge = require('webpack-merge')
const pkg = require('../package.json')
const config = require('./config')
const utils = require('./utils')
const webpackConfig = require('./webpack.dist.config')
const publishPath = utils.resolve(config.publishPath)

const distConfig = {
  output: {
    filename: 'dashkit.min.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      sourceMap: false,
      compress: {
        warnings: false,
        collapse_vars: true,
        reduce_vars: true
      }
    }),
  ]
};

const devConfig = {
  output: {
    filename: 'dashkit.js',
  }
}


rm(publishPath, function(err) {
  if (err) throw err

  webpack(merge(webpackConfig, distConfig), function (err, stats) {
    callback(err, stats);

    webpack(merge(webpackConfig, devConfig), function (err, stats) {
      callback(err, stats);

      delete pkg.devDependencies
      fs.writeFileSync(path.resolve(publishPath, './package.json'), JSON.stringify(pkg, null, 2))
    })
  })
})


function callback(err, stats) {
  console.log()
  if (err) throw err

  process.stdout.write(stats.toString({
    // colors: true,
    // modules: false,
    children: false,
    // chunks: false,
    // chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }
}