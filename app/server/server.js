import path from 'path';
import morgan from 'morgan';
import Express from 'express';
import chokidar from 'chokidar';
import favicon from 'serve-favicon';
import compression from 'compression';
import bodyParser from 'body-parser';
import { app as appConfig, pathes } from '~/configs';
import { compiler, webpackMiddleware, webpackHotMiddleware } from '@/webpack.middleware';
import { log, logError } from '@/util/logger';
import { handleError } from '@/util/handle-error';

import '@/db';
const app = new Express();

const watcher = chokidar.watch(['./controllers', './models', './routes', './util'], {
  cwd: pathes.server
});

app.use(morgan(':remote-addr - :remote-user | :method :url :status | :response-time ms'));
app.use(Express.static(pathes.appPublic));

if (appConfig.isDev) {
  app.use(webpackMiddleware);
  app.use(webpackHotMiddleware);
}

app.use(compression());
app.use(favicon(pathes.appFavIcon));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/api', function(req, res, next) {
  require('@/routes/post.routes')(req, res, next);
});
app.use(logError);
app.use(handleError);

app.use('*', function(req, res, next) {
  let filename = path.join(compiler.outputPath, 'index.html');
  webpackMiddleware.waitUntilValid(() => {
    webpackMiddleware.fileSystem.readFile(filename, function(err, result) {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
});

watcher.on('change', _path => log.info(`${_path} has been changed.`));

watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log('Clearing /routes/ module cache from server');
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]routes[\/\\]/.test(id)) delete require.cache[id];
      if (/[\/\\]controllers[\/\\]/.test(id)) delete require.cache[id];
    });
  });
});

export default app;
