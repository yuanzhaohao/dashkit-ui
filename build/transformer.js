'use strict';

const babel = require('babel-core');

const defaultBabelConfig = {
  presets: ['es2015', 'react', 'stage-0'],
  plugins: [
    'transform-decorators-legacy',
  ],
};

module.exports = function transformer(code, babelConfig = {}) {
  const result = babel.transform(code, Object.assign({}, defaultBabelConfig, babelConfig));

  return result.code;
};
