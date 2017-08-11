import mongoose from 'mongoose';
import { app } from '~/configs';
import { log } from '@/util/logger';
import { chError, chSuccess } from '@/util/chalk';

mongoose.Promise = global.Promise;

mongoose
  .connect(app.dbConnectionURL, { useMongoClient: true })
  .then(() => log.info(chSuccess('Mongoose connected to: ') + app.dbConnectionURL))
  .catch((err) => {
    log.error(chError('Mongoose throw error on connect to: ') + app.dbConnectionURL);
    throw err;
  });
