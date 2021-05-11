/* eslint-disable no-unused-vars */
/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 17:25:18
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-11 16:06:54
 * @FilePath: /packages/services/services-personcard.ts
 */
import { FetchService } from './axios'
import { typing } from './typing'
export default class {
  public http: FetchService
  public constructor(http: FetchService) {
    this.http = http
  }
  /**
   * 根据employee_id获取用户消息信息, 人员卡片 发送消息按钮
   * @method
   */
  public async GetInfoByEmpId(data: any) {
    const result = await this.http.post(`/v1/private/user/getInfoByEmpId`, data)
    return result
  }
}
