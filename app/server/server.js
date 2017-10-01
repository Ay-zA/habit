import opn from 'opn';
import http from 'http';
import Express from 'express';
import Celebrate from 'celebrate';
import configMiddlewares, { webpack } from '@/middlewares';
import { logServerConfig, logError } from '@/util/logger';
import { handleServerError, handleError } from '@/util/handle-error';
import { app as config, pathes } from '~/configs';

import '@/db';
import '@/util/watcher';

const app = new Express();

configMiddlewares(app);
app.use('/api', (req, res, next) => {
  require('@/api')(req, res, next);
});

app.set('port', config.port);

app.use(Express.static(pathes.public));
app.use(Celebrate.errors());
app.use(logError);
app.use(handleError);

if (config.isDev) {
  app.get(/^(?!\/api).*/g, webpack.html);

  webpack.devMiddleware.waitUntilValid(() => {
    const url = config.uri;

    if (config.openBrowser) {
      opn(url);
    }
  });
}

const server = http.createServer(app);

server.on('error', handleServerError);
server.listen(config.port, logServerConfig);
