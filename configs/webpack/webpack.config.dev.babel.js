import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import config from '~/configs';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development')
};

export default {
  devtool: '#eval-source-map',
  target: 'web',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=false',
    config.path.clientMain
  ],
  output: {
    path: config.path.build,
    publicPath: '/',
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].map'
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new HtmlWebpackPlugin({
      template: config.path.index,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: config.path.resolveBuild('index.html'),
      inject: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-[hash].js',
      minChunks(mod) {
        const { context } = mod;
        return context && context.indexOf('node_modules') >= 0;
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['react-hot-loader/webpack', 'babel-loader']
      },
      { test: /\.(graphql|gql)$/, exclude: /node_modules/, loader: 'graphql-tag/loader' },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        query: { limit: 10000, mimetype: 'application/font-woff' }
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader',
        query: { limit: 10000, mimetype: 'application/octet-stream' }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: { limit: 10000, mimetype: 'image/svg+xml' }
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        loader: 'file-loader',
        query: { limit: 10000, name: config.path.resolveBuild('assets/img/[name].[hash:7].[ext]') }
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [autoprefixer]
            }
          },
          {
            loader: 'sass-loader',
            options: { includePaths: [config.path.sassIncludePath], sourceMap: true }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [config.path.app, config.path.appNodeModules]
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
  }
};
