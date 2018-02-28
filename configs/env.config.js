const ENVS = {
  PROD: 'production',
  DEV: 'development'
};
const env = process.env.NODE_ENV || ENVS.DEV;
const isDev = env === ENVS.DEV;
const isProd = env === ENVS.PROD;

export const envConfig = {
  env,
  isDev,
  isProd,
  ENVS
};
