// webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/images',
        to: './images'
      },
      {
        from: './src/assets',
        to: './assets'
      }
    ]),
    // new MiniCssExtractPlugin({
    //   filename: 'style.[contenthash].css'
    // }),
    new HtmlWebpackPlugin({
      inject: true,
      hash: false,
      template: './src/index.html',
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }]
      },
      {
        // test: /\.(png|svg|jpg|gif)$/,
        test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }, // handle the loader templates
      // handle font type
      {
        // test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/,
        // exclude: /node_modules/,
        // use: 'file-loader'

        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      // load html
      {
        test: /\.html$/,
        exclude: [/(config\/loader_templates|node_modules)/],
        use: 'raw-loader'
      },
      // load angular-busy loader templates
      {
        test: /config\/loader_templates\/*\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  }
};

// development only
// if (process.env.NODE_ENV === 'development') {
//   config.module.rules.unshift({
//     test: /\.css$/,
//     use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
//   });
//   config.module.rules.unshift({
//     test: /\.scss$/,
//     use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
//   });
// }
// production only
