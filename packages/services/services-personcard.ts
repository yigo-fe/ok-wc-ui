/* eslint-disable no-unused-vars */
/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 17:25:18
 * @LastEditors: 付静
 * @LastEditTime: 2021-08-17 11:02:49
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
   * 获取员工信息
   * @method
   * @name #GetInfoByEmpIdUserPrivateV1POST
   * @param {} employeeQuery - employeeQuery
   */
  public async GetInfoByEmpIdUserPrivateV1POST(params: {
    payload?: typing.EmployeeQuery
  }): Promise<typing.PlainResult$Map$> {
    let path = ''
    path = '/v1/private/user/getInfoByEmpId'
    let body: any
    const queryParameters: any = {}

    if (params.payload !== undefined) {
      body = params.payload
    }

    const result: typing.PlainResult$Map$ = await this.http.request({
      method: 'POST',
      url: path,
      params: queryParameters,
      payload: body,
    })
    return result
  }
}
