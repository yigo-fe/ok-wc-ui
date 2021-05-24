/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-07 11:11:51
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-24 10:06:41
 * @FilePath: /webpack.dev.js
 */
const webpack = require('webpack')
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

  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development'),
      'process.env.TEST_IE': JSON.stringify(''),
    }),
    new HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './public',
    port: 7000,
    open: true,
    publicPath: '',
    // host: '172.20.10.10',
    // proxy: {
    //   'http://172.20.10.10:7000/apps/api/v1/private': {
    //     target: 'https://test.baiteda.com/',
    //     headers: {
    //       Cookie:
    //         'local=zh-CN; tenant_id=test; egoToken=6607c858-7ff4-4e76-a7cd-4b79d153e155; designertoken=fa8687c3-00dd-443e-8777-8697e9f12b67',
    //     },
    //   },
    // },
  },
})
