const ENVS = {
  PROD: 'production',
  DEV: 'development'
};
const env = process.env.NODE_ENV || ENVS.DEV;
const isDev = ENVS.DEV.includes(env);
const isProd = ENVS.PROD.includes(env);

export const envConfig = {
  env,
  isDev,
  isProd,
  ENVS
};
