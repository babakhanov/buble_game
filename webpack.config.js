const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  context: __dirname,

  entry: {
    main: "./src/main",
  },

  output: {
    path: __dirname + '/docs/',
    publicPath: NODE_ENV == 'production' ? 'https://babakhanov.github.io/buble_metrics/' : '/',
    filename: '[name].js'
  },

  watch: NODE_ENV == 'development',

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015'],
      }
    },{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    },{
      test: /\.jade$/,
      loader: 'jade-loader'
    },{
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      loader: 'file-loader?name=[name]-[hash].[ext]'
    }]
  },

  plugins: [
    new ExtractTextPlugin("application.css"),
    new webpack.ProvidePlugin({
      "_": "underscore"
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.jade',
      inject: false,
    })
  ],

  devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : false,
}

if (NODE_ENV == 'production'){
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe:       true
      }
    })
  )
}

