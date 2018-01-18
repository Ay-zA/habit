import PrettyError from 'pretty-error';
import logger from '@/utils/logger';

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

export const prettyErrors = (err, req, res, next) => {
  logger.error(pe.render(err));
  return next();
};
