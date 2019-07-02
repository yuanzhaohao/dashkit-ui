'use strict';

process.env.NODE_ENV = 'production';

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const rm = require('rimraf');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge');
const sass = require('node-sass');
// const sass = require('sass');
const csso = require('csso');
const postcss = require('postcss');
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

async function run() {
  await buildDistEntry();
  await buildDevEntry();

  await copyFiles();

  await buildStyle();

  await transpileTsFiles(publishEsPath);
  process.env.BABEL_MODULE = 'commonjs';
  await transpileTsFiles(publishLibPath);
}

async function buildStyle() {
  const files = glob.sync(path.join(publishSrcPath, './**/*.scss'));
  files.map(filePath => {
    const result = sass.renderSync({
      file: filePath,
    });
    const code = csso.minify(result.css.toString()).css;
    const cssSrcPath = filePath.replace('.scss', '.css');
    const cssLibPath = cssSrcPath.replace(publishSrcPath, publishLibPath);
    const cssEsPath = cssSrcPath.replace(publishSrcPath, publishEsPath);
    fs.writeFileSync(cssSrcPath, code, 'utf8');
    fs.writeFileSync(cssLibPath, code, 'utf8');
    fs.writeFileSync(cssEsPath, code, 'utf8');
  });
}

async function transpileTsFiles(targetPath, module) {
  const files = glob.sync(path.join(publishSrcPath, './**/*.?(ts|tsx)'));

  files.map(filePath => {
    const codeText = babel.transformFileSync(filePath, babelConfig).code;
    const source = fs.readFileSync(filePath, 'utf8');
    const targetFilePath =
      targetPath + filePath.replace(publishSrcPath, '').replace(/\.[^\.]+$/g, '.js');

    if (!fs.existsSync(targetFilePath)) {
      fs.createFileSync(targetFilePath);
    }
    fs.writeFileSync(targetFilePath, codeText, 'utf8');
  });
}

async function copyFiles() {
  const pkg = require('../package.json');
  delete pkg.devDependencies;
  delete pkg.scripts;

  fs.copySync(srcPath, publishSrcPath);
  copyFilesWithExt('scss');
  copyFilesWithExt('svg');
  fs.copySync(utils.resolve('./readme.md'), path.join(publishPath, './readme.md'));
  fs.writeFileSync(path.resolve(publishPath, './package.json'), JSON.stringify(pkg, null, 2));
}

function copyFilesWithExt(type) {
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

async function buildDistEntry() {
  return new Promise(function(resolve) {
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
    webpack(merge(webpackConfig, distConfig), function(err, stats) {
      callback(err, stats);
      resolve();
    });
  });
}

async function buildDevEntry() {
  return new Promise(function(resolve) {
    const devConfig = {
      output: {
        filename: 'dashkit.development.js',
      },
    };
    webpack(merge(webpackConfig, devConfig), function(err, stats) {
      callback(err, stats);
      resolve();
    });
  });
}
