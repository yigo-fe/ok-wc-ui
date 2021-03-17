/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 17:57:52
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-17 16:39:35
 * @FilePath: /packages/ok-employee-select/hook-tree.ts
 */
import { debounce } from 'lodash'
import { effect } from 'ok-lit'
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

export default function (props: any, context: any) {
  const api = apiInit()
  const placeholder = computed(() => props.placeholder)
  const isDisabled = computed(() => props.disabled)
  const multiple = computed(() => props.multiple)
  const range = computed(() => props.range)
  const secrecy = computed(() => props.secrecy)
  const noRemote = computed(() => props.range && props.range.length)
  const propsValue = computed(() => props.value)
  const value = ref<string[]>([])

  const deptIcon = folder
  const checkedIcon = checked
  const closeIcon = close
  const searchIcon = search
  const visible = ref(false)
  const isSearch = ref(false)

  let department_id = ref('1')
  let param = ref('')

  const searchOptionsList = ref<any[]>([])
  const deptList = ref<string[]>([])
  const employeeList = ref<string[]>([])
  const breadcrumbList = ref<any[]>([])
  const selectedList = ref<any[]>([])

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
      param: param.value,
    })
    if (result.code === '000000') {
      const data: any = result.data?.rows
      employeeList.value = data
    }

    // axios
    //   .post(URL, {
    //     department_id: department_id.value,
    //     param: param.value,
    //   })
    //   .then(res => {
    //     const resData = res.data
    //     if (resData.code === '000000') {
    //       employeeList.value = resData.data.rows
    //     }
    //   })
  }

  const getDeptAndEmployee = () => {
    searchDeptById()
    searchEmployeeById()
  }

  const searchEmployeeByKey = async () => {
    if (!param.value) return
    const result = await api.default.SearchUserInfo({ param: param.value })
    if (result.code === '000000') {
      const data: any = result.data?.rows
      searchOptionsList.value = data
    }
  }

  const filterRangeList = () => {
    searchOptionsList.value = employeeList.value.filter(
      (v: any) => v.employee_name.indexOf(param.value) > -1
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
    // 取消左侧树的选中状态
  }

  const clearSelected = () => {
    selectedList.value = []
  }

  const handleRootClick = () => {
    breadcrumbList.value = []
    department_id.value = '1'
    param.value = ''
    getDeptAndEmployee()
  }

  const isSelected = (employee_id: string) => {
    return (
      selectedList.value.findIndex((v: any) => v.employee_id === employee_id) >
      -1
    )
  }

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
    // 注意点击清除按钮 不能触发弹窗打开
    if (event?.path[0]?.className === 'head-clear-icon') return
    visible.value = true

    breadcrumbList.value = []
    department_id.value = '1'
    param.value = ''
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

  const searchEmployee = () => {
    noRemote.value ? filterRangeList() : searchEmployeeByKey()
  }

  const searchByKey = debounce(searchEmployee, 500)

  watch(param, () => {
    isSearch.value = Boolean(param.value)
    if (param.value) {
      noRemote.value ? filterRangeList() : getDeptAndEmployee()
    }
  })

  // watch(value, val => {
  //   context.emit('update', val)
  // })

  effect(() => {
    const val = propsValue.value
    if (val?.length) {
      value.value = typeof val === 'string' ? [val] : val
    } else {
      value.value = []
    }
  })

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
    visible,
    deptList,
    employeeList,
    searchOptionsList,
    breadcrumbList,
    selectedList,
    isSearch,
    param,
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
