'use strict'

process.env.NODE_ENV = 'production'

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const rm = require('rimraf')
const glob = require('glob')
const utilTool = require('util')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./config')
const utils = require('./utils')
const webpackConfig = require('./webpack.publish.config')
const publishPath = utils.resolve(config.publishPath)
const srcPath = utils.resolve(config.srcPath)
// const exec = utilTool.promisify(require('child_process').exec)
const tsc = require('typescript')
const tsConfig = require('../tsconfig.json')
const publishSrcPath = path.join(publishPath, './src')
const publishEsPath = path.join(publishPath, './es')

Array.prototype.concat(
  glob.sync(path.join(publishSrcPath, './**/*.ts')),
  glob.sync(path.join(publishSrcPath, './**/*.tsx'))
).forEach((filePath) => {
  const source = fs.readFileSync(filePath, 'utf8')
  const newFilePath = publishEsPath + filePath
    .replace(publishSrcPath, '')
    .replace(/\.[^\.]+$/g, '.js')
  const result = tsc.transpileModule(source, tsConfig)
  const declation = tsc.transpileModule(source, tsConfig)
  console.log(declation)


  if (!fs.existsSync(newFilePath)) {
    fs.createFileSync(newFilePath)
  }
  fs.writeFileSync(newFilePath, result.outputText, 'utf8')
})

// const distConfig = {
//   output: {
//     filename: 'dashkit.min.js',
//   },
//   plugins: [
//     new webpack.optimize.UglifyJsPlugin({
//       beautify: false,
//       comments: false,
//       sourceMap: false,
//       compress: {
//         warnings: false,
//         collapse_vars: true,
//         reduce_vars: true
//       }
//     }),
//   ]
// }
// const devConfig = {
//   output: {
//     filename: 'dashkit.js',
//   }
// }


// rm(publishPath, function(err) {
//   if (err) throw err

//   webpack(merge(webpackConfig, distConfig), function(err, stats) {
//     callback(err, stats);

//     webpack(merge(webpackConfig, devConfig), function(err, stats) {
//       callback(err, stats);

//       // package.json
//       createPackageFile()

//       // copy source files
//       const publishSrcPath = path.join(publishPath, './src')
//       const publishEsPath = path.join(publishPath, './es')
//       const publishLibPath = path.join(publishPath, './lib')
//       fs.copySync(srcPath, publishSrcPath)
//       fs.copySync(srcPath, publishEsPath)
//       fs.copySync(srcPath, publishLibPath)


//       Array.prototype.concat(
//         glob.sync(path.join(publishEsPath, './**/*.ts')),
//         glob.sync(path.join(publishEsPath, './**/*.tsx')),
//         glob.sync(path.join(publishLibPath, './**/*.ts')),
//         glob.sync(path.join(publishLibPath, './**/*.tsx')),
//       ).forEach(filePath => {
//         fs.remove(filePath)
//       })

//       tsc();
//     })
//   })
// })


// function callback(err, stats) {
//   console.log()
//   if (err) throw err

//   process.stdout.write(stats.toString({
//     colors: true,
//     modules: false,
//     children: false,
//     chunks: false,
//     chunkModules: false
//   }) + '\n\n')

//   if (stats.hasErrors()) {
//     console.log(chalk.red('  Build failed with errors.\n'))
//     process.exit(1)
//   }
// }

// function createPackageFile() {
//   const pkg = require('../package.json')
//   delete pkg.devDependencies
//   delete pkg.scripts
//   fs.writeFileSync(path.resolve(publishPath, './package.json'), JSON.stringify(pkg, null, 2))
// }


// async function tsc() {
//   const { stdout, stderr } = await exec('tsc -p tsconfig.json');
//   console.log('stderr:', stderr);
//   console.log('stdout:', stdout);
// }