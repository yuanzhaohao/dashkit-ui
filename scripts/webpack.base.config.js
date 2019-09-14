'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const utils = require('./utils');
const config = require('./config');
const sitePath = utils.resolve(config.sitePath);
const srcPath = utils.resolve(config.srcPath);

const createHappypackPlugin = () => {
  const os = require('os');
  const HappyPack = require('happypack');
  const threadPool = HappyPack.ThreadPool({ size: os.cpus().length });
  const createHappypack = (id, loaders) => {
    return new HappyPack({ id, loaders, threadPool });
  };

  return [
    createHappypack('js', [
      {
        path: 'babel-loader',
        query: {
          cacheDirectory: '.happypack_cache',
        },
      },
    ]),
    createHappypack('ts', [
      {
        path: 'ts-loader',
        query: {
          happyPackMode: true,
        },
      },
    ]),
    // createHappypack('sass', ['sass-loader']),
    createHappypack('sass', [
      {
        loader: 'sass-loader',
        options: {
          data: "$icon-base-url: '//yuanzhaohao.github.io/dashkit-fonts';",
          // data: "$icon-base-url: '//localhost:8999/static/fonts';",
        },
      },
    ]),
    createHappypack('css', ['css-loader']),
  ];
};

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.css', '.scss', '.svg', '.md'],
    alias: {
      'dashkit-ui': srcPath,
      '@': srcPath,
    },
  },
  resolveLoader: {
    modules: [utils.resolve('node_modules')],
  },
  plugins: [...createHappypackPlugin()],
  module: {
    rules: [
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
        loader:
          process.env.NODE_ENV === 'production'
            ? ExtractTextPlugin.extract([
                'happypack/loader?id=css',
                'postcss-loader',
                'happypack/loader?id=sass',
              ])
            : [
                'style-loader',
                'happypack/loader?id=css',
                'postcss-loader',
                'happypack/loader?id=sass',
              ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
      {
        // test: /\.md$/,
        test: /\.md(\?.*)?$/,
        // test: /(en\-US)|(zh\-CN)\.md(\?.*)?$/,
        loader: 'markdown-website-loader',
      },
    ],
  },
  stats: {
    errors: true,
    warnings: false,
  },
};
