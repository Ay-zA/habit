import http from 'http';
import express from 'express';
import celebrate from 'celebrate';
import configMiddlewares, { webpack } from '@/middlewares';
import { logServerConfig, logErrorService } from '@/services/log.service';
import { handleServerError } from '@/services/error-handler';
import { app as config, pathes } from '~/configs';

import '@/db/mongoose';
import '@/utils/watcher';

const app = express();
app.set('port', config.port);

configMiddlewares(app);
app.use('/api', (req, res, next) => {
  require('@/api')(req, res, next);
});

app.use(express.static(pathes.public));
app.use(celebrate.errors());
app.use(logErrorService);

if (config.isDev) {
  app.get(/^(?!\/api).*/g, webpack.html);
}

const server = http.createServer(app);

server.on('error', handleServerError);
server.on('listening', logServerConfig);
server.listen(config.port);

export default app;
