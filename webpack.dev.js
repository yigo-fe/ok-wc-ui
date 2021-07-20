/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-07 11:11:51
 * @LastEditors: 付静
 * @LastEditTime: 2021-07-20 10:38:12
 * @FilePath: /webpack.dev.js
 */
const webpackBaseConf = require('./webpack.base.config.js')
const { merge } = require('webpack-merge')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
module.exports = merge(webpackBaseConf, {
  mode: 'development',
  entry: {
    index: [
      'webpack-dev-server/client?http://172.16.1.53:7000/',
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
            'designertoken=e51ad78d-b1a5-447a-835b-83130f439bd8; tenant_id=test; egoToken=b464eef2-426d-493b-b29e-444f5b6d21cb; local=zh-CN',
        },
      },
    },
  },
})
