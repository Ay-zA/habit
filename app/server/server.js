import express from 'express';
import addMiddlewares, { webpack, addErrorHandlers } from '@/middlewares';
import { app as config, pathes } from '~/configs';
import '@/utils/watcher';
import { graphqlServer } from '@/graphql';

const app = express();
addMiddlewares(app);
app.use(graphqlServer);

app.use(express.static(pathes.public));
app.use('/api', (req, res, next) => require('@/api')(req, res, next));

addErrorHandlers(app);

if (config.isDev) {
  app.get(/^(?!\/api).*/g, webpack.html);
}

export default app;
