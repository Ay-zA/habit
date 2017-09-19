import webpack from 'webpack';
import webpackMW from 'webpack-dev-middleware';
import webpackHotMW from 'webpack-hot-middleware';
import webpackConfig from '~/webpack.config.dev.babel';
import { log } from '@/util/logger';
import path from 'path';

const compiler = webpack(webpackConfig);

const devMiddleware = webpackMW(compiler, { quiet: true });

const hotMiddleware = webpackHotMW(compiler, {
  log: () => {}
});

compiler.plugin('compilation', function(compilation) {
  compilation
    .plugin('html-webpack-plugin-after-emit', function(data, cb) {
      log.info('Template has been changed reloading page');
      hotMiddleware.publish({ action: 'reload' });
      cb();
    });
});

const html = function(req, res, next) {
  let filename = path.join(compiler.outputPath, 'index.html');
  devMiddleware.waitUntilValid(() => {
    devMiddleware
      .fileSystem
      .readFile(filename, function(err, result) {
        if (err) {
          return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
      });
  });
};

export default {
  compiler,
  devMiddleware,
  hotMiddleware,
  html
};
