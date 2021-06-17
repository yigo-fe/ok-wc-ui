/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-07 11:11:51
 * @LastEditors: 付静
 * @LastEditTime: 2021-06-17 15:14:31
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
            'designertoken=31fb3fa6-8cce-4d16-ac21-66d627b5ac07; egoToken=bc764888-993e-4d50-bf9e-bf05bab0842d; local=zh-CN; tenant_id=test',
        },
      },
    },
  },
})
