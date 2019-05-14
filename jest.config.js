module.exports = {
  roots: ['<rootDir>/src'],
  verbose: true,
  setupFiles: ['<rootDir>/tests/jest.init.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js?$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/tests/__mocks__/styleMock.js',
    '^lodash-es$': 'lodash',
  },
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
      diagnostics: false,
    },
  },
};
