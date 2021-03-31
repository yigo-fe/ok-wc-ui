/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-23 22:08:42
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-31 18:06:45
 * @FilePath: /packages/ok-department-select/hook-base.ts
 */
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
  // placeholder
  const placeholder = computed(() => props.placeholder)
  // disabled
  const isDisabled = computed(() => props.disabled)
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
  const departmentMap = ref({})
  // 已选部门信息列表
  const selectedList = computed(() => {
    return value.value.map(v => departmentMap.value[v]).filter(v => v)
  })

  // 收集部门信息， 避免频繁请求接口
  const collectdepartmentMap = (list: any) => {
    list.forEach((v: any) => {
      departmentMap.value[v.department_id] = v
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
        display_level: 1,
      },
    })
  }

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
      // departmentMap 中取值， 避免频繁请求接口数据
      exceedList.value = exceedIds
        .map(v => departmentMap.value[v])
        .filter(v => v)
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

  const isOpen = ref(false)
  const setOpen = (evt: any) => {
    // 兼容Safari
    const path = evt.path || (evt.composedPath && evt.composedPath()) || []
    if (path?.[0]?.className === 'head-clear-icon') return
    isOpen.value = true
  }
  const closeOpen = () => {
    isOpen.value = false
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
    context.emit('ichange', value.value)
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

  // init回显：部门id根据查询指定部门信息: 1. 默认值回显; 2. 收集
  let getDeptInfoByIds = async (ids: string[]) => {
    if (!ids?.length) options.value = []
    const result = await getDepartmentsByIds(ids)
    if (result.code === '000000') {
      const data: any = result.data
      options.value = data
      // 收集map
      collectdepartmentMap(options.value)
      // 处理溢出
      getExceed()
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
    context.emit('update', {
      value: val,
      options: selectedList.value,
    })
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

  // propsValue 变化时处理：
  const handlePropsValChange = () => {
    const val = propsValue.value
    if ((!val?.length && !value.value.length) || propsValEqulValue()) return
    // 更新初始值
    if (val?.length) {
      // 更新value；获取detail,回显信息; 注意处理单选
      value.value = multiple.value ? val : val.slice(0, 1)
      // 回显: 更新options
      getDeptInfoByIds(val)
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
    api,
    value,
    options,
    placeholder,
    isDisabled,
    multiple,
    displayLevel,
    closeIcon,
    searchIcon,
    borderless,
    isOpen,
    isMouseenter,
    maxTagCount,
    exceedList,
    departmentMap,
    getExceed,
    setOpen,
    closeOpen,
    mouseenter,
    mouseleave,
    searchDept,
    getDepartmentsByIds,
    collectdepartmentMap,
    clearSelected,
    handleDelete,
    maxTagPlaceholder,
  }
}
