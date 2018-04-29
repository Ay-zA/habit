import yargs from 'yargs';
import userConfig from '~/app.config';

const arg = yargs.argv;

// eslint-disable-next-line
const isValidPort = port => !isNaN(parseInt(port, 10));

const { open: browser } = arg;

const dbConnectionURL = process.env.MONGO_URL || userConfig.server.dbConnectionURL;
const port = isValidPort(arg.port) ? arg.port : process.env.PORT || 3000;
const host = arg.host || process.env.HOST || '127.0.0.1';

export const appConfig = {
  browser,
  dbConnectionURL,
  port,
  host,
  get uri() {
    return `http://${host}:${port}`;
  },
};
