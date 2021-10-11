/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-04-08 18:41:06
 * @LastEditors: 付静
 * @LastEditTime: 2021-08-16 14:52:19
 * @FilePath: /packages/ok-department-select/hook-modal.ts
 */
import debounce from 'lodash/debounce'
import { computed, nextTick, ref, watch } from 'vue'

import folder from '../assets/file-icon/icon_file-folder_colorful.svg'
import checked from '../assets/images/checked.svg'
import close from '../assets/images/closed.svg'
import search from '../assets/images/search.svg'
import { apiInit } from '../services/api'

export default function (props: any) {
  const api = apiInit()

  // multiple
  const multiple = computed(() => props.multiple)

  // 是否开启了组价架构保密：如果开启了，则不展示组织架构树，只能进行搜索
  const secrecy = computed(() => props.secrecy)
  const displayLevel = computed(() => props.displayLevel)
  // 人员信息集合
  const infoMapInner = computed(() => props.infoMap)
  // modal是否可见
  const visible = computed(() => props.visible)

  // modal 样式
  const modalZIndex = computed(() => props.modalZIndex)
  const getContainerModal = computed(() => props.getContainerModal)

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

  // icon
  const deptIcon = folder
  const checkedIcon = checked
  const closeIcon = close
  const searchIcon = search

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
    tempSelected.value.map(v => infoMapInner.value[v]).filter(v => v)
  )

  // 入口： 获取根目录
  const getRootTree = async () => {
    const result = props.getRootDept
      ? await props.getRootDept()
      : await api.default.GetRootDeptDeptPrivateV1POST({})
    if (result.code === '000000') {
      const data: any = result.data
      data.scopedSlots = scopedSlots
      treeData.value = [data]
      expandedKeys.value = [data.department_id]
      // 收集信息
      props.collect && props.collect([data])
    }
  }

  // 处理懒加载请求数据
  const handleDataAfterRequest = (res: any, treeNode: any, resolve: any) => {
    if (res.code === '000000') {
      res.data.forEach((item: any) => {
        item.scopedSlots = scopedSlots
        item.isLeaf = !item.has_child
      })
      treeNode.dataRef.children = res.data
      expandedKeys.value.push(treeNode.dataRef.department_id)
    }
    // 收集信息
    props.collect && props.collect(res.data)
    nextTick(() => {
      treeData.value = [...treeData.value]
      resolve()
    })
  }

  // 树懒加载
  const handleLoadData = async (treeNode: any, resolve: any) => {
    const result = props.getSubDept
      ? await props.getSubDept(
          treeNode.dataRef.department_id,
          displayLevel.value
        )
      : await api.default.SelectDeptListDeptPrivateV1POST({
          payload: {
            display_level: displayLevel.value,
            parent_dept_id: treeNode.dataRef.department_id,
          },
        })

    handleDataAfterRequest(result, treeNode, resolve)
  }

  // 懒加载获取数据
  const loadData = async (treeNode: any) => {
    return new Promise((resolve: any) => {
      if (treeNode.dataRef.children) {
        resolve()
        return
      }

      handleLoadData(treeNode, resolve)
    })
  }

  // 搜索loading
  const loading = ref(false)
  const queryKey = ref('')

  // 搜索
  const onFetch = async () => {
    if (!queryKey.value) return
    loading.value = true
    const result = props.remoteMethod
      ? await props.remoteMethod(queryKey.value, displayLevel.value)
      : await api.default.SearchDeptPrivateV1POST({
          payload: {
            param: queryKey.value,
            display_level: displayLevel.value,
          },
        })
    loading.value = false
    if (result.code === '000000') {
      const data: any = result.data
      data?.forEach((item: any) => {
        item.departmentId = item.department_id
        item.displayValue = item.display_value
      })
      searchResultList.value = data
      // 收集信息
      props.collect && props.collect(data)
    }
  }

  const searchByKey = debounce(onFetch, 500)

  // 打开modal
  const handleOpenModal = () => {
    // 注意点击清除按钮 不能触发弹窗打开
    // const path = evt.path || (evt.composedPath && evt.composedPath()) || []
    // if (path?.[0]?.className === 'head-clear-icon') return

    queryKey.value = ''
    expandedKeys.value = []
    tempSelected.value = [...propsValue.value]
    // 初始化树左侧数据
    getRootTree()
  }

  // 取消选中
  const cancelSelect = (id: string) => {
    // 取消选中列表状态
    tempSelected.value = tempSelected.value.filter((v: string) => v !== id)
  }

  // 清空全部已选
  const clearSelected = () => {
    tempSelected.value = []
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
    props.close && props.close()
  }
  const okHandle = () => {
    props.change && props.change(tempSelected.value)
    props.close && props.close()
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
    multiple,
    loading,
    closeIcon,
    searchIcon,
    deptIcon,
    checkedIcon,
    visible,
    searchResultList,
    selectedList,
    queryKey,
    searchByKey,
    treeData,
    secrecy,
    expandedKeys,
    modalZIndex,
    getContainerModal,
    cancelSelect,
    clearSelected,
    handleSelect,
    handleOpenModal,
    cancelHandle,
    okHandle,
    loadData,
    isSelected,
  }
}
