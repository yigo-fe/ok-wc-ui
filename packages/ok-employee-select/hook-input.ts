/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-03 21:17:47
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-15 20:36:48
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
  const options = ref([])
  const isOpen = ref(false)
  const isRange = ref(false)
  const loading = ref(false)
  const maxTagCount = ref(0)
  const exceedList = ref([])

  const closeIcon = close
  const searchIcon = search

  const propsValue = computed(() => props.value)
  const placeholder = computed(() => props.placeholder)
  const isDisabled = computed(() => props.disabled)
  const multiple = computed(() => props.multiple)
  const isRemote = computed(() => props.range && props.range.length)

  const value = ref<string[]>([])
  value.value = propsValue.value || []

  // 人员搜索
  const onFetch = async (query: string) => {
    if (isRemote.value) return
    if (!query) return
    loading.value = true
    const result = await api.default.SearchUserInfo({ param: query })
    if (result.code === '000000') {
      const data: any = result.data?.rows
      options.value = data
    }
  }

  const searchByKey = debounce(onFetch, 500)

  // 处理最多能展示多少个tag
  const maxTagCountComput = () => {
    const el = context.$refs.showEmployeeSelectInput as HTMLElement
    const elWith = el.offsetWidth

    if (elWith && elWith > 116) {
      maxTagCount.value = Math.floor((elWith - 10) / 106)
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
    }
    // axios.post(URL_LIST, { user_ids: userIds }).then(res => {
    //   const resData = res.data
    //   if (resData.code === '000000') {
    //     const data: any = resData.data
    //     options.value = data
    //   }
    // })
  }

  const clearSelected = () => {
    value.value = []
    context.emit('ichange', value.value)
  }

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

  const getExceedEmployee = async (exceedIds: string[]) => {
    const result = await api.default.ListUserInfoByIds({
      user_ids: exceedIds,
    })
    if (result.code === '000000') {
      const data: any = result.data
      exceedList.value = data
    }
  }

  // 监听value变化， 处理溢出items
  // effect(() => {
  //   console.log('update')
  //   let val = value.value
  //   typeof val === 'string' && (val = [val])
  //   context.emit('update', val)
  //   if (val.length > maxTagCount.value) {
  //     const exceedIds = val.slice(maxTagCount.value)
  //     getExceedEmployee(exceedIds)
  //   }
  // })

  watch(value, val => {
    typeof val === 'string' && (val = [val])
    context.emit('update', val)
    if (val.length > maxTagCount.value) {
      const exceedIds = val.slice(maxTagCount.value)
      getExceedEmployee(exceedIds)
    }
  })

  // 监听外部设置的值变更
  // watch(propsValue, val => {
  //   console.log('watch-propsValue', val)
  //   if (val?.length) {
  //     value.value = typeof val === 'string' ? [val] : val
  //     getRangeEmployeesByIds(val)
  //   } else {
  //     value.value = []
  //   }
  // })

  effect(() => {
    const val = propsValue.value
    if (val?.length) {
      value.value = typeof val === 'string' ? [val] : val
      getRangeEmployeesByIds(val)
    } else {
      value.value = []
    }
  })

  // 指定范围
  // watch(isRemote, val => {
  //   val && getRangeEmployeesByIds(props.range)
  // })
  effect(() => {
    isRemote.value && getRangeEmployeesByIds(props.range)
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
    maxTagCountComput,
    searchByKey,
    isRemote,
    exceedList,
    setOpen,
    closeOpen,
    clearSelected,
    handleDelete,
    mouseenter,
    mouseleave,
    isMouseenter,
  }
}
