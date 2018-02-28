import serverFactory from './server';
import logger from './utils/logger';
import connectDB from './db';
import { formatError } from './graphql';

export const start = async (config) => {
  const logServerConfig = () => {
    logger.success('Server listening at: ', config.app.uri);
    logger.warn('Environment:', config.app.ENV);
    logger.info('---');
  };
  console.log('VUCK');
  await connectDB(config);
  console.log('VUCK2');
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
