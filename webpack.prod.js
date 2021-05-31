/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-18 16:33:37
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-31 19:57:13
 * @FilePath: /webpack.prod.js
 */
const path = require('path')

const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// 删除以less文件为入口时多余生成的js文件
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')

const webpackBaseConf = require('./webpack.base.config.js')

module.exports = merge(webpackBaseConf, {
  mode: 'production',
  entry: {
    'ok-wc-ui.umd': './packages/index.ts',
    orange: './public/ok-theme/orange.less',
    blue: './public/ok-theme/blue.less',
    deepBlue: './public/ok-theme/deepBlue.less',
    green: './public/ok-theme/green.less',
    gray: './public/ok-theme/gray.less',
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [],
  },

  plugins: [
    new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
    new CopyPlugin({
      patterns: [
        {
          from: 'public/common.css',
        },
        {
          from: 'public/antd.min.css',
        },
      ],
    }),
    new FixStyleOnlyEntriesPlugin(),
  ],
})
