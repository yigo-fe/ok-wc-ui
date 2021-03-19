/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 17:25:18
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-19 18:40:55
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
   * @name #GetAttachmentListAttachmentPublicV1POST
   * @param {array} fileIdList - fileIdList
   * @param {string} sourceHost - sourceHost
   */
  public async GetAttachmentListAttachmentPublicV1POST(params: {
    payload?: {}
    query?: {
      fileIdList?: Array<string>
      sourceHost?: string
    }
    path?: {}
  }): Promise<typing.ListResult$AttachmentDto$> {
    let path = ''
    path = '/v1/public/attachment/getAttachmentList'
    let body: any
    const queryParameters: any = {}

    if (
      params.query !== undefined &&
      params.query['fileIdList'] !== undefined
    ) {
      queryParameters['fileIdList'] = params.query['fileIdList']
    }

    if (
      params.query !== undefined &&
      params.query['sourceHost'] !== undefined
    ) {
      queryParameters['sourceHost'] = params.query['sourceHost']
    }

    const result: typing.ListResult$AttachmentDto$ = await this.http.request({
      method: 'POST',
      url: path,
      params: queryParameters,
      payload: body,
    })
    return result
  }
  /**
   * 批量获取图片信息
   * @method
   * @name #GetImageListAttachmentPublicV1POST
   * @param {array} fileIdList - fileIdList
   * @param {string} sourceHost - sourceHost
   */
  public async GetImageListAttachmentPublicV1POST(params: {
    payload?: {}
    query?: {
      fileIdList?: Array<string>
      sourceHost?: string
    }
    path?: {}
  }): Promise<typing.ListResult$ImageDto$> {
    let path = ''
    path = '/v1/public/attachment/getImageList'
    let body: any
    const queryParameters: any = {}

    if (
      params.query !== undefined &&
      params.query['fileIdList'] !== undefined
    ) {
      queryParameters['fileIdList'] = params.query['fileIdList']
    }

    if (
      params.query !== undefined &&
      params.query['sourceHost'] !== undefined
    ) {
      queryParameters['sourceHost'] = params.query['sourceHost']
    }

    const result: typing.ListResult$ImageDto$ = await this.http.request({
      method: 'POST',
      url: path,
      params: queryParameters,
      payload: body,
    })
    return result
  }

  /**
   * 批量获取附件信息
   * @method
   * @name #GetAttachmentListAttachmentSpV1POST
   * @param {array} fileIdList - fileIdList
   * @param {string} sourceHost - sourceHost
   */
  public async GetAttachmentListAttachmentSpV1POST(params: {
    payload?: {}
    query?: {
      fileIdList?: Array<string>
      sourceHost?: string
    }
    path?: {}
  }): Promise<Array<typing.AttachmentDto>> {
    let path = ''
    path = '/v1/sp/attachment/getAttachmentList'
    let body: any
    const queryParameters: any = {}

    if (
      params.query !== undefined &&
      params.query['fileIdList'] !== undefined
    ) {
      queryParameters['fileIdList'] = params.query['fileIdList']
    }

    if (
      params.query !== undefined &&
      params.query['sourceHost'] !== undefined
    ) {
      queryParameters['sourceHost'] = params.query['sourceHost']
    }

    const result: Array<typing.AttachmentDto> = await this.http.request({
      method: 'POST',
      url: path,
      params: queryParameters,
      payload: body,
    })
    return result
  }
  /**
   * 批量获取图片信息
   * @method
   * @name #GetImageListAttachmentSpV1POST
   * @param {array} fileIdList - fileIdList
   * @param {string} sourceHost - sourceHost
   */
  public async GetImageListAttachmentSpV1POST(params: {
    payload?: {}
    query?: {
      fileIdList?: Array<string>
      sourceHost?: string
    }
    path?: {}
  }): Promise<Array<typing.ImageDto>> {
    let path = ''
    path = '/v1/sp/attachment/getImageList'
    let body: any
    const queryParameters: any = {}

    if (
      params.query !== undefined &&
      params.query['fileIdList'] !== undefined
    ) {
      queryParameters['fileIdList'] = params.query['fileIdList']
    }

    if (
      params.query !== undefined &&
      params.query['sourceHost'] !== undefined
    ) {
      queryParameters['sourceHost'] = params.query['sourceHost']
    }

    const result: Array<typing.ImageDto> = await this.http.request({
      method: 'POST',
      url: path,
      params: queryParameters,
      payload: body,
    })
    return result
  }
}
