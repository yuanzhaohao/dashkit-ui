module.exports = function(api) {
  const { BABEL_MODULE, NODE_ENV } = process.env;
  const useESModules = BABEL_MODULE !== 'commonjs' && NODE_ENV !== 'test';

  api && api.cache(false);

  const presets = [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: useESModules ? false : 'commonjs',
      },
    ],
    [
      '@babel/preset-react',
      {
        development: NODE_ENV === 'development',
      },
    ],
    '@babel/preset-typescript',
  ];
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: false,
        useESModules,
      },
    ],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-object-assign',
  ];

  return {
    presets,
    plugins,
  };
};
