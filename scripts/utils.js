'use strict';
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const format = require('util').format;

exports.resolve = function(dir) {
  return path.join(__dirname, '..', dir || '');
};

exports.getEntry = function(globPath) {
  const files = glob.sync(path.join(globPath, './*.?(tsx|js|jsx)'));
  const entries = {};

  files.forEach(filepath => {
    const name = filepath.replace(/(.*\/)*([^.]+).*/gi, '$2');
    if (name && !entries[name]) {
      entries[name] = filepath;
    }
  });

  return entries;
};

const prefix = '   dashkit-ui';
const sep = chalk.gray('·');

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */

exports.log = function() {
  const msg = format.apply(format, arguments);
  console.log(chalk.white(prefix), sep, msg);
};

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */

exports.fatal = function(message) {
  if (message instanceof Error) message = message.message.trim();
  const msg = format.apply(format, arguments);
  console.error(chalk.red(prefix), sep, msg);
  process.exit(1);
};

/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */

exports.success = function() {
  const msg = format.apply(format, arguments);
  console.log(chalk.white(prefix), sep, msg);
};
