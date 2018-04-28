import config from '<configs>';
import logger from '<utils>/logger';
import clear from '<utils>/clear-console';
import { startServer } from './server';

process.on('unhandledRejection', (err) => {
  logger.error(err.stack);
});

startServer(config);
