import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import StartServerPlugin from 'start-server-webpack-plugin';
import Dotenv from 'dotenv-webpack';

module.exports = {
  devtool: 'sourcemap',
  entry: ['webpack/hot/poll?1000', './app'],
  watch: true,
  target: 'node',
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
  stats: {
    colors: true,
    assets: false,
    hash: false,
    version: false,
    timings: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: false,
    warnings: true,
    publicPath: false,
    chunkModules: false
  },
  plugins: [
    new StartServerPlugin('server.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv(),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    new webpack.DefinePlugin({
      'process.env': { BUILD_TARGET: JSON.stringify('server') }
    })
  ],
  output: { path: path.join(__dirname, 'dist'), filename: 'server.js' }
};
