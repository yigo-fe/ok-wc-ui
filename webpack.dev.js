/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-07 11:11:51
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-31 17:36:29
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
      'http://172.16.1.53:7000/apps/api/v1/private': {
        target: 'https://test.baiteda.com/',
        headers: {
          Cookie:
            'tenant_id=test; local=zh-CN; designertoken=c71bbce5-38ca-42c2-9243-62aca1a55842; Hm_lvt_6aa3bb5bcd9f8bea50e5944c4a3eb80c=1622166762,1622166958,1622166976,1622426404; Hm_lpvt_6aa3bb5bcd9f8bea50e5944c4a3eb80c=1622426404; egoToken=2c892849-3840-4783-b5f0-9200bc6665e7',
        },
      },
    },
  },
})
