/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 17:25:18
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-23 21:56:13
 * @FilePath: /packages/services/services.ts
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

  /**
   * 根据employee_id 批量获取用户消息
   * @method
   */
  public async ListUserInfoByIds(data: any) {
    const result = await this.http.post(
      `/v1/private/user/listUserInfoByIds`,
      data
    )
    return result
  }

  /**
   * 根据关键字模糊搜索用户消息
   * @method
   */
  public async SearchUserInfo(data: any) {
    const result = await this.http.post(`/v1/private/user/searchUserInfo`, data)
    return result
  }

  /**
   * 根据dept_id 获取子部门
   * @method
   */
  public async SelectDeptList(data: any) {
    const result = await this.http.post(`/v1/private/dept/selectDeptList`, data)
    return result
  }

  /**
   * 根据dept_id 查询部门下所属人员
   * @method
   */
  public async SearchDeptUserInfo(data: any) {
    const result = await this.http.post(`/v1/private/user/searchUserInfo`, data)
    return result
  }

  /**
   * 文件删除
   * @method
   * @name #DelAttachmentPrivateV1GET
   * @param {string} fileId - fileId
   */
  public async DelAttachmentPrivateV1GET(params: {
    payload?: {}
    query?: {
      fileId?: string
    }
    path?: {}
  }): Promise<typing.PlainResult> {
    let path = ''
    path = '/v1/private/attachment/del'
    let body: any
    const queryParameters: any = {}

    if (params.query !== undefined && params.query['fileId'] !== undefined) {
      queryParameters['fileId'] = params.query['fileId']
    }

    const result: typing.PlainResult = await this.http.request({
      method: 'GET',
      url: path,
      params: queryParameters,
      payload: body,
    })
    return result
  }

  /**
   * 批量获取附件信息
   * @method
   */
  public async GetAttachmentListAttachmentPrivateV1POST(data: any) {
    const result = await this.http.post(
      `/v1/private/attachment/getAttachmentList`,
      data
    )
    return result
  }

  /**
   * 批量获取图片信息
   * @method
   */
  public async GetImageListAttachmentPrivateV1POST(data: any) {
    const result = await this.http.post(
      `/v1/private/attachment/getImageList`,
      data
    )
    return result
  }

  /**
   * 根据部门名模糊查询相关部门-限制5个
   * @method
   * @name #SearchDeptPrivateV1POST
   * @param {} paramBo - paramBo
   */
  public async SearchDeptPrivateV1POST(params: {
    payload?: typing.ParamBo
    query?: {}
    path?: {}
  }): Promise<typing.PlainResult> {
    let path = ''
    path = '/v1/private/dept/search'
    let body: any
    const queryParameters: any = {}

    if (params.payload !== undefined) {
      body = params.payload
    }

    const result: typing.PlainResult = await this.http.request({
      method: 'POST',
      url: path,
      params: queryParameters,
      payload: body,
    })
    return result
  }
}
