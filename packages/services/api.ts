/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 16:58:26
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-15 20:37:49
 * @FilePath: /packages/services/api.ts
 */

import { HttpClient } from './axios'
import Service from './services'

declare global {
  interface Window {
    // ok-wc-ui 配置
    okuiConfig: {
      env: 'PRD'
      apiPath: string
      basePath: string
    }
  }
}

// console.log('window', window)

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://test.yigowork.com/apps/api'
    : window.okuiConfig.apiPath

export function apiInit() {
  const httpClient = new HttpClient(baseURL)
  const serviceAuto = new Service(httpClient)

  return {
    default: serviceAuto,
  }
}
