import log from 'winston';
import { chError, chSuccess, chWarning, chProcessing } from './chalk';
import { app } from '~/configs';

log.cli();

export function logServerConfig(err) {
  if (err) log.error(err);
  const url = `http://${app.host}:${app.port}`;
  log.info(chSuccess('Server listening at: ') + url);
  log.info(chWarning('Environment:'), app.env);
  log.info(chSuccess('---'));
}

export function logChange(path) {
  log.info(`${path} has been changed.`);
}

export function logError(err, req, res, next) {
  log.error(err);
  next();
}

export { log, chError, chSuccess, chWarning, chProcessing };
