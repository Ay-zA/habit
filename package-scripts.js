const { rimraf, crossEnv, series } = require('nps-utils');

module.exports = {
  scripts: {
    clean: {
      default: rimraf('dist')
    },
    dev: {
      default: {
        description: 'Start Development Evnironment',
        script: series.nps('clean', 'dev.server')
      },
      server: `${crossEnv('NODE_ENV=development')} nodemon --exec webpack -- --config ./configs/webpack/webpack.config.server.babel.js --mode development`
    },
    lint: 'eslint app --ext .jsx,.js',
    test: {
      default: `${crossEnv('NODE_ENV=test')} jest`,
      watch: series.nps('test --watch'),
      cover: series.nps('test --coverage')
    }
  }
};
