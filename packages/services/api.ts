/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 16:58:26
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-23 17:34:42
 * @FilePath: /packages/services/api.ts
 */

import { HttpClient } from './axios'
import Service from './services'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    // ok-wc-ui 配置
    okuiConfig: {
      env: 'PRD'
      apiPath: string
      sourceHost: string
      basePath: string
    }
  }
}

// console.log('window', window)

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://check.baiteda.com/apps/api'
    : window.okuiConfig.apiPath

// 文件上传
const sourceHost =
  process.env.NODE_ENV === 'development'
    ? 'https://check.baiteda.com/'
    : window.okuiConfig.sourceHost

// console.log(baseURL, sourceHost)

export function apiInit() {
  const httpClient = new HttpClient(baseURL)
  const serviceAuto = new Service(httpClient)

  return {
    default: serviceAuto,
  }
}

export { baseURL, sourceHost }
