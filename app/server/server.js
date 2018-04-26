import express from 'express';
import graphQLRouter from '<api>';
import setupMiddlewares from './middlewares';

export default (config) => {
  const app = express();
  const globalMiddlewares = setupMiddlewares(config);

  app.use(globalMiddlewares);
  app.use(express.static(config.pathes.public));
  app.use('/api', graphQLRouter, (req, res) => {});

  return app;
};
