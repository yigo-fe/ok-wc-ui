/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-04-08 15:19:21
 * @LastEditors: 付静
 * @LastEditTime: 2021-08-16 15:05:14
 * @FilePath: /packages/ok-employee-select/hook-modal.ts
 */
import { debounce } from 'lodash'
import { computed, ref, watch } from 'vue'

import folder from '../assets/file-icon/icon_file-folder_colorful.svg'
import checked from '../assets/images/checked.svg'
import close from '../assets/images/closed.svg'
import search from '../assets/images/search.svg'
import { apiInit } from '../services/api'
export default function (props: any) {
  const api = apiInit()
  // multiple
  const multiple = computed(() => props.multiple)
  // 限定范围
  const range = computed(() => props.range)
  // 指定范围，本地搜索， 非远程
  const remote = computed(() => !props.range?.length)
  // 是否开启了组价架构保密：如果开启了，则不展示组织架构树，只能进行搜索
  const secrecy = computed(() => props.secrecy)
  // 人员信息集合
  const infoMapInner = computed(() => props.infoMap)
  // modal是否可见
  const visible = computed(() => props.visible)
  // modal 样式
  const modalZIndex = computed(() => props.modalZIndex)
  const getContainerModal = computed(() => props.getContainerModal)

  const closeIcon = close
  const searchIcon = search

  // 组件外部传入的初始value
  const propsValue = computed(() => {
    if (!props.inputValue) {
      return []
    } else {
      return Array.isArray(props.inputValue)
        ? props.inputValue
        : props.inputValue.split(',')
    }
  })

  // 保留弹窗内部临时value
  const tempSelected = ref<any>([])

  // 组织架构面包屑
  const breadcrumbList = ref<any[]>([])

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

  // 获取已选人员
  const selectedList = computed(() => {
    return tempSelected.value.map(v => infoMapInner.value[v]).filter(v => v)
  })

  // icon
  const deptIcon = folder
  const checkedIcon = checked

  const collectMap = (list: any) => {
    list.forEach((v: any) => {
      infoMapInner.value[v.employee_id] = v
    })
  }

  let rootDept: any = {}
  // 部门树获取根 节点
  const getDeptGetRootDept = async () => {
    // 处理自定义接口
    const result = props.getRootDept
      ? await props.getRootDept()
      : await api.default.GetRootDeptDeptPrivateV1POST({})
    if (result.code === '000000') {
      rootDept = result.data
      breadcrumbList.value.push(result.data)
    }
  }
  getDeptGetRootDept()

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
    // 处理自定义接口
    const result = props.getSubDept
      ? await props.getSubDept(department_id)
      : await api.default.SelectDeptListDeptPrivateV1POST({
          payload: {
            display_level: 1,
            parent_dept_id: department_id,
          },
        })

    if (result.code === '000000') {
      deptList.value = result.data
    }
  }

  //查询部门下的人员
  const searchEmployeeById = async () => {
    // 处理自定义接口
    const result = props.queryDeptUser
      ? await props.queryDeptUser(department_id.value, queryKey.value)
      : await api.default.SearchUserInfoUserPrivateV1POST({
          payload: {
            department_id: department_id.value,
            param: queryKey.value,
          },
        })
    if (result.code === '000000') {
      employeeList.value = result.data?.rows
      // 收集信息
      collectMap(employeeList.value)
      props.collect && props.collect(employeeList.value)
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
    // 处理自定义接口
    const result = props.queryDeptUser
      ? await props.remoteMethod(queryKey.value)
      : await api.default.SearchUserInfoUserPrivateV1POST({
          payload: {
            param: queryKey.value,
          },
        })
    if (result.code === '000000') {
      const data: any = result.data?.rows
      searchResultList.value = data

      // 收集信息
      collectMap(searchResultList.value)
      props.collect && props.collect(employeeList.value)
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

  // 点击面包屑的根节点
  const handleRootClick = () => {
    breadcrumbList.value = []
    department_id.value = rootDept?.department_id
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
      .map((v: string) => infoMapInner.value[v])
      .filter(v => v)
  }

  // 打开modal
  const handleOpenModal = () => {
    breadcrumbList.value = rootDept ? [rootDept] : []
    department_id.value = rootDept?.department_id
    queryKey.value = ''
    tempSelected.value = [...propsValue.value]
    // 初始化树左侧数据
    !remote.value ? getRangeList() : getDeptAndEmployee()
  }

  const cancelHandle = () => {
    props.close && props.close()
  }
  const okHandle = () => {
    props.change && props.change(tempSelected.value)
    props.close && props.close()
  }

  // 搜索框：判断是本地or远程搜索
  const searchEmployee = () => {
    if (!queryKey.value) return
    !remote.value ? filterRangeList() : searchEmployeeByKey()
  }

  const searchByKey = debounce(searchEmployee, 500)

  const clearSelected = () => {
    tempSelected.value = []
  }

  watch(
    () => visible.value,
    val => {
      val && handleOpenModal()
    },
    {
      immediate: true,
    }
  )

  return {
    range,
    secrecy,
    remote,
    deptIcon,
    checkedIcon,
    closeIcon,
    searchIcon,
    visible,
    deptList,
    employeeList,
    searchResultList,
    breadcrumbList,
    selectedList,
    queryKey,
    modalZIndex,
    getContainerModal,
    handleDeptClick,
    handleEmployeeSelect,
    cancelHandle,
    okHandle,
    setBreadcrumb,
    handleRootClick,
    cancelSelect,
    clearSelected,
    isSelected,
    searchByKey,
  }
}
