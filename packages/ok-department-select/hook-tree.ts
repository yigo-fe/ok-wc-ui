/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-23 22:07:02
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-31 13:50:10
 * @FilePath: /packages/ok-department-select/hook-tree.ts
 */
import { debounce } from 'lodash'
import { computed, nextTick, ref } from 'vue'

import folder from '../assets/file-icon/icon_file-folder_colorful.svg'
import checked from '../assets/images/checked.svg'
import useBaseHandle from './hook-base'

export default function (props: any, context: any) {
  const {
    api,
    testVal,
    value,
    options,
    placeholder,
    isDisabled,
    multiple,
    closeIcon,
    searchIcon,
    borderless,
    isMouseenter,
    maxTagCount,
    displayLevel,
    departmentMap,
    mouseenter,
    mouseleave,
    searchDept,
    collectdepartmentMap,
    clearSelected,
    handleDelete,
    maxTagPlaceholder,
  } = useBaseHandle(props, context, 'tree')

  // icon
  const deptIcon = folder
  const checkedIcon = checked

  // 是否开启了组价架构保密：如果开启了，则不展示组织架构树，只能进行搜索
  const secrecy = computed(() => props.secrecy)
  // 保留弹窗内部临时value
  const tempSelected = ref<any>([])

  const treeData = ref<any>([])
  const expandedKeys = ref<any>([])
  const scopedSlots = {
    title: 'title',
  }
  // 搜索结果 - 人员列表
  const searchResultList = ref<any[]>([])
  // 已选人员信息集合
  const selectedList = computed(() =>
    tempSelected.value.map(v => departmentMap.value[v]).filter(v => v)
  )

  // 入口： 获取根目录
  const getRootTree = async () => {
    const result = await api.default.GetRootDeptDeptPrivateV1POST({})
    if (result.code === '000000') {
      const data: any = result.data
      data.scopedSlots = scopedSlots
      treeData.value = [data]
      expandedKeys.value = [data.department_id]

      collectdepartmentMap([data])
    }
  }

  // 懒加载获取数据
  const loadData = (treeNode: any) => {
    return new Promise((resolve: any) => {
      if (treeNode.dataRef.children) {
        resolve()
        return
      }
      api.default
        .SelectDeptListDeptPrivateV1POST({
          payload: {
            display_level: displayLevel.value,
            parent_dept_id: treeNode.dataRef.department_id,
          },
        })
        .then((res: any) => {
          if (res.code === '000000') {
            res.data.forEach((item: any) => {
              item.scopedSlots = scopedSlots
              item.isLeaf = !item.has_child
            })
            treeNode.dataRef.children = res.data
          }
          collectdepartmentMap(res.data)
          nextTick(() => {
            treeData.value = [...treeData.value]
            resolve()
          })
        })
    })
  }

  // 搜索loading
  const loading = ref(false)
  const queryKey = ref('')

  // 搜索
  const onFetch = async () => {
    if (!queryKey.value) return
    loading.value = true
    const result = await searchDept(queryKey.value)
    loading.value = false
    if (result.code === '000000') {
      const data: any = result.data
      data?.forEach((item: any) => {
        item.departmentId = item.department_id
        item.displayValue = item.display_value
      })
      searchResultList.value = data
      collectdepartmentMap(data)
    }
  }

  const searchByKey = debounce(onFetch, 500)

  // modal 展示与否
  const visible = ref(false)

  // 打开modal
  const handleOpenModal = (evt: any) => {
    if (isDisabled.value) return
    // 注意点击清除按钮 不能触发弹窗打开
    const path = evt.path || (evt.composedPath && evt.composedPath()) || []
    if (path?.[0]?.className === 'head-clear-icon') return
    visible.value = true

    queryKey.value = ''
    expandedKeys.value = []
    tempSelected.value = [...value.value]
    // 初始化树左侧数据
    getRootTree()
  }

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
  const handleSelect = (id: string) => {
    // 区分单选和多选
    isSelected(id)
      ? cancelSelect(id)
      : multiple.value
      ? tempSelected.value.push(id)
      : (tempSelected.value = [id])
  }

  const cancelHandle = () => {
    visible.value = false
  }
  const okHandle = () => {
    // 点击确定时， 更新value
    value.value = [...tempSelected.value]
    // 回显
    options.value = value.value.map(v => departmentMap.value[v])
    visible.value = false
  }

  return {
    testVal,
    isDisabled,
    placeholder,
    multiple,
    loading,
    maxTagCount,
    value,
    options,
    closeIcon,
    searchIcon,
    deptIcon,
    checkedIcon,
    borderless,
    visible,
    searchResultList,
    selectedList,
    isMouseenter,
    queryKey,
    searchByKey,
    treeData,
    expandedKeys,
    secrecy,
    mouseenter,
    mouseleave,
    clearSelected,
    handleDelete,
    maxTagPlaceholder,
    handleSelect,
    handleOpenModal,
    cancelHandle,
    okHandle,
    loadData,
    isSelected,
  }
}
