/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-04-08 20:15:04
 * @LastEditors: 付静
 * @LastEditTime: 2021-04-08 21:24:15
 * @FilePath: /packages/ok-department-select/hook.ts
 */
import { debounce } from 'lodash'
import { effect } from 'ok-lit'
import { computed, h, nextTick, ref, watch } from 'vue'

import close from '../assets/images/closed.svg'
import search from '../assets/images/search.svg'
import { apiInit } from '../services/api'
import { isSameArray } from '../utils/index'
export default function (props: any, context: any) {
  const testVal = ref([])
  effect(() => {
    testVal.value = props.value
  })
  const api = apiInit()
  // 模式： tree / select
  const mode = computed(() => props.mode)
  // placeholder
  const placeholder = computed(() => props.placeholder)
  // disabled
  const disabled = computed(() => props.disabled)
  // multiple
  const multiple = computed(() => props.multiple)
  // 显示层级
  const displayLevel = computed(() => props.level)
  // 无边框
  const borderless = computed(() => props.borderless)

  // 最多展示的tag数量
  const maxTagCount = ref(1)
  // 溢出列表（more list）
  const exceedList = ref(<any>[])
  // 弹窗是否可见
  const visible = ref(false)

  // 组件外部传入的初始value
  const propsValue = computed(() => {
    if (!props.value) {
      return []
    } else {
      return Array.isArray(props.value) ? props.value : [props.value]
    }
  })

  const closeIcon = close
  const searchIcon = search

  // 保存组件内部已选ids
  const value = ref<string[]>([])

  // 下拉选择列表
  const options = ref<any>([])

  // 部门id和detial的map
  const infoMap = ref({})
  // 已选部门信息列表
  const selectedList = computed(() => {
    return value.value.map(v => infoMap.value[v]).filter(v => v)
  })

  // 收集部门信息， 避免频繁请求接口
  const collectMap = (list: any) => {
    list.forEach((v: any) => {
      infoMap.value[v.department_id] = v
    })
  }

  // 根据部门ID， 查询部门信息
  const getDepartmentsByIds = async (ids: string[]) => {
    return await api.default.GetDepartmentsByIdsDeptPrivateV1POST({
      payload: {
        department_ids: ids,
        display_level: displayLevel.value,
      },
    })
  }

  // 搜索
  const searchDept = async (query: string) => {
    return await api.default.SearchDeptPrivateV1POST({
      payload: {
        param: query,
        display_level: displayLevel.value,
      },
    })
  }

  // 搜索loading
  const loading = ref(false)

  // 搜索
  const onFetch = async (query: string) => {
    if (!query) return
    loading.value = true
    const result = await searchDept(query)
    loading.value = false
    if (result.code === '000000') {
      const data: any = result.data
      data?.forEach((item: any) => {
        item.departmentId = item.department_id
        item.displayValue = item.display_value
      })
      options.value = data
      collectMap(data)
    }
  }

  const searchByKey = debounce(onFetch, 500)

  // 处理溢出部门
  const getExceed = async () => {
    if (!maxTagCount.value) {
      exceedList.value.length && (exceedList.value = [])
      return
    } else {
      const exceedIds = value.value.slice(maxTagCount.value)

      if (!exceedIds.length) {
        // 如果之前有exceedList, 则清空
        if (exceedList.value.length) {
          exceedList.value = []
        }
        return
      }
      // infoMap 中取值， 避免频繁请求接口数据
      exceedList.value = exceedIds.map(v => infoMap.value[v]).filter(v => v)
    }
  }
  // 处理最多能展示多少个tag
  const maxTagCountComput = () => {
    const el = context.$refs.showEmployeeSelect as HTMLElement
    const elWith = el?.offsetWidth
    if (!elWith) return

    maxTagCount.value = elWith > 185 ? Math.floor((elWith - 75) / 108) : 1
    // 首次计算溢出部门
    !exceedList.value.length && getExceed()
  }

  nextTick(() => {
    setTimeout(() => {
      maxTagCountComput()
    }, 500)
  })

  // 打开下拉框
  const isOpen = ref(false)
  const setOpen = () => {
    isOpen.value = true
  }
  const closeOpen = () => {
    isOpen.value = false
  }

  // 打开modal
  const handleOpenModal = () => {
    visible.value = true
  }
  const handleCloseModal = () => {
    visible.value = false
  }

  const handleInputClick = (evt: any) => {
    if (disabled.value) return
    // 注意点击清除按钮 不能触发弹窗打开
    const path = evt.path || (evt.composedPath && evt.composedPath()) || []
    if (path?.[0]?.className === 'head-clear-icon') return
    mode.value === 'tree' ? handleOpenModal() : setOpen()
  }

  // 弹窗点击确定时，更新value
  const handleModalChange = (tempSelected: string) => {
    // 点击确定时， 更新value
    value.value = [...tempSelected]
    // 回显
    options.value = value.value.map(v => infoMap.value[v])
  }

  const isMouseenter = ref(false)
  const mouseenter = () => {
    isMouseenter.value = true
  }
  const mouseleave = () => {
    isMouseenter.value = false
  }

  // 清除， 删除全部
  const clearSelected = () => {
    value.value = []
  }

  // 删除单个部门
  const handleDelete = (department_id: string) => {
    value.value = value.value.filter(v => v !== department_id)
  }

  const exceedDelete = (e: CustomEvent) => {
    handleDelete(e.detail)
  }

  const maxTagPlaceholder = () => {
    return h('ok-department-more', {
      exceedList: exceedList.value,
      onDelete: exceedDelete,
    })
  }

  // 远程模式下, 如果未选中， 清除options缓存
  const dropdownVisibleChange = open => {
    if (!open) return
    if (!value.value.length) {
      options.value = []
    }
  }

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

  // 组件内部value变化时处理：1. 触发组件update，同步外部数据; 2. 计算溢出标签，展示'更多'组件
  const handleValueChange = () => {
    const val = value.value
    // 更新组件外部value
    props.update && props.update(val, selectedList.value)
    // value 变化， 计算溢出人员
    getExceed()
  }

  // 监听value变化， 处理溢出items
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

  // init回显：部门id根据查询指定部门信息: 1. 默认值回显; 2. 收集
  let initDisplay = async (ids: string[]) => {
    if (!ids?.length) options.value = []
    const result = await getDepartmentsByIds(ids)
    if (result.code === '000000') {
      const data: any = result.data
      options.value = data
      // 收集map
      collectMap(options.value)
      // 处理溢出
      getExceed()
      // 更新value；获取detail,回显信息; 注意处理单选
      value.value = multiple.value ? ids : ids.slice(0, 1)
    }
  }

  // propsValue 变化时处理：
  const handlePropsValChange = () => {
    const val = propsValue.value
    if ((!val?.length && !value.value.length) || propsValEqulValue()) return
    // 更新初始值
    if (val?.length) {
      // 回显: 更新options
      initDisplay(val)
    } else if (value.value?.length) {
      // 清除已选的值
      value.value = []
    }
  }

  // 监听外部出入值propsValue, 赋值value
  watch(
    () => propsValue.value,
    (val, oldVal) => {
      // console.log('watch - propsValue.value', val, oldVal)
      // 有时val和oldValue一样也会触发，具体原因待排查
      if (isSameArray(val, oldVal)) return
      handlePropsValChange()
    },
    {
      immediate: true,
    }
  )

  // 处理多选变单选时value
  // effect(() => {
  //   const val = multiple.value
  //   if (!val && value.value?.length > 1) {
  //     value.value = value.value.slice(0, 1)
  //   }
  // })

  watch(
    () => multiple.value,
    val => {
      if (!val && value.value?.length > 1) {
        value.value = value.value.slice(0, 1)
      }
    },
    {
      immediate: true,
    }
  )

  return {
    testVal,
    value,
    options,
    placeholder,
    disabled,
    multiple,
    displayLevel,
    closeIcon,
    searchIcon,
    borderless,
    isOpen,
    isMouseenter,
    maxTagCount,
    exceedList,
    infoMap,
    visible,
    loading,
    mode,
    getExceed,
    setOpen,
    closeOpen,
    mouseenter,
    mouseleave,
    searchDept,
    getDepartmentsByIds,
    collectMap,
    clearSelected,
    handleDelete,
    maxTagPlaceholder,
    handleOpenModal,
    handleCloseModal,
    handleInputClick,
    dropdownVisibleChange,
    searchByKey,
    handleModalChange,
  }
}