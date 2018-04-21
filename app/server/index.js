import logger from '<utils>/logger';
import serverFactory from './server';
import connectDB from './db';
import { formatError } from './graphql';

export const start = async (config) => {
  const logServerConfig = () => {
    logger.success('Server listening at: ', config.app.uri);
    logger.warn('Environment:', config.app.ENV);
    logger.info('---');
  };
  await connectDB(config);
  const graphqlServer = serverFactory(config);
  graphqlServer.start(
    {
      endpoint: '/graphql',
      playground: '/playground',
      subscriptions: '/graphql',
      port: config.app.port,
      debug: config.app.isDev,
      formatError
    },
    logServerConfig
  );
};
