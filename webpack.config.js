'use strict'

// external deps
require('dotenv').config(`${__dirname}/.env`)

const {EnvironmentPlugin} = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')

// module constants
const production = process.env.NODE_ENV === 'production'

const developmentPlugins = [
  new HTMLPlugin({template: `${__dirname}/src/index.html`}),
  new EnvironmentPlugin ({ 
    NODE_ENV: 'development', 
    DEBUG: false,
    API_URL: 'http://localhost:3000',
  }),
]

const productionPlugins = developmentPlugins.concat([
  new CleanWebpackPlugin(),
  new UglifyPlugin(),
])

// interface
module.exports = {
  plugins: production ? productionPlugins : developmentPlugins,
  entry: `${__dirname}/src/main.js`,
  //devServer: {
    //hot: true,
    //inline: true,
    //hotOnly: true,
    //liveReload: true,
    //historyApiFallback: true,
  //},
  devtool: production ? undefined : 'cheap-module-eval-source-map',
  output: {
    path: `${__dirname}/build`,
    filename: `bundle-[hash].js`,
    publicPath: production ? undefined : process.env.CDN_URL,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
			{
        test: /\.(woff|woff2|ttf|eot).*/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'font/[name].[hash].[ext]',
            },
          },
        ],
      },
			{
        test: /\.icon.svg$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(jpg|jpeg|gif|png|tiff|svg)$/,
        exclude: /\.icon.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 60000,
              name: 'image/[name].[ext]',
            },
          },
        ],
      },
    ],
  }
}
