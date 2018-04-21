import http from 'http';
import logger from '<utils>/logger';
import appFactory from './server';
import connectDB from './db';

export const start = async (config) => {
  await connectDB(config);
  let currentApp = appFactory(config);
  const server = http.createServer(currentApp);
  server.listen(config.app.port, logServerConfig);

  if (module.hot) {
    module.hot.accept(['./server', './graphql/index.js'], () => {
      server.removeListener('request', currentApp);
      currentApp = require('./server')(config);
      server.on('request', currentApp);
    });
  }

  function logServerConfig() {
    logger.success('Server listening at: ', config.app.uri);
    logger.warn('Environment:', config.app.ENV);
    logger.info('---');
  }
};
