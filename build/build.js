'use strict'

process.env.NODE_ENV = 'production'

const path = require('path')
const fs = require('fs-extra')
const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const glob = require('glob')
const uglifyJs = require('uglify-js')
const CleanCSS = require('clean-css')
const exists = require('fs').existsSync
const config = require('./config')
const utils = require('./utils')
const webpackConfig = require('./webpack.prod.config')
const assetsRoot = utils.resolve(config.assetsRoot)
const startTime = +new Date

const spinner = ora('building for production...')
spinner.start()

rm(assetsRoot, err => {
  if (err) throw err

  webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    const endTime = +new Date
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

    // @note: copy static & minify static
    const staticPath = path.join(utils.resolve(config.basePath), config.staticPath);
    if (config.staticPath && exists(staticPath)) {
      const staticDistPath = path.join(assetsRoot, config.staticPath)
      fs.copySync(staticPath, staticDistPath)

      glob.sync(path.join(staticDistPath, './*.js')).forEach(filepath => {
        const miniJS = uglifyJs.minify(fs.readFileSync(filepath, 'utf8'))
        fs.writeFileSync(filepath, miniJS.code, 'utf8')
      })

      glob.sync(path.join(staticDistPath, './*.css')).forEach(filepath => {
        const miniCSS = new CleanCSS({}).minify(fs.readFileSync(filepath, 'utf8'))
        fs.writeFileSync(filepath, miniCSS.styles, 'utf8')
      })
    }

    console.log(chalk.cyan(`  Build complete. Total time: ${endTime - startTime}ms!\n`))
  })
})
