const loaderUtils = require('loader-utils');
const marked = require('marked');
const transformer = require('./transformer');

module.exports = function (source) {
  if (this.cacheable) {
    this.cacheable();
  }
  const options = loaderUtils.getOptions(this) || {};

  source = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  const reg = /:::\s?example\s?([^]+?):::/g;
  const example = {};
  const replaceText = source.replace(reg, (match, text, offset) => {
    console.log(text)
    const key = `example-${offset.toString(36)}`;
    const dataCode = getDataCode(text);
    const dataMeta = getDataMeta(text);
    example[key] = {
      dataCode,
      dataMeta,
      component: transformer(dataCode),
    };
    return `<div id=${key}></div>`;
  });

  return `module.exports = {`
    + `\n  markdown: ${replaceText},`
    + `\n  example: ${JSON.stringify(example)},`
  + `};`;
}

function getDataCode(markdownText) {
  if (markdownText) {
    const reg = /```(.*)js\s?([^]+?)```/;
    const sourceMatch = markdownText.match(reg);
    if (sourceMatch && sourceMatch.length && sourceMatch[2]) {
      return sourceMatch[2];
    }
  }
  return '';
}

function getDataMeta(markdownText) {
  const metaData = {};
  if (markdownText) {
    const reg = /```(.*)meta\s?([^]+?)```/;
    const metaMatch = markdownText.match(reg);
    if (metaMatch && metaMatch.length && metaMatch[2]) {
      const originData = metaMatch[2];
      const lines = originData.trim().split('\n');

      lines.forEach((line) => {
        const ary = line.trim().split(':');
        if (ary && ary.length > 1) {
          metaData[ary[0]] = ary[1].trim();
        }
      });
    }
  }
  return metaData;
}