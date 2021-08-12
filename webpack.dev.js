/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-07 11:11:51
 * @LastEditors: 付静
 * @LastEditTime: 2021-08-11 09:48:02
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
            'sensorsdata2015jssdkcross=%7B%22%24device_id%22%3A%2217a5aa1aebaef1-01df0f85836803f-34657600-3686400-17a5aa1aebda9e%22%7D; sa_jssdk_2015_test_baiteda_com=%7B%22distinct_id%22%3A%22test_ZhangZiWei%22%2C%22first_id%22%3A%2217a5aa1aebaef1-01df0f85836803f-34657600-3686400-17a5aa1aebda9e%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%7D; tenant_id=test; egoToken=cc34af9e-c04c-4198-89ee-d98f3d77d4d2; designertoken=386dd47e-c8c6-48d0-9868-f85d46ffdb37; local=zh-CN',
        },
      },
    },
  },
})
