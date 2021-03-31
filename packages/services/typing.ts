declare namespace typing {
  interface PlainResult {
    /**
     * 状态码
     */
    code?: string

    /**
     * 返回结果对象
     */
    data?: {}

    /**
     * 返回结果描述
     */
    message?: string

    state?: 'SUCCESS' | 'FAIL' | 'ERROR'

    timestamp?: string
  }
  interface ListResult$AttachmentDto$ {
    /**
     * 状态码
     */
    code?: string

    /**
     * 数据
     */
    data?: Array<AttachmentDto>

    /**
     * 返回结果描述
     */
    message?: string

    state?: 'SUCCESS' | 'FAIL' | 'ERROR'

    timestamp?: string
  }
  interface ListResult$ImageDto$ {
    /**
     * 状态码
     */
    code?: string

    /**
     * 数据
     */
    data?: Array<ImageDto>

    /**
     * 返回结果描述
     */
    message?: string

    state?: 'SUCCESS' | 'FAIL' | 'ERROR'

    timestamp?: string
  }
  interface ImageDto {
    create_time?: number

    creator?: UserDto

    del_file_url?: string

    download_url?: string

    file_id?: string

    file_name?: string

    file_path?: string

    origin_url?: string

    tenant_id?: string

    thumb_url?: string
  }
  interface UserDto {
    avatar_big?: string

    avatar_small?: string

    /**
     * 员工头像地址
     */
    avatar_url?: string

    /**
     * 归属部门英文名称
     */
    belong_dept_en_name?: string

    belong_dept_id_list?: Array<string>

    /**
     * 归属部门ID
     */
    belong_dept_ids?: string

    /**
     * 归属部门名称
     */
    belong_dept_name?: string

    checked?: boolean

    /**
     * 部门英文名称
     */
    department_en_name?: string

    /**
     * 部门id
     */
    department_id?: string

    /**
     * 部门名称
     */
    department_name?: string

    /**
     * 员工邮箱
     */
    email?: string

    employee_card?: string

    /**
     * 英文名
     */
    employee_en_name?: string

    /**
     * 员工编号
     */
    employee_id?: string

    /**
     * 员工姓名
     */
    employee_name?: string

    external_user?: boolean

    /**
     * 性别
     */
    gender?: number

    /**
     * 直属领导编号
     */
    leader_eid?: string

    /**
     * 负责部门英文名称
     */
    manage_dept_en_name?: string

    /**
     * 负责部门ID
     */
    manage_dept_ids?: string

    /**
     * 负责部门名称
     */
    manage_dept_name?: string

    msg_relation_type?: string

    phone?: string

    /**
     * 职级
     */
    sequence?: string

    sort?: number

    telephone?: string

    tenant_id?: string

    /**
     * 是否停用
     */
    terminated?: boolean
  }
  interface AttachmentDto {
    create_time?: number

    creator?: UserDto

    del_file_url?: string

    download_url?: string

    file_id?: string

    file_name?: string

    file_path?: string

    online_view_url?: string

    support_online_view?: boolean

    tenant_id?: string
  }
  interface ParamBo {
    display_level?: number

    /**
     * 参数
     */
    param?: string
  }

  interface DeptIdsParam {
    /**
     * 部门ID集合
     */
    department_ids?: Array<string>

    /**
     * 显示层级
     */
    display_level?: number
  }

  interface DepartmentDto {
    department_en_name?: string

    department_id?: string

    department_ja_name?: string

    department_name?: string

    dept_id_path?: string

    dept_level_no?: string

    display_value?: string

    has_child?: boolean

    leader_eid?: string

    leader_name?: string

    order?: number

    parent_id?: string
  }

  interface ListResult$DepartmentDto$ {
    /**
     * 状态码
     */
    code?: string

    /**
     * 数据
     */
    data?: Array<DepartmentDto>

    /**
     * 返回结果描述
     */
    message?: string

    state?: 'SUCCESS' | 'FAIL' | 'ERROR'

    timestamp?: string
  }
  interface DeptParam {
    /**
     * 部门名称
     */
    department_name?: string

    /**
     * 显示层级
     */
    display_level?: number

    /**
     * 父部门id
     */
    parent_dept_id?: string
  }

  interface PlainResult$DepartmentDto$ {
    /**
     * 状态码
     */
    code?: string

    /**
     * 返回结果对象
     */
    data?: DepartmentDto

    /**
     * 返回结果描述
     */
    message?: string

    state?: 'SUCCESS' | 'FAIL' | 'ERROR'

    timestamp?: string
  }

  interface UserIdQuery {
    /**
     * 查询参数
     */
    user_ids?: Array<string>
  }

  interface UserDto {
    avatar_big?: string

    avatar_small?: string

    /**
     * 员工头像地址
     */
    avatar_url?: string

    /**
     * 归属部门英文名称
     */
    belong_dept_en_name?: string

    belong_dept_id_list?: Array<string>

    /**
     * 归属部门ID
     */
    belong_dept_ids?: string

    /**
     * 归属部门名称
     */
    belong_dept_name?: string

    checked?: boolean

    /**
     * 部门英文名称
     */
    department_en_name?: string

    /**
     * 部门id
     */
    department_id?: string

    /**
     * 部门名称
     */
    department_name?: string

    /**
     * 员工邮箱
     */
    email?: string

    employee_card?: string

    /**
     * 英文名
     */
    employee_en_name?: string

    /**
     * 员工编号
     */
    employee_id?: string

    /**
     * 员工姓名
     */
    employee_name?: string

    external_user?: boolean

    /**
     * 性别
     */
    gender?: number

    /**
     * 直属领导编号
     */
    leader_eid?: string

    /**
     * 负责部门英文名称
     */
    manage_dept_en_name?: string

    /**
     * 负责部门ID
     */
    manage_dept_ids?: string

    /**
     * 负责部门名称
     */
    manage_dept_name?: string

    msg_relation_type?: string

    phone?: string

    /**
     * 职级
     */
    sequence?: string

    sort?: number

    telephone?: string

    tenant_id?: string

    /**
     * 是否停用
     */
    terminated?: boolean
  }

  interface ListResult$UserDto$ {
    /**
     * 状态码
     */
    code?: string

    /**
     * 数据
     */
    data?: Array<UserDto>

    /**
     * 返回结果描述
     */
    message?: string

    state?: 'SUCCESS' | 'FAIL' | 'ERROR'

    timestamp?: string
  }
}

export type { typing }
