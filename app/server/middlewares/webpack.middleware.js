import webpack from 'webpack';
import webpackMW from 'webpack-dev-middleware';
import webpackHotMW from 'webpack-hot-middleware';
import webpackDevConfig from '<configs>/webpack';
import logger from '<utils>/logger';

const compiler = webpack(webpackDevConfig);

export const devMiddleware = webpackMW(compiler, {
  stats: webpackDevConfig.stats,
  logLevel: 'warn'
});

devMiddleware.waitUntilValid(() => {
  logger.success('Webpack: ', 'Client compiled with webpack.');
});

export const hotMiddleware = webpackHotMW(compiler, { log: false });
