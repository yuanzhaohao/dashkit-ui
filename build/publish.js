'use strict'

process.env.NODE_ENV = 'production'

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const rm = require('rimraf')
const glob = require('glob')
const babel = require('babel-core');
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./config')
const utils = require('./utils')
const webpackConfig = require('./webpack.publish.config')
const publishPath = utils.resolve(config.publishPath)
const srcPath = utils.resolve(config.srcPath)
const tsc = require('typescript')
const tsConfig = require('../tsconfig.json')
const publishSrcPath = path.join(publishPath, './src')
const publishLibPath = path.join(publishPath, './lib')
const publishEsPath = path.join(publishPath, './es')

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

  webpack(merge(webpackConfig, distConfig), function(err, stats) {
    callback(err, stats);

    webpack(merge(webpackConfig, devConfig), function(err, stats) {
      callback(err, stats);
      fs.copySync(srcPath, publishSrcPath)

      copyScssFiles()
      createPackageFile()
      transpileTsFiles()
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

function transpileTsFiles() {
  Array.prototype.concat(
    glob.sync(path.join(publishSrcPath, './**/*.ts')),
    glob.sync(path.join(publishSrcPath, './**/*.tsx'))
  ).forEach((filePath) => {
    const source = fs.readFileSync(filePath, 'utf8')
    const result = tsc.transpileModule(source, tsConfig)

    const esFilePath = publishEsPath + filePath
      .replace(publishSrcPath, '')
      .replace(/\.[^\.]+$/g, '.js')

    const libFilePath = publishLibPath + filePath
      .replace(publishSrcPath, '')
      .replace(/\.[^\.]+$/g, '.js')

    if (!fs.existsSync(esFilePath)) {
      fs.createFileSync(esFilePath)
    }
    if (!fs.existsSync(libFilePath)) {
      fs.createFileSync(libFilePath)
    }
    fs.writeFileSync(esFilePath, result.outputText, 'utf8')
    fs.writeFileSync(libFilePath, result.outputText, 'utf8')
  })
}

function copyScssFiles() {
  const files = glob.sync(path.join(publishSrcPath, './**/*.scss'))
  files.forEach((filePath) => {
    const newFilePath = publishEsPath + filePath.replace(publishSrcPath, '')
    fs.copySync(filePath, newFilePath)
  })

  files.forEach((filePath) => {
    const newFilePath = publishLibPath + filePath.replace(publishSrcPath, '')
    fs.copySync(filePath, newFilePath)
  })
}