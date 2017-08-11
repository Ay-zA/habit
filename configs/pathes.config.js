const app = require('~/app.config');

import path from 'path';
import fs from 'fs';

// eslint-disable-next-line no-sync
const rootDirectory = fs.realpathSync(process.cwd());
const resolveRoot = relativePath => path.resolve(rootDirectory, relativePath);

const appDirectory = resolveRoot(app.root);
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const clientDirectory = resolveApp(app.client.dir);
const resolveClient = relativePath => path.resolve(clientDirectory, relativePath);

const serverDirectory = resolveApp(app.server.dir);
const resolveServer = relativePath => path.resolve(serverDirectory, relativePath);

const publicDirectory = resolveApp(app.publicDir);
const resolvePublic = relativePath => path.resolve(publicDirectory, relativePath);

const buildDirectory = resolveRoot(app.outDir);

const pathes = {
  config: __dirname,
  appNodeModules: resolveRoot('node_modules'),
  resolveBuild: relativePath => path.resolve(buildDirectory, relativePath),
  appBuild: buildDirectory,
  app: appDirectory,
  appPublic: publicDirectory,
  appFavIcon: resolvePublic('favicon.ico'),
  server: serverDirectory,
  serverMain: resolveServer(app.server.main),
  client: resolveApp(app.client.dir),
  clientHtml: resolveClient(app.client.index),
  clientMain: resolveClient(app.client.main),
  clientRoutes: resolveClient('routes'),
  clientAssets: resolveClient('assets'),
  clientRedux: resolveClient('$redux'),
  clientComponents: resolveClient('components'),
  clientContainers: resolveClient('containers'),
  clientIncludePath: resolveClient('scss')
};

export default pathes;
