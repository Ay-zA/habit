import http from 'http';
import logger from '<utils>/logger';
import appFactory from './server';
import connect from './db';

export const startServer = async (config) => {
  const { uri, port, dbConnectionURL } = config.app;

  await connect(dbConnectionURL);
  let currentApp = appFactory(config);
  const server = http.createServer(currentApp);
  server.listen(port, logServerConfig);

  if (module.hot) {
    module.hot.accept(['./server'], () => {
      server.removeListener('request', currentApp);
      currentApp = require('./server')(config);
      server.on('request', currentApp);
    });
  }

  function logServerConfig() {
    logger.success('Server listening at: ', uri);
    logger.warn('Environment:', config.env.env);
  }
};
