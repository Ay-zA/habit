import dotenv from 'dotenv';
import yargs from 'yargs';
import appConfig from '~/app.config';

dotenv.config();
const arg = yargs.argv;

// eslint-disable-next-line no-shadow
const isValidPort = port => !isNaN(parseInt(port, 10));

const ENVS = {
  PROD: 'production',
  DEV: 'development'
};

const openBrowser = arg.open;
const verbose = arg.verbose;

const dbConnectionURL = process.env.MONGO_URL || appConfig.server.dbConnectionURL;
const port = isValidPort(arg.port) ? arg.port : process.env.PORT || 3000;
const host = arg.host || process.env.HOST || '127.0.0.1';
const env = process.env.NODE_ENV || ENVS.DEV;

const app = {
  ENVS,
  openBrowser,
  dbConnectionURL,
  wds: {
    host: appConfig.wds.host,
    port: appConfig.wds.port,
    uri: `http://${appConfig.wds.host}:${appConfig.wds.port}`
  },
  port,
  host,
  uri: `http://${host}:${port}`,
  env,
  isVerbose: verbose,
  isDev: env === ENVS.DEV,
  isProd: env === ENVS.PROD
};

export default app;
