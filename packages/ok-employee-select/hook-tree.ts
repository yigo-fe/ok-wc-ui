/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 17:57:52
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-23 16:16:06
 * @FilePath: /packages/ok-employee-select/hook-tree.ts
 */
import { debounce } from 'lodash'
import { computed, ref, watch } from 'vue'

// 根据部门查询部门下直属人员
// const URL =
//   'https://test.yigowork.com/ego_app/api/v1/private/user/searchUserInfo'
// import axios from 'axios'
import folder from '../assets/file-icon/icon_file-folder_colorful.svg'
import checked from '../assets/images/checked.svg'
import close from '../assets/images/closed.svg'
import search from '../assets/images/search.svg'
import { apiInit } from '../services/api'
import { isSameArray } from '../utils/index'

export default function (props: any, context: any) {
  const api = apiInit()
  // placeholder
  const placeholder = computed(() => props.placeholder)
  // disabled
  const isDisabled = computed(() => props.disabled)
  // multiple
  const multiple = computed(() => props.multiple)
  // 指定可选人员范围 (string[])：如果指定了可选范围， 则为本地模式， 不再进行远程搜索
  const range = computed(() => props.range)
  // 不展示展示边框
  const borderless = computed(() => props.borderless)
  // 是否开启了组价架构保密：如果开启了，则不展示组织架构树，只能进行搜索
  const secrecy = computed(() => props.secrecy)
  const noRemote = computed(() => props.range && props.range.length)
  // 组件外部传入的初始value
  const propsValue = computed(() => props.value)

  // 保存组件内部已选ids
  const value = ref<string[]>([])

  // modal 展示与否
  const visible = ref(false)

  // 组织架构面包屑
  const breadcrumbList = ref<any[]>([
    { department_id: '1', department_name: '根目录' },
  ])

  // 查询参数 - 当前部门id
  let department_id = ref('1')
  // 查询参数 - 人员搜索关键字
  let queryKey = ref('')
  // 组织架构树 - 部门列表
  const deptList = ref<string[]>([])
  // 组织架构树 - 人员列表
  const employeeList = ref<string[]>([])
  // 搜索结果 - 人员列表
  const searchResultList = ref<any[]>([])

  // 已选人员信息集合
  const selectedList = ref<any[]>([])

  // icon
  const deptIcon = folder
  const checkedIcon = checked
  const closeIcon = close
  const searchIcon = search

  // 已选人员回显
  const displaySelected = async () => {
    if (!value.value?.length) {
      selectedList.value = []
      return
    }
    // 根据已选人员ids, 获取items
    const result = await api.default.ListUserInfoByIds({
      user_ids: value.value,
    })
    if (result.code === '000000') {
      selectedList.value = result.data
    }
  }

  // 设置面包屑
  const setBreadcrumb = (department: any) => {
    let idx = breadcrumbList.value.findIndex(
      (v: any) => v.department_id === department.department_id
    )
    if (idx < 0) {
      breadcrumbList.value.push(department)
    } else {
      breadcrumbList.value = breadcrumbList.value.slice(0, idx + 1)

      searchDeptById(department.department_id)
      department_id.value = department.department_id
      searchEmployeeById()
    }
  }
  // 根据部门ID查询子集部门
  const searchDeptById = async (department_id: string = '1') => {
    const result = await api.default.SelectDeptList({
      display_level: 1,
      parent_dept_id: department_id,
    })

    if (result.code === '000000') {
      deptList.value = result.data
    }
  }

  //查询部门下的人员
  const searchEmployeeById = async () => {
    const result = await api.default.SearchDeptUserInfo({
      department_id: department_id.value,
      param: queryKey.value,
    })
    if (result.code === '000000') {
      const data: any = result.data?.rows
      employeeList.value = data
    }
  }

  // 查询部门和人员
  const getDeptAndEmployee = () => {
    searchDeptById()
    searchEmployeeById()
  }

  // 根据关键字查询人员信息
  const searchEmployeeByKey = async () => {
    if (!queryKey.value) return
    const result = await api.default.SearchUserInfo({ param: queryKey.value })
    if (result.code === '000000') {
      const data: any = result.data?.rows
      searchResultList.value = data
    }
  }

  // 有range时，本地过滤人员信息
  const filterRangeList = () => {
    searchResultList.value = employeeList.value.filter(
      (v: any) => v.employee_name.indexOf(queryKey.value) > -1
    )
  }

  // 点击部门：查询子部门， 及直属人员， 设置面包屑
  const handleDeptClick = (department: any) => {
    searchDeptById(department.department_id)
    department_id.value = department.department_id
    searchEmployeeById()
    setBreadcrumb(department)
  }

  const cancelSelect = (employee_id: string) => {
    // 取消选中列表状态
    selectedList.value = selectedList.value.filter(
      (v: any) => v.employee_id !== employee_id
    )
  }

  const clearSelected = () => {
    selectedList.value = []
  }

  const handleRootClick = () => {
    breadcrumbList.value = []
    department_id.value = '1'
    queryKey.value = ''
    getDeptAndEmployee()
  }

  // 判断是否已选中
  const isSelected = (employee_id: string) => {
    return (
      selectedList.value.findIndex((v: any) => v.employee_id === employee_id) >
      -1
    )
  }

  /**
   * 点击左侧人员：
   * 1. 如果已选，则本次是取消。如果未选过，则本次是选中， 放入selectedList中；
   * 2. 区分单选和多选
   */
  const handleEmployeeSelect = (employee: any) => {
    // 区分单选和多选
    isSelected(employee.employee_id)
      ? cancelSelect(employee.employee_id)
      : multiple.value
      ? selectedList.value.push(employee)
      : (selectedList.value = [employee])
  }

  // 查询指定范围人员
  const getRangeList = async () => {
    const result = await api.default.ListUserInfoByIds({
      user_ids: props.range,
    })
    if (result.code === '000000') {
      employeeList.value = result.data
    }
  }

  // 打开modal
  const handleOpenModal = (event: any) => {
    if (isDisabled.value) return
    // 注意点击清除按钮 不能触发弹窗打开
    if (event?.path[0]?.className === 'head-clear-icon') return
    visible.value = true

    breadcrumbList.value = [{ department_id: '1', department_name: '根目录' }]
    department_id.value = '1'
    queryKey.value = ''
    // 初始化树左侧数据
    noRemote.value ? getRangeList() : getDeptAndEmployee()
    // 回显已选值
    displaySelected()
  }

  const cancelHandle = () => {
    visible.value = false
  }
  const okHandle = () => {
    value.value = selectedList.value.map(v => v.employee_id)
    visible.value = false
  }

  // 搜索框：判断是本地or远程搜索
  const searchEmployee = () => {
    if (!queryKey.value) return
    noRemote.value ? filterRangeList() : searchEmployeeByKey()
  }

  const searchByKey = debounce(searchEmployee, 500)

  // 以下处理watch props.value 和value.value：

  // 避免首次value赋值时触发更新
  let isInitial = false

  // 判断propsValue 是否和value一样
  const propsValEqulValue = () => {
    const l1 = propsValue.value?.length || 0
    const l2 = value.value?.length || 0
    let same = false
    if (l1 === l2) {
      same = l1
        ? propsValue.value.every(v => value.value.indexOf(v) > -1)
        : true
    }
    return same
  }

  // watch value 变化： 调用update,更新组件外部值
  const handleValueChange = () => {
    const val = value.value
    if (isInitial) {
      isInitial = false
      return
    }
    context.emit('update', { value: val, options: selectedList.value })
  }
  watch(
    () => value.value,
    (val, oldVal) => {
      // 有时val和oldValue一样也会触发，具体原因待排查
      if (isSameArray(val, oldVal)) return
      handleValueChange()
    },
    {
      immediate: true,
      deep: true,
    }
  )

  // watch props.value, 赋值组件内部value
  const handlePropsValChange = () => {
    const val = propsValue.value
    if ((!val?.length && !value.value.length) || propsValEqulValue()) return
    // 更新初始值
    isInitial = true
    if (val?.length) {
      // 更新value；获取detail,回显信息
      value.value = val
    } else if (value.value?.length) {
      // 清除已选的值
      value.value = []
    }
  }
  watch(
    () => propsValue.value,
    (val, oldVal) => {
      // 有时val和oldValue一样也会触发，具体原因待排查
      if (isSameArray(val, oldVal)) return
      handlePropsValChange()
    },
    {
      immediate: true,
      deep: true,
    }
  )

  return {
    value,
    placeholder,
    isDisabled,
    multiple,
    range,
    secrecy,
    noRemote,
    deptIcon,
    checkedIcon,
    closeIcon,
    searchIcon,
    borderless,
    visible,
    deptList,
    employeeList,
    searchResultList,
    breadcrumbList,
    selectedList,
    queryKey,
    propsValue,
    handleDeptClick,
    handleEmployeeSelect,
    cancelHandle,
    okHandle,
    handleOpenModal,
    setBreadcrumb,
    handleRootClick,
    cancelSelect,
    clearSelected,
    isSelected,
    searchEmployeeById,
    searchByKey,
  }
}
