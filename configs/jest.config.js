const path = require('path');

module.exports = {
  verbose: false,
  rootDir: path.resolve(__dirname, '..'),
  testEnvironment: 'jest-environment-node',
  transform: {
    '\\.(gql|graphql)$': '<rootDir>/utils/graphql-jest-transform.js',
    '\\.jsx?$': 'babel-jest'
  },
  collectCoverageFrom: ['*.js'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  }
};
