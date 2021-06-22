/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-07 11:11:51
 * @LastEditors: 付静
 * @LastEditTime: 2021-06-21 10:12:14
 * @FilePath: /webpack.dev.js
 */
const webpackBaseConf = require('./webpack.base.config.js')
const { merge } = require('webpack-merge')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
module.exports = merge(webpackBaseConf, {
  mode: 'development',
  entry: {
    index: [
      'webpack-dev-server/client?http://localhost:7000/',
      'webpack/hot/dev-server',
      './packages/index.ts',
    ],
  },

  plugins: [new HotModuleReplacementPlugin()],
  devServer: {
    contentBase: './public',
    port: 7000,
    open: true,
    publicPath: '',
    host: '172.16.1.53',
    proxy: {
      '/apps/api': {
        target: 'https://test.baiteda.com/',
        headers: {
          Cookie:
            'tenant_id=test; local=zh-CN; egoToken=89ffd9c4-58b8-4dc7-8f7d-d1fdae58a887',
        },
      },
    },
  },
})
