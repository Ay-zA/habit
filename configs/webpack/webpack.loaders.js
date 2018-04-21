import autoprefixer from 'autoprefixer';
import { pathes } from '<configs>';

const query = mimetype => ({ limit: 10000, mimetype });

export default [
  { test: /\.jsx?$/i, exclude: /node_modules/, use: ['babel-loader'] },
  { test: /\.(graphql|gql)$/i, exclude: /node_modules/, loader: 'graphql-tag/loader' },
  { test: /\.eot(\?v=\d+.\d+.\d+)?$/i, exclude: /node_modules/, loader: 'file-loader' },
  { test: /\.(jpe?g|png|gif|ico)$/i, exclude: /node_modules/, loader: 'file-loader' },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
    exclude: /node_modules/,
    loader: 'url-loader',
    query: query('application/font-woff')
  },
  {
    test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/i,
    exclude: /node_modules/,
    loader: 'url-loader',
    query: query('application/octet-stream')
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/i,
    exclude: /node_modules/,
    loader: 'url-loader',
    query: query('image/svg+xml')
  },
  {
    test: /(\.css|\.scss|\.sass)$/i,
    loaders: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [autoprefixer],
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [pathes.sassIncludePath],
          sourceMap: true
        }
      }
    ]
  }
];
