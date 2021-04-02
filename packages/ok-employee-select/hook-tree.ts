/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 17:57:52
 * @LastEditors: 付静
 * @LastEditTime: 2021-04-01 15:51:21
 * @FilePath: /packages/ok-employee-select/hook-tree.ts
 */
import { debounce } from 'lodash'
import { computed, ref } from 'vue'

import folder from '../assets/file-icon/icon_file-folder_colorful.svg'
import checked from '../assets/images/checked.svg'
import useBaseHandle from './hook-base'
export default function (props: any, context: any) {
  const {
    testVal,
    api,
    value,
    options,
    placeholder,
    disabled,
    multiple,
    range,
    remote,
    closeIcon,
    searchIcon,
    borderless,
    isMouseenter,
    maxTagCount,
    infoMap,
    mouseenter,
    mouseleave,
    searchUser,
    collectMap,
    clearSelected,
    handleDelete,
    maxTagPlaceholder,
  } = useBaseHandle(props, context)

  // 是否开启了组价架构保密：如果开启了，则不展示组织架构树，只能进行搜索
  const secrecy = computed(() => props.secrecy)

  // modal 展示与否
  const visible = ref(false)

  // 保留弹窗内部临时value
  const tempSelected = ref<any>([])

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
  const employeeList = ref<any>([])
  // 搜索结果 - 人员列表
  const searchResultList = ref<any[]>([])

  // 已选人员信息集合
  const selectedList = computed(() =>
    tempSelected.value.map(v => infoMap.value[v]).filter(v => v)
  )

  // icon
  const deptIcon = folder
  const checkedIcon = checked

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
      employeeList.value = result.data?.rows
      // 收集信息
      collectMap(data)
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
    const result = await searchUser(queryKey.value)
    if (result.code === '000000') {
      const data: any = result.data?.rows
      searchResultList.value = data
      // 收集信息
      collectMap(data)
    }
  }

  // 有range时，本地过滤人员信息
  const filterRangeList = () => {
    searchResultList.value = employeeList.value.filter((v: any) => {
      const email = v?.email?.split('@')[0].toLowerCase()
      return (
        v.employee_name.indexOf(queryKey.value) > -1 ||
        v.employee_id?.toLowerCase().indexOf(queryKey.value?.toLowerCase()) >
          -1 ||
        email?.indexOf(queryKey.value) > -1
      )
    })
  }

  // 点击部门：查询子部门， 及直属人员， 设置面包屑
  const handleDeptClick = (department: any) => {
    searchDeptById(department.department_id)
    department_id.value = department.department_id
    searchEmployeeById()
    setBreadcrumb(department)
  }

  const handleRootClick = () => {
    breadcrumbList.value = []
    department_id.value = '1'
    queryKey.value = ''
    getDeptAndEmployee()
  }

  // 弹窗内部取消选中
  const cancelSelect = (id: string) => {
    // 取消选中列表状态
    tempSelected.value = tempSelected.value.filter((v: string) => v !== id)
  }

  // 判断是否已选中
  const isSelected = (id: string) => {
    return tempSelected.value.includes(id)
  }

  /**
   * 点击左侧人员：
   * 1. 如果已选，则本次是取消。如果未选过，则本次是选中， 放入selectedList中；
   * 2. 区分单选和多选
   */
  const handleEmployeeSelect = (id: string) => {
    // 区分单选和多选
    isSelected(id)
      ? cancelSelect(id)
      : multiple.value
      ? tempSelected.value.push(id)
      : (tempSelected.value = [id])
  }

  // 非远程模式下，获取指定范围人员信息
  const getRangeList = async () => {
    employeeList.value = range.value
      .map((v: string) => infoMap.value[v])
      .filter(v => v)
  }

  // 打开modal
  const handleOpenModal = (evt: any) => {
    if (disabled.value) return
    // 注意点击清除按钮 不能触发弹窗打开
    const path = evt.path || (evt.composedPath && evt.composedPath()) || []
    if (path?.[0]?.className === 'head-clear-icon') return
    visible.value = true

    breadcrumbList.value = [{ department_id: '1', department_name: '根目录' }]
    department_id.value = '1'
    queryKey.value = ''
    tempSelected.value = [...value.value]
    // 初始化树左侧数据
    !remote.value ? getRangeList() : getDeptAndEmployee()
    // // 回显已选值
    // displaySelected()
  }

  const cancelHandle = () => {
    visible.value = false
  }
  const okHandle = () => {
    // 点击确定时， 更新value
    value.value = [...tempSelected.value]
    // 回显
    options.value = value.value.map(v => infoMap.value[v])
    visible.value = false
  }

  // 搜索框：判断是本地or远程搜索
  const searchEmployee = () => {
    if (!queryKey.value) return
    !remote.value ? filterRangeList() : searchEmployeeByKey()
  }

  const searchByKey = debounce(searchEmployee, 500)

  return {
    testVal,
    value,
    options,
    placeholder,
    disabled,
    multiple,
    range,
    secrecy,
    remote,
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
    isMouseenter,
    maxTagCount,
    handleDelete,
    maxTagPlaceholder,
    mouseenter,
    mouseleave,
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
