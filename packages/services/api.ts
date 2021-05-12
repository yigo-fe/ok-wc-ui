/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 16:58:26
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-12 17:10:48
 * @FilePath: /packages/services/api.ts
 */

import { HttpClient } from './axios'
import Service from './services'
import ServicePersoncard from './services-personcard'

// 'https://test.yigowork.com/apps/api'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://test.baiteda.com/apps/api'
    : window.okuiConfig?.apiPath
// 人员卡片接口地址
const personcardURL =
  process.env.NODE_ENV === 'development'
    ? 'https://test.baiteda.com/apps/api'
    : window.okuiConfig?.cardPath || window.okuiConfig?.apiPath

// 文件上传
const sourceHost =
  process.env.NODE_ENV === 'development'
    ? 'https://test.baiteda.com/'
    : window.okuiConfig?.sourceHost

// console.log(baseURL, sourceHost)

export function apiInit() {
  const httpClient = new HttpClient(baseURL)
  const serviceAuto = new Service(httpClient)

  return {
    default: serviceAuto,
  }
}

export function apiInitPersoncard() {
  const httpClient = new HttpClient(personcardURL)
  const serviceAuto = new ServicePersoncard(httpClient)

  return {
    default: serviceAuto,
  }
}

export { baseURL, sourceHost }
