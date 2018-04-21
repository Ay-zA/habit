import webpack from 'webpack';
import stats from './webpack.stats';

export default {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  stats
};
