'use strict'

process.env.NODE_ENV = 'production'

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const rm = require('rimraf')
const glob = require('glob')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./config')
const utils = require('./utils')
const webpackConfig = require('./webpack.dist.config')
const publishPath = utils.resolve(config.publishPath)
const srcPath = utils.resolve(config.srcPath)
const tsc = require('typescript')
const tsConfig = require('../tsconfig.json')

console.log(tsc, tsConfig)


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
}
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

      // package.json
      createPackageFile()

      // copy source files
      const publishSrcPath = path.join(publishPath, './src')
      const publishEsPath = path.join(publishPath, './es')
      const publishLibPath = path.join(publishPath, './lib')
      fs.copySync(srcPath, publishSrcPath)
      fs.copySync(srcPath, publishEsPath)
      fs.copySync(srcPath, publishLibPath)


      glob.sync(path.join(publishEsPath, './**/*.ts')).concat(
        glob.sync(path.join(publishEsPath, './**/*.tsx')),
        glob.sync(path.join(publishEsPath, './**/*.ts')),
        glob.sync(path.join(publishEsPath, './**/*.tsx')),
      ).forEach(filePath => {
        fs.remove(filePath)
      })
    })
  })
})


function callback(err, stats) {
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
}

function createPackageFile() {
  const pkg = require('../package.json')
  delete pkg.devDependencies
  delete pkg.scripts
  fs.writeFileSync(path.resolve(publishPath, './package.json'), JSON.stringify(pkg, null, 2))
}