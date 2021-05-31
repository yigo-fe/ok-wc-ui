/* eslint-disable no-unused-vars */
/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 16:53:55
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-31 17:45:19
 * @FilePath: /packages/services/axios.ts
 */
import axios, { Method } from 'axios'
import qs from 'qs'

document.cookie = 'local=zh-CN'
document.cookie = 'tenant_id=test'
document.cookie = 'egoToken=cb4e3556-631e-4d54-8619-d97f77e93d80'
document.cookie = 'designertoken=c71bbce5-38ca-42c2-9243-62aca1a55842'
document.cookie = 'Hm_lpvt_6aa3bb5bcd9f8bea50e5944c4a3eb80c=1622166976'
document.cookie =
  'Hm_lvt_6aa3bb5bcd9f8bea50e5944c4a3eb80c=1622166695,1622166762,1622166958,1622166976'

interface FetchRequest {
  method: Method
  url: string
  params: any
  payload: any
}
interface FetchService {
  post(url: string, data?: any): Promise<any>
  get(url: string, param?: any): Promise<any>
  request(config: FetchRequest): Promise<any>
}

// axios 配置
function getInstance(serverPath: string) {
  const http = axios.create({
    baseURL: serverPath,
    timeout: 50000,
    withCredentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
  // request拦截器
  http.interceptors.request.use(
    (config: any) => {
      return config
    },
    (error: any) => {
      Promise.reject(error)
    }
  )
  // respone拦截器
  http.interceptors.response.use(
    (res: any) => {
      // 判断是否有权限
      if (res.data && res.data.code === '502106') {
        // window.location.replace('https://www.byteluck.com')
      }
      if (res.data instanceof Blob) {
        return res
      }
      // if(res.data && res.data.code === '000000'){
      //   return Promise.resolve(res.data)
      // }
      return Promise.resolve(res)
    },
    (error: any) => {
      if (error.response && `${error.response.status}` === '401') {
        // const url = 'https://www.byteluck.com'
        // window.location.replace(url)
      } else {
        return Promise.reject(error)
      }
    }
  )
  return http
}

class HttpClient implements FetchService {
  private $apiPath = ''
  constructor(apiPath: string) {
    this.$apiPath = apiPath
  }
  public async request(config: FetchRequest) {
    const result = await getInstance(this.$apiPath).request({
      url: config.url,
      method: config.method,
      params: config.params,
      data: config.payload,
    })
    return result.data
  }
  public async post(url: string, data?: any) {
    const result = await getInstance(this.$apiPath).post(url, data)
    return result.data
  }
  public async get(url: string, param?: any) {
    const ajax = getInstance(this.$apiPath)
    const result = await ajax({
      url,
      method: 'get',
      params: param,
      withCredentials: true,
      // headers: { 'Content-Type': 'text/plain' },
    })
    return result.data
  }
}

export { HttpClient }
export type { FetchService }
