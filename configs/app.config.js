import yargs from 'yargs';
import appConfig from '~/app.config';

const arg = yargs.argv;

// eslint-disable-next-line
const isValidPort = port => !isNaN(parseInt(port, 10));

const ENVS = {
  PROD: 'production',
  DEV: 'development'
};

const { open: browser } = arg;

const dbConnectionURL = process.env.MONGO_URL || appConfig.server.dbConnectionURL;
const port = isValidPort(arg.port) ? arg.port : process.env.PORT || 3000;
const host = arg.host || process.env.HOST || '127.0.0.1';
const env = process.env.NODE_ENV || ENVS.DEV;

const app = {
  ENVS,
  browser,
  dbConnectionURL,
  port,
  host,
  env,
  get uri() {
    return `http://${host}:${port}`;
  },
  isDev: env === ENVS.DEV,
  isProd: env === ENVS.PROD
};

export default app;
