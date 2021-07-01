/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-07 11:11:51
 * @LastEditors: 付静
 * @LastEditTime: 2021-07-01 10:02:39
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
            'egoToken=76f83036-ff78-4931-b6b7-d12766a0ebfd; designertoken=397b05b5-aa11-480e-92e7-2ad4b4dd971b; sa_jssdk_2015_test_baiteda_com=%7B%22distinct_id%22%3A%2217a5aa1aebaef1-01df0f85836803f-34657600-3686400-17a5aa1aebda9e%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%7D%7D; sensorsdata2015jssdkcross=%7B%22%24device_id%22%3A%2217a5aa1aebaef1-01df0f85836803f-34657600-3686400-17a5aa1aebda9e%22%7D; tenant_id=test; local=zh-CN',
        },
      },
    },
  },
})
