import Dotenv from 'dotenv-webpack';
import path from 'path';
import StartServerPlugin from 'start-server-webpack-plugin';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import stats from './webpack.stats';
import { pathes } from '../index';

export default {
  devtool: 'cheap-module-source-map',
  target: 'node',
  watch: true,
  entry: ['webpack/hot/poll?1000', './app'],
  output: {
    path: path.join(pathes.rootDirectory, 'dist', 'server'),
    filename: 'server.js'
  },
  node: {
    __filename: true,
    __dirname: true
  },
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  module: {
    rules: [
      { test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.graphql$/, loader: 'webpack-graphql-loader' }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env': { BUILD_TARGET: JSON.stringify('server') } }),
    new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false }),
    new Dotenv(),
    new StartServerPlugin('server.js')
  ],
  stats
};
