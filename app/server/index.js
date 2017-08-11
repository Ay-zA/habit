import http from 'http';
import app from './server';
import { app as appConfig } from '~/configs';

app.set('port', appConfig.port);
const server = http.createServer(app);

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${appConfig.port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${appConfig.port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.listen(appConfig.port);
