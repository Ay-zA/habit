import { app } from '~/configs';
import { graphqlServer } from './server';
import logger from './utils/logger';
import connectDB from './db';
import { formatError } from './graphql';

const logServerConfig = (config) => {
  logger.success('Server listening at: ', app.uri);
  logger.warn('Environment:', app.ENV);
  logger.info('---');
};

export const start = async () => {
  await connectDB();

  graphqlServer.start(
    {
      endpoint: '/graphql',
      playground: '/playground',
      subscriptions: '/graphql',
      port: app.port,
      debug: app.isDev,
      formatError
    },
    logServerConfig
  );
};
