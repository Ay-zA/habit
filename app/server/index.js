import http from 'http';
import connectDB from '@/db/mongoose';
import { handleServerError } from '@/services/error-handler';
import { logServerConfig } from '@/services/log.service';
import { app as config } from '~/configs';
import app from './server';

export const start = async () => {
  await connectDB();

  app.set('port', config.port);
  const server = http.createServer(app);

  server.on('error', handleServerError);
  server.on('listening', logServerConfig);
  server.listen(config.port);
};
