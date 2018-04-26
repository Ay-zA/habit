import mongoose from 'mongoose';
import logger from '<utils>/logger';

mongoose.Promise = global.Promise;

const handleConnectionClose = () => {
  mongoose.connection.close(() => {
    logger.warn('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
};

const connect = async (dbConnectionURL) => {
  try {
    await mongoose.connect(dbConnectionURL);
    logger.success('Mongoose connected to: ', dbConnectionURL);

    mongoose.connection.on('error', (err) => {
      logger.error('Mongoose default connection error: ', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('Mongoose default connection disconnected');
    });

    process.on('SIGINT', handleConnectionClose);
  } catch (err) {
    logger.error("Mongoose can't connect to: ", dbConnectionURL);
    logger.error(err);
  }
};

export default connect;
