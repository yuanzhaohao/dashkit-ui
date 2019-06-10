'use strict';

process.env.NODE_ENV = 'production';

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const rm = require('rimraf');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge');
const babel = require('@babel/core');
const utils = require('./utils');
const config = require('./config');
const webpackConfig = require('./webpack.publish.config');
const publishPath = utils.resolve(config.publishPath);
const srcPath = utils.resolve(config.srcPath);
const tsc = require('typescript');
const tsConfig = require('../tsconfig.json');
const babelConfig = {
  configFile: utils.resolve('./babel.config.js'),
};
const publishSrcPath = path.join(publishPath, './src');
const publishLibPath = path.join(publishPath, './lib');
const publishEsPath = path.join(publishPath, './es');

rm(publishPath, function(err) {
  if (err) {
    utils.fatal(err);
  }

  run();
});

function run() {
  const distConfig = {
    output: {
      filename: 'dashkit.production.js',
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        sourceMap: false,
        compress: {
          warnings: false,
          collapse_vars: true,
          reduce_vars: true,
        },
      }),
    ],
  };
  const devConfig = {
    output: {
      filename: 'dashkit.development.js',
    },
  };

  webpack(merge(webpackConfig, distConfig), function(err, stats) {
    callback(err, stats);

    webpack(merge(webpackConfig, devConfig), function(err, stats) {
      callback(err, stats);
      fs.copySync(srcPath, publishSrcPath);
      fs.copySync(utils.resolve('./readme.md'), path.join(publishPath, './readme.md'));

      copyFiles('scss');
      copyFiles('svg');
      createPackageFile();

      transpileTsFiles(publishEsPath);
      process.env.BABEL_MODULE = 'commonjs';
      transpileTsFiles(publishLibPath);
      // transpileTsFiles(publishEsPath, 'esnext');
      // transpileTsFiles(publishLibPath, 'commonjs');
    });
  });
}

function createPackageFile() {
  const pkg = require('../package.json');
  delete pkg.devDependencies;
  delete pkg.scripts;
  fs.writeFileSync(path.resolve(publishPath, './package.json'), JSON.stringify(pkg, null, 2));
}

function transpileTsFiles(targetPath, module) {
  const files = glob.sync(path.join(publishSrcPath, './**/*.?(ts|tsx)'));

  files.forEach(filePath => {
    const codeText = babel.transformFileSync(filePath, babelConfig).code;
    const source = fs.readFileSync(filePath, 'utf8');
    // const codeText = tsc.transpileModule(source, {
    //   ...tsConfig,
    //   compilerOptions: {
    //     ...tsConfig.compilerOptions,
    //     module,
    //     // noEmitHelpers: true,
    //   },
    // }).outputText;
    const targetFilePath =
      targetPath + filePath.replace(publishSrcPath, '').replace(/\.[^\.]+$/g, '.js');

    if (!fs.existsSync(targetFilePath)) {
      fs.createFileSync(targetFilePath);
    }
    fs.writeFileSync(targetFilePath, codeText, 'utf8');
  });
}

function copyFiles(type) {
  const files = glob.sync(path.join(publishSrcPath, `./**/*.${type}`));
  files.forEach(filePath => {
    const esFilePath = publishEsPath + filePath.replace(publishSrcPath, '');
    const libFilePath = publishLibPath + filePath.replace(publishSrcPath, '');
    fs.copySync(filePath, esFilePath);
    fs.copySync(filePath, libFilePath);
  });
}

function callback(err, stats) {
  console.log();
  if (err) {
    utils.fatal(err);
  }

  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n',
  );

  if (stats.hasErrors()) {
    utils.fatal('Build failed with errors.');
  }
}
