/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-07 11:11:51
 * @LastEditors: 付静
 * @LastEditTime: 2021-08-24 13:49:52
 * @FilePath: /webpack.dev.js
 */
const webpackBaseConf = require('./webpack.base.config.js')
const { merge } = require('webpack-merge')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
module.exports = merge(webpackBaseConf, {
  mode: 'development',
  entry: {
    index: [
      'webpack-dev-server/client?http://172.16.1.190:7000/',
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
    host: '172.16.1.190',
    proxy: {
      '/apps/api': {
        target: 'https://test.baiteda.com/',
        headers: {
          Cookie:
            'sensorsdata2015jssdkcross=%7B%22%24device_id%22%3A%2217a84ced8d12e8-0d14940d342eea8-34647600-3686400-17a84ced8d2aad%22%7D; Hm_lvt_6aa3bb5bcd9f8bea50e5944c4a3eb80c=1626058409; adminToken=2e2b91ed-a351-4ad4-aef3-487cd71e10bb; designertoken=e9f0829b-d7df-4316-9b10-c77b416b9ef8; tenant_id=test; local=zh-CN; egoToken=8d6f3c37-8890-4b42-b554-5d31f3468a73; sa_jssdk_2015_test_baiteda_com=%7B%22distinct_id%22%3A%22test_QiYu%22%2C%22first_id%22%3A%2217a84ced8d12e8-0d14940d342eea8-34647600-3686400-17a84ced8d2aad%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%7D',
        },
      },
    },
  },
})
