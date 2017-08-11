import opn from 'opn';
import webpack from 'webpack';
import webpackMW from 'webpack-dev-middleware';
import webpackHotMW from 'webpack-hot-middleware';
import { log, logServerConfig } from '@/util/logger';
import { app } from '~/configs';
import webpackConfig from '~/webpack.config.dev.babel';

export const compiler = webpack(webpackConfig);

export const webpackMiddleware = webpackMW(compiler, {
  quiet: true
});

export const webpackHotMiddleware = webpackHotMW(compiler, {
  log: () => {}
});

compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    log.info('Template has been changed reloading page');
    webpackHotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

webpackMiddleware.waitUntilValid(function() {
  logServerConfig();
  const url = app.uri;

  if (app.openBrowser && app.env === 'dev') {
    opn(url);
  }
});
