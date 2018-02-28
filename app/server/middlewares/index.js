import { Router } from 'express';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import compression from 'compression';
import expressJWT from 'express-jwt';
import morgan from './morgan.middleware';
import prettyError from './pretty-error.middleware';
import * as webpack from './webpack.middleware';

export default (config) => {
  const middlewares = new Router();

  if (config.env.isDev) {
    prettyError.start();
    middlewares.use(morgan);
    middlewares.use(webpack.devMiddleware);
    middlewares.use(webpack.hotMiddleware);
  }

  if (config.env.isProd) {
    middlewares.use(helmet());
    middlewares.use(compression());
  }

  middlewares.use(favicon(config.path.favicon));
  middlewares.use(expressJWT({
    credentialsRequired: false,
    secret: process.env.JWT_SECRET
  }));

  return middlewares;
};

export { webpackHtml } from './webpack.middleware';
