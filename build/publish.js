'use strict'

process.env.NODE_ENV = 'production'

const fs = require('fs')
const path = require('path')
const ora = require('ora')
const rm = require('rimraf')
const webpack = require('webpack')
const pkg = require('../package.json')
const config = require('./config')
const utils = require('./utils')
const webpackConfig = require('./webpack.dist.config')
const publishPath = utils.resolve(config.publishPath)

delete pkg.devDependencies

console.log(publishPath)

const spinner = ora('building for production...')
spinner.start()

rm(publishPath, function(err) {
  if (err) throw err

  webpack(webpackConfig, function (err) {
    spinner.stop()
    console.log()
    if (err) throw err
    fs.writeFileSync(path.resolve(publishPath, './package.json'), JSON.stringify(pkg, null, 2));
  })
})
