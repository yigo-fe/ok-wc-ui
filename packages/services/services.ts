/* eslint-disable no-unused-vars */
/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 17:25:18
 * @LastEditors: 付静
 * @LastEditTime: 2021-08-16 17:54:19
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
   * 根据员工编号批量员工信息
   * @method
   * @name #ListUserInfoByIdsUserPrivateV1POST
   * @param {} param - param
   */
  public async ListUserInfoByIdsUserPrivateV1POST(params: {
    payload?: typing.UserIdQuery
    query?: {}
    path?: {}
  }): Promise<typing.ListResult$UserDto$> {
    let path = ''
    path = '/v1/private/user/listUserInfoByIds'
    let body: any
    const queryParameters: any = {}

    if (params.payload !== undefined) {
      body = params.payload
    }

    const result: typing.ListResult$UserDto$ = await this.http.request({
      method: 'POST',
      url: path,
      params: queryParameters,
      payload: body,
    })
    return result
  }

  /**
   * 根据员工编号或姓名邮箱获取员工信息
   * @method
   * @name #SearchUserInfoUserPrivateV1POST
   * @param {} param - param
   */
  public async SearchUserInfoUserPrivateV1POST(params: {
    payload?: typing.EmployeeQuery
  }): Promise<typing.PageResult$UserDto$> {
    let path = ''
    path = '/v1/private/user/searchUserInfo'
    let body: any
    const queryParameters: any = {}

    if (params.payload !== undefined) {
      body = params.payload
    }

    const result: typing.PageResult$UserDto$ = await this.http.request({
      method: 'POST',
      url: path,
      params: queryParameters,
      payload: body,
    })
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
   * @name #GetAttachmentListAttachmentPrivateV1POST
   * @param {} queryBo - queryBo
   */
  public async GetAttachmentListAttachmentPrivateV1POST(params: {
    payload?: typing.FileQueryBo
  }): Promise<typing.ListResult$AttachmentDto$> {
    let path = ''
    path = '/v1/private/attachment/getAttachmentList'
    let body: any
    const queryParameters: any = {}

    if (params.payload !== undefined) {
      body = params.payload
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
   * @name #GetImageListAttachmentPrivateV1POST
   * @param {} queryBo - queryBo
   */
  public async GetImageListAttachmentPrivateV1POST(params: {
    payload?: typing.FileQueryBo
  }): Promise<typing.ListResult$ImageDto$> {
    let path = ''
    path = '/v1/private/attachment/getImageList'
    let body: any
    const queryParameters: any = {}

    if (params.payload !== undefined) {
      body = params.payload
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
   * 获取根部门
   * @method
   * @name #GetRootDeptDeptPrivateV1POST
   */
  public async GetRootDeptDeptPrivateV1POST(params: {
    payload?: {}
    query?: {}
    path?: {}
  }): Promise<typing.PlainResult$DepartmentDto$> {
    let path = ''
    path = '/v1/private/dept/getRootDept'
    let body: any
    const queryParameters: any = {}

    const result: typing.PlainResult$DepartmentDto$ = await this.http.request({
      method: 'POST',
      url: path,
      params: queryParameters,
      payload: body,
    })
    return result
  }

  /**
   * 部门列表
   * @method
   * @name #SelectDeptListDeptPrivateV1POST
   * @param {} param - param
   */
  public async SelectDeptListDeptPrivateV1POST(params: {
    payload?: typing.DeptParam
    query?: {}
    path?: {}
  }): Promise<typing.ListResult$DepartmentDto$> {
    let path = ''
    path = '/v1/private/dept/selectDeptList'
    let body: any
    const queryParameters: any = {}

    if (params.payload !== undefined) {
      body = params.payload
    }

    const result: typing.ListResult$DepartmentDto$ = await this.http.request({
      method: 'POST',
      url: path,
      params: queryParameters,
      payload: body,
    })
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
  }): Promise<typing.ListResult$DepartmentDto$> {
    let path = ''
    path = '/v1/private/dept/search'
    let body: any
    const queryParameters: any = {}

    if (params.payload !== undefined) {
      body = params.payload
    }

    const result: typing.ListResult$DepartmentDto$ = await this.http.request({
      method: 'POST',
      url: path,
      params: queryParameters,
      payload: body,
    })
    return result
  }

  /**
   * 根据部门ID查询部门
   * @method
   * @name #GetDepartmentsByIdsDeptPrivateV1POST
   * @param {} param - param
   */
  public async GetDepartmentsByIdsDeptPrivateV1POST(params: {
    payload?: typing.DeptIdsParam
    query?: {}
    path?: {}
  }): Promise<typing.ListResult$DepartmentDto$> {
    let path = ''
    path = '/v1/private/dept/getDepartmentsByIds'
    let body: any
    const queryParameters: any = {}

    if (params.payload !== undefined) {
      body = params.payload
    }

    const result: typing.ListResult$DepartmentDto$ = await this.http.request({
      method: 'POST',
      url: path,
      params: queryParameters,
      payload: body,
    })
    return result
  }
}
