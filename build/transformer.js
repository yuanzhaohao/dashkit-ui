'use strict';

const babel = require('babel-core');
const types = require('babel-types');
const traverse = require('babel-traverse').default;
const generator = require('babel-generator').default;

const defaultBabelConfig = {
  presets: ['es2015', 'react', 'stage-0'],
  plugins: [
    'transform-decorators-legacy',
  ],
};

function requireGenerator(varName, moduleName) {
  return types.variableDeclaration('var', [
    types.variableDeclarator(
      types.identifier(varName),
      types.callExpression(
        types.identifier('require'),
        [types.stringLiteral(moduleName)]
      )
    ),
  ]);
}

module.exports = function transformer(code, babelConfig = {}, noreact) {
  const result = babel.transform(code, Object.assign({}, defaultBabelConfig, babelConfig));
  const codeAst = result.ast;

  let renderReturn = null;
  traverse(codeAst, {
    CallExpression: function (callPath) {
      const callPathNode = callPath.node;
      if (callPathNode.callee &&
        callPathNode.callee.object &&
        callPathNode.callee.object.name === 'ReactDOM' &&
        callPathNode.callee.property &&
        callPathNode.callee.property.name === 'render') {

        renderReturn = types.returnStatement(
          callPathNode.arguments[0]
        );

        callPath.remove();
      }
    },
  });

  const astProgramBody = codeAst.program.body;

  if (!noreact) {
    astProgramBody.unshift(requireGenerator('ReactDOM', 'react-dom'));
    astProgramBody.unshift(requireGenerator('React', 'react'));
  }
  // ReactDOM.render always at the last of preview method
  if (renderReturn) {
    astProgramBody.push(renderReturn);
  }

  const codeBlock = types.BlockStatement(astProgramBody);
  const previewFunction = types.functionDeclaration(
    types.Identifier('previewer'),
    [],
    codeBlock
  );

  return generator(types.program([previewFunction]), {}, code).code;
};
