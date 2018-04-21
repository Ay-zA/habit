import clear from 'clear-it';
import config from '<configs>';
import logger from '<utils>/logger';
import { start } from './server';

process.on('unhandledRejection', (err) => {
  logger.error(err.stack);
});

clear();
start(config);
