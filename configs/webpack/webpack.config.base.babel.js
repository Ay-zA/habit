import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { pathes } from '<configs>';
import rules from './webpack.loaders';

export default {
  target: 'web',
  entry: ['webpack-hot-middleware/client?reload=false', pathes.clientMain],
  output: {
    path: pathes.build,
    publicPath: '/',
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].map'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [pathes.app, pathes.appNodeModules]
  },
  module: { rules },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new HtmlWebpackPlugin({
      template: pathes.index,
      filename: pathes.resolveBuild('index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
};
