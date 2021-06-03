/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-18 16:33:37
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-31 19:55:39
 * @FilePath: /webpack.base.config.js
 */
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const pkg = require('./package.json')
module.exports = {
  entry: './packages/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.ts$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify('production'),
      'process.env.PACKAGE_VERSION': JSON.stringify(pkg.version),
      'process.env.TEST_IE': JSON.stringify(''),
    }),
    new MiniCssExtractPlugin({
      filename: './ok-theme/[name].css', //输出的文件名字
    }),
  ],
}
