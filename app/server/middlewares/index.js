import helmet from 'helmet';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import compression from 'compression';
import bodyParser from 'body-parser';
import passport from 'passport';
import { app as config, pathes } from '~/configs';
import webpack from './webpack.middleware';

export default app => {
  if (app.isProd) {
    app.use(helmet());
    app.use(compression());
  }

  if (config.isDev) {
    app.use(morgan(':remote-addr - :remote-user | :method :url :status | :response-time ms'));
    app.use(webpack.devMiddleware);
    app.use(webpack.hotMiddleware);
  }

  app.use(favicon(pathes.appFavIcon));
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  app.use(passport.initialize());
};

export { default as webpack } from './webpack.middleware';
