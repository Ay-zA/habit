import mongoose from 'mongoose';
import logger from '@/utils/logger';
import { app } from '~/configs';
import { handleConnectionClose } from '@/services/error-handler';

mongoose.Promise = global.Promise;

mongoose
  .connect(app.dbConnectionURL, { useMongoClient: true })
  .then(() => logger.success('Mongoose connected to: ', app.dbConnectionURL))
  .catch((err) => {
    logger.error("Mongoose can't connect to: ", app.dbConnectionURL);
    throw err;
  });

mongoose.connection.on('error', (err) => {
  logger.error('Mongoose default connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('Mongoose default connection disconnected');
});

process.on('SIGINT', handleConnectionClose);

export default mongoose;
