/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 17:25:18
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-16 20:38:43
 * @FilePath: /packages/services/services.ts
 */
import { FetchService } from './axios'
/**
 *
 * @class Test
 * @param {(string)} [domainOrOptions] - The project domain.
 */
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
}
