import { log } from '@/util/logger';

export function handleError(req, res, next) {
  if (res.status === 500) {
    res.send('Api error');
  }

  next();
}

export function handleServerError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      log.error('Port requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.error('Port is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
