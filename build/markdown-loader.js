const loaderUtils = require('loader-utils');
const marked = require('marked');
const transformer = require('./transformer');
const defaultOptions = {
  markedRenderer: new marked.Renderer,
};

module.exports = function (source) {
  if (this.cacheable) {
    this.cacheable();
  }
  const options = Object.assign(defaultOptions, loaderUtils.getOptions(this));
  const reg = /:::\s?example\s?([^]+?):::/g;
  const demos = [];
  source = source.replace(reg, (match, text) => {
    const dataCode = getDataCode(text);
    const dataMeta = getDataMeta(text);
    const previewer = transformer(dataCode);
    if (dataMeta.subtitle) {
      dataMeta.subtitle = marked(dataMeta.subtitle, {
        renderer: options.markedRenderer
      })
    }
    console.log(previewer);
    demos.push(
      `{` +
      `dataCode: ${JSON.stringify(dataCode)},` +
      `dataMeta: ${JSON.stringify(dataMeta)},` +
      `previewer: ${previewer},` +
      `}`
    );
    return '';
  });

  return `module.exports = {` +
    `\n  basic: ${JSON.stringify(marked(source, { renderer: options.markedRenderer }))},` +
    `\n  demos: [${demos.join(',')}],` +
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
