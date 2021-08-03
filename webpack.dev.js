/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-07 11:11:51
 * @LastEditors: 付静
 * @LastEditTime: 2021-08-03 20:32:10
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
            'designertoken=ed55e9c0-dae2-4d81-a362-5e3b5322a91c; tenant_id=test; egoToken=1859d970-413d-4804-a3f6-0a1d27dd3e08; local=zh-CN;',
        },
      },
    },
  },
})
