import merge from 'webpack-merge';
import { env as envConfig } from '<configs>';
import webpackBaseConfig from './webpack.config.base.babel';
import webpackDevConfig from './webpack.config.dev.babel';
import webpackProdConfig from './webpack.config.prod.babel';

const { env, ENVS } = envConfig;
let config = webpackBaseConfig; // eslint-disable-line import/no-mutable-exports

switch (env) {
  case ENVS.DEV:
    config = merge(webpackBaseConfig, webpackDevConfig);
    break;
  case ENVS.PROD:
    config = merge(webpackBaseConfig, webpackProdConfig);
    break;
  default:
    console.log('[WARN]: Environment for webpack config not matched'); // eslint-disable-line no-console
    break;
}

export default config;
