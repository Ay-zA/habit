import * as bodyParser from 'body-parser-graphql';
import compression from 'compression';
import { Router } from 'express';
import expressJWT from 'express-jwt';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import morgan from './morgan.middleware';
import prettyError from './pretty-error.middleware';

export default (config) => {
  const middlewares = new Router();

  if (config.env.isDev) {
    prettyError.start();
    middlewares.use(morgan);

    if (!process.env.NO_CLIENT) {
      const webpack = require('./webpack.middleware');
      middlewares.use(webpack.devMiddleware);
      middlewares.use(webpack.hotMiddleware);
    }
  }

  if (config.env.isProd) {
    middlewares.use(helmet());
    middlewares.use(compression());
  }

  middlewares.use(bodyParser.graphql());
  middlewares.use(favicon(config.pathes.favicon));
  middlewares.use(expressJWT({
    credentialsRequired: false,
    secret: process.env.JWT_SECRET
  }));

  return middlewares;
};
