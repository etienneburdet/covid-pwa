const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'ODS Minimal template',
      template: 'public/index.html'
    }),
    new InjectManifest({
      swSrc: './src/sw.js',
      swDest: './sw.js'
    }),
    new CopyWebpackPlugin(
      [{ from: 'src/img', to: 'img/' },
        'src/manifest.webmanifest'],
      { ignore: ['.DS_Store'] }
    )
  ],
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    jQuery: 'jquery',
    angular: 'angular',
    ngSanitize: 'angular-sanitize',
    'ods-widgets': 'ods-widgets'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
}
