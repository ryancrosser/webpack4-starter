const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

common.plugins.unshift(new CleanWebpackPlugin('dist'));

module.exports = merge(common, {
  mode: 'production',
  plugins: [new ExtractTextPlugin('style.css')],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      }
    ]
  }
});
