import log from 'winston';
import { app } from '~/configs';
import { chError, chSuccess, chWarning, chProcessing } from './chalk';

log.cli();

export function logServerConfig(err) {
  if (err) log.error(err);
  const url = `http://${app.host}:${app.port}`;
  log.info(chSuccess('Server listening at: ') + url);
  log.info(chWarning('Environment:'), app.env);
  log.info(chSuccess('---\n'));
}

export function logChange(path) {
  log.info(`${path} has been changed.`);
}

export function logError(error, req, res, next) {
  log.error(error);
  next(error);
}

export { log, chError, chSuccess, chWarning, chProcessing };
