import log from 'winston';
import { chError, chSuccess, chWarning, chProcessing } from './chalk'; // eslint-disable-line no-unused-vars
import { app } from '~/configs';

log.cli();

export function logServerConfig(err) {
  if (err) log.error(err);
  const url = `http://${app.host}:${app.port}`;

  log.info(chWarning('Environment:'), app.env);
  log.info(chSuccess('Server listening at: ') + url);
}

export function logError(err, req, res, next) {
  log.error(err.stack);
  next(err);
}

export { log };
