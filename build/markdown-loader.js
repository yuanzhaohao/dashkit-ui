const loaderUtils = require('loader-utils');
const marked = require('marked');
const transformer = require('./transformer');

module.exports = function (source) {
  if (this.cacheable) {
    this.cacheable();
  }
  const options = loaderUtils.getOptions(this) || {};

  const reg = /:::\s?example\s?([^]+?):::/g;
  const demos = [];
  source = source.replace(reg, (match, text, offset) => {
    const dataCode = getDataCode(text);
    const dataMeta = getDataMeta(text);
    const component = transformer(dataCode);
    console.log(component)
    demos.push({
      dataCode,
      dataMeta,
      component,
    });
    return '';
  });

  return `module.exports = {` +
    `\n  markdown: ${JSON.stringify(source)},` +
    ` \n  demos: ${JSON.stringify(demos)},` +
    `};`;
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
