import HTTPStatus from 'http-status';
import { app } from '~/configs';
import APIError from '@/utils/api-error';
import logger from '@/utils/logger';

export function logServerConfig(err) {
  if (err) logger.error(err);
  const url = `http://${app.host}:${app.port}`;

  logger.success('Server listening at: ', url);
  logger.warn('Environment:', app.ENV);
  logger.info('---');
}

export function logChange(path) {
  logger.info(`${path} has been changed.`);
}

export function logErrorService(err, req, res, next) {
  const error = new APIError(
    err.message || 'Internal Server Error!',
    err.status || HTTPStatus.INTERNAL_SERVER_ERROR
  );

  if (app.isDev) {
    logger.error(`Status: ${error.status}`, error);
  }

  const resError = {
    message: error.message
  };

  res.status(error.status).json(resError);

  return next();
}
