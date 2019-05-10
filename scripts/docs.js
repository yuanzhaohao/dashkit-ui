'use strict';

process.env.NODE_ENV = 'document';

const path = require('path');
const fs = require('fs-extra');
const ora = require('ora');
const rm = require('rimraf');
const chalk = require('chalk');
const webpack = require('webpack');
const glob = require('glob');
const uglifyJs = require('uglify-js');
const CleanCSS = require('clean-css');
const exists = require('fs').existsSync;
const config = require('./config');
const utils = require('./utils');
const webpackConfig = require('./webpack.docs.config');
const siteAssetsRoot = utils.resolve(config.siteAssetsRoot);
const startTime = +new Date();

const spinner = ora('building for documents website...');
spinner.start();

rm(siteAssetsRoot, function(err) {
  if (err) throw err;

  webpack(webpackConfig, function(err, stats) {
    spinner.stop();
    const endTime = +new Date();
    console.log();
    if (err) throw err;

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
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }

    // @note: copy static & minify static
    const staticPath = path.join(utils.resolve(config.sitePath), './static');
    if (exists(staticPath)) {
      const staticDistPath = path.join(siteAssetsRoot, './static');
      fs.copySync(staticPath, staticDistPath);

      glob.sync(path.join(staticDistPath, './*.js')).forEach((filePath) => {
        const miniJS = uglifyJs.minify(fs.readFileSync(filePath, 'utf8'));
        fs.writeFileSync(filePath, miniJS.code, 'utf8');
      });

      glob.sync(path.join(staticDistPath, './*.css')).forEach((filePath) => {
        const miniCSS = new CleanCSS({}).minify(fs.readFileSync(filePath, 'utf8'));
        fs.writeFileSync(filePath, miniCSS.styles, 'utf8');
      });
    }

    console.log(chalk.cyan(`  Build complete. Total time: ${endTime - startTime}ms!\n`));
  });
});
