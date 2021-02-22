/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-18 16:33:37
 * @LastEditors: 付静
 * @LastEditTime: 2021-02-22 15:18:44
 * @FilePath: /webpack.prod.js
 */
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackBaseConf = require('./webpack.base.config.js')
module.exports = merge(webpackBaseConf, {
  mode: 'production',
  output: {
    filename: '[name].js',
    library: 'lib',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [],
  },

  plugins: [
    new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
    new webpack.DefinePlugin({
      ENV: JSON.stringify('production'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/common.css',
        },
      ],
    }),
    new ParallelUglifyPlugin({
      include: /packages/,
      uglifyJS: {
        output: {
          beautify: false,
          comments: false,
        },
        compress: {
          drop_console: false,
          collapse_vars: true,
          reduce_vars: true,
        },
      },
    }),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
})
