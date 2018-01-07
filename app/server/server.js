import express from 'express';
import addMiddlewares, { webpack, addGraphQL, addErrorHandlers } from '@/middlewares';
import { app as config, pathes } from '~/configs';
import '@/utils/watcher';

const app = express();
addMiddlewares(app);
addGraphQL(app);

app.use(express.static(pathes.public));
app.use('/api', (req, res, next) => require('@/api')(req, res, next));

addErrorHandlers(app);

if (config.isDev) {
  app.get(/^(?!\/api).*/g, webpack.html);
}

export default app;
