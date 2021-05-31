/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 16:58:26
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-28 10:13:20
 * @FilePath: /packages/services/api.ts
 */

import { HttpClient } from './axios'
import Service from './services'
import ServicePersoncard from './services-personcard'

// 'https://test.yigowork.com/apps/api'
// https://test.baiteda.com

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://172.16.1.53:7000/apps/api'
    : window.okuiConfig?.apiPath
// 人员卡片接口地址
const personcardURL =
  process.env.NODE_ENV === 'development'
    ? 'http://172.16.1.53:7000/apps/api'
    : window.okuiConfig?.cardPath || window.okuiConfig?.apiPath

// 文件上传
const sourceHost =
  process.env.NODE_ENV === 'development'
    ? 'http://172.16.1.53:7000/'
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
