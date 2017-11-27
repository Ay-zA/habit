import logger from '@/utils/logger';
import mongoose from 'mongoose';

export function handleServerError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      logger.error('Port requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error('Port is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

export function handleConnectionClose() {
  mongoose.connection.close(() => {
    logger.warn('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
}
