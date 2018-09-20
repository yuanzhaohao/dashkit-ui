'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const exists = require('fs').existsSync
const utils = require('./utils')
const config = require('./config')
const sitePath = utils.resolve('site')
const srcPath = utils.resolve('src')
const entry = utils.getEntry(path.join(sitePath, './entry'))
const vendors = config.optimizeCommon && typeof config.optimizeCommon === 'object'
  ? config.optimizeCommon
  : {}

const createLintingRule = () => ({
  test: /\.(js|ts|tsx)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [sitePath],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true
  }
})

const createHtmlPlugin = () => {
  let defaultTplPath = path.join(sitePath, './template.html')
  return Object.keys(entry).map(page => {
    let pageTplPath = path.join(sitePath, `./${page}.html`)
    let templatePath = defaultTplPath
    let chunks = Object.keys(vendors).concat(page)

    if (exists(pageTplPath)) templatePath = pageTplPath

    return new HtmlWebpackPlugin({
      filename: `${page}.html`,
      template: templatePath,
      inject: 'body',
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      chunks
    })
  })
}

const createHappypackPlugin = () => {
  const os = require('os')
  const HappyPack = require('happypack')
  const threadPool = HappyPack.ThreadPool({ size: os.cpus().length })
  const createHappypack = (id, loaders) => {
    return new HappyPack({ id, loaders, threadPool })
  }

  return [
    createHappypack('js', [{
      path: 'babel-loader',
      query: {
        cacheDirectory: '.happypack_cache'
      }
    }]),
    createHappypack('ts', [{
      path: 'ts-loader',
      query: {
        happyPackMode: true
      }
    }]),
    createHappypack('sass', ['sass-loader']),
    createHappypack('css', ['css-loader']),
  ]
}

module.exports = {
  entry: Object.assign({}, entry, vendors),
  output: {
    path: utils.resolve(config.assetsRoot),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', 'css', 'scss', 'svg', 'md'],
    alias: {
      'dashkit-ui': srcPath,
      '@': srcPath
    }
  },
  resolveLoader: {
    modules: [
      utils.resolve('node_modules'),
    ]
  },
  plugins: [
    ...(createHtmlPlugin()),
    ...(createHappypackPlugin()),
    ...(config.optimizeCommon && typeof config.optimizeCommon === 'object'
      ? [new webpack.optimize.CommonsChunkPlugin({
        names: Object.keys(config.optimizeCommon),
        minChunks: Infinity
      })]
      : []
    ),
  ],
  module: {
    rules: [
      ...(config.useEslint ? [createLintingRule()] : []),
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=js',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'happypack/loader?id=ts',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: config.extractStyle === true
          ? ExtractTextPlugin.extract(['happypack/loader?id=css', 'postcss-loader', 'happypack/loader?id=sass'])
          : ['style-loader', 'happypack/loader?id=css', 'postcss-loader', 'happypack/loader?id=sass']
      },
      {
        test: /\.svg$/,
        use: [{
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.md$/,
        // test: /(en\-US)|(zh\-CN)\.md(\?.*)?$/,
        loader: 'markdown-website-loader',
      },
    ]
  },
  stats: {
    errors: true,
    warnings: false
  }
}
