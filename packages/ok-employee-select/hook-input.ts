/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-03 21:17:47
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-17 16:45:30
 * @FilePath: /packages/ok-employee-select/hook-input.ts
 */

import { debounce } from 'lodash'
import { effect } from 'ok-lit'
import { computed, nextTick, ref, watch } from 'vue'

import close from '../assets/images/closed.svg'
import search from '../assets/images/search.svg'
import { apiInit } from '../services/api'
export default function (props: any, context: any) {
  const api = apiInit()
  // 下拉选择列表
  const options = ref([])
  // 取巧，控制dropdown的展开和收起
  const isOpen = ref(false)
  // 是否有范围限制
  const isRange = ref(false)
  // 搜索loading
  const loading = ref(false)
  // 最多展示的tag数量
  const maxTagCount = ref(0)
  // 溢出列表（more list）
  const exceedList = ref(<any>[])
  // 人员id和detial的map
  // const employeeMap = {}

  const closeIcon = close
  const searchIcon = search

  const propsValue = computed(() => props.value)
  const placeholder = computed(() => props.placeholder)
  const isDisabled = computed(() => props.disabled)
  const multiple = computed(() => props.multiple)
  const noRemote = computed(() => props.range && props.range.length)

  // 已选人员信息列表
  // const selectedList = computed(() => {
  //   return value.value.map(v => employeeMap[v]).filter(v => v)
  // })

  const value = ref<string[]>([])
  value.value = propsValue.value || []

  // 收集人员信息， 避免频繁请求接口
  // const collectEmployeeMap = (list: any) => {
  //   list.forEach((v: any) => {
  //     employeeMap[v.employee_id] = v
  //   })
  // }

  // 人员搜索
  const onFetch = async (query: string) => {
    if (noRemote.value) return
    if (!query) return
    loading.value = true
    const result = await api.default.SearchUserInfo({ param: query })
    loading.value = false
    if (result.code === '000000') {
      const data: any = result.data?.rows
      options.value = data
      // collectEmployeeMap(options.value)
    }
  }

  const searchByKey = debounce(onFetch, 500)

  // 处理最多能展示多少个tag
  const maxTagCountComput = () => {
    const el = context.$refs.showEmployeeSelectInput as HTMLElement
    const elWith = el.offsetWidth

    if (elWith && elWith > 116) {
      maxTagCount.value = Math.floor((elWith - 10) / 106)
      // 首次计算溢出人员
      getExceedEmployee()
    }
  }

  nextTick(() => {
    maxTagCountComput()
  })

  // 查询指定人员信息
  const getRangeEmployeesByIds = async (userIds: string[]) => {
    if (!userIds?.length) options.value = []

    const result = await api.default.ListUserInfoByIds({ user_ids: userIds })
    if (result.code === '000000') {
      const data: any = result.data
      options.value = data
      // collectEmployeeMap(options.value)
    }
  }

  // 清除， 删除全部
  const clearSelected = () => {
    value.value = []
    context.emit('ichange', value.value)
  }

  // 删除单个人员
  const handleDelete = (employee_id: string) => {
    value.value = value.value.filter(v => v !== employee_id)
    context.emit('ichange', value.value)
  }

  const setOpen = (event: any) => {
    if (props.mode) return
    if (event?.path[0]?.className === 'head-clear-icon') return
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

  const getExceedEmployee = async () => {
    if (maxTagCount.value && value.value.length > maxTagCount.value) {
      const exceedIds = value.value.slice(maxTagCount.value)
      const result = await api.default.ListUserInfoByIds({
        user_ids: exceedIds,
      })
      if (result.code === '000000') {
        const data: any = result.data
        exceedList.value = data
      }
    }
  }

  // 监听value变化， 处理溢出items
  watch(value, val => {
    if (typeof val === 'string') {
      val = [val]
      return
    }
    // 避免首次赋值时更新 todo -- 待优化
    context.emit('update', val)
    // value 变化， 计算溢出人员
    getExceedEmployee()
  })

  // effect(() => {
  //   let val = value.value
  //   if (typeof val === 'string') {
  //     val = [val]
  //     return
  //   }
  //   // 避免首次赋值时更新 todo -- 待优化
  //   context.emit('update', val)
  //   if (maxTagCount.value && val.length > maxTagCount.value) {
  //     const exceedIds = val.slice(maxTagCount.value)
  //     getExceedEmployee(exceedIds)
  //   }
  // })

  // 监听（propsValue）外部设置的值变更
  effect(() => {
    const val = propsValue.value
    if (val?.length) {
      value.value = typeof val === 'string' ? [val] : val
      // 回显
      getRangeEmployeesByIds(val)
    } else {
      value.value = []
    }
  })

  // 指定范围
  effect(() => {
    noRemote.value && getRangeEmployeesByIds(props.range)
  })

  return {
    isDisabled,
    placeholder,
    multiple,
    isOpen,
    isRange,
    loading,
    options,
    maxTagCount,
    value,
    closeIcon,
    searchIcon,
    isMouseenter,
    searchByKey,
    noRemote,
    exceedList,
    setOpen,
    closeOpen,
    clearSelected,
    handleDelete,
    mouseenter,
    mouseleave,
  }
}
