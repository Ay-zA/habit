import { Router } from 'express';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import compression from 'compression';
import expressJWT from 'express-jwt';
import { app as config, pathes } from '~/configs';
import morgan from './morgan.middleware';
import prettyError from './pretty-error.middleware';
import * as webpack from './webpack.middleware';

export const middlewares = new Router();

if (config.isDev) {
  prettyError.start();
  middlewares.use(morgan);
  middlewares.use(webpack.devMiddleware);
  middlewares.use(webpack.hotMiddleware);
}

if (config.isProd) {
  middlewares.use(helmet());
  middlewares.use(compression());
}

middlewares.use(favicon(pathes.favicon));
middlewares.use(expressJWT({
  credentialsRequired: false,
  secret: process.env.JWT_SECRET
}));

export { webpackHtml } from './webpack.middleware';
