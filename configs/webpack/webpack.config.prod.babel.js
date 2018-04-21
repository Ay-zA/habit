import HtmlWebpackPlugin from 'html-webpack-plugin';
import { pathes } from '<configs>';

export default {
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: pathes.index,
      favicon: pathes.favicon,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ]
};
