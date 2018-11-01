'use strict'

process.env.NODE_ENV = 'production'

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const rm = require('rimraf')
const webpack = require('webpack')
const pkg = require('../package.json')
const config = require('./config')
const utils = require('./utils')
const webpackConfig = require('./webpack.dist.config')
const publishPath = utils.resolve(config.publishPath)

const spinner = ora('building for production...')
spinner.start()

rm(publishPath, function(err) {
  if (err) throw err

  console.log(webpackConfig);
  webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    console.log()
    if (err) throw err

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    delete pkg.devDependencies
    fs.writeFileSync(path.resolve(publishPath, './package.json'), JSON.stringify(pkg, null, 2));

    // webpack(webpackConfig, function(err) {
    //   if (err) throw err


    // })
  })
})
