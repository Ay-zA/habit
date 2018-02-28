import path from 'path';
import webpack from 'webpack';
import webpackMW from 'webpack-dev-middleware';
import webpackHotMW from 'webpack-hot-middleware';
import { webpackDevConfig } from '~/configs/webpack';
import logger from '@/utils/logger';

const compiler = webpack(webpackDevConfig);

export const devMiddleware = webpackMW(compiler, { stats: webpackDevConfig.stats });
export const hotMiddleware = webpackHotMW(compiler, { log: false });

compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    logger.warn('Webpack: ', 'Template has been changed reloading page');
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

const filename = path.join(compiler.outputPath, 'index.html');

export const webpackHtml = (req, res, next) => {
  devMiddleware.waitUntilValid(() => {
    devMiddleware.fileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
};

devMiddleware.waitUntilValid(() => {
  logger.success('Webpack: ', 'Client compiled with webpack.');
});
