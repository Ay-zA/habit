import http from 'http';
import express from 'express';
import { errors as celebrateErrors } from 'celebrate';
import configMiddlewares, { webpack } from '@/middlewares';
import { logServerConfig, logErrorService } from '@/services/log.service';
import { handleServerError } from '@/services/error-handler';
import { app as config, pathes } from '~/configs';
import api from '@/api';
import '@/db/mongoose';
import '@/utils/watcher';

const app = express();
app.set('port', config.port);

configMiddlewares(app);
app.use('/api', (req, res, next) => {
  api(req, res, next);
  // require('@/api')(req, res, next);
});

app.use(express.static(pathes.public));
app.use(celebrateErrors());
app.use(logErrorService);

if (config.isDev) {
  app.get(/^(?!\/api).*/g, webpack.html);
}

const server = http.createServer(app);

server.on('error', handleServerError);
server.on('listening', logServerConfig);
server.listen(config.port);

export default app;
