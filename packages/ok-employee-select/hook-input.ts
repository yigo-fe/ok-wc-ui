/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-03 21:17:47
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-22 14:41:24
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
  const maxTagCount = ref(1)
  // 溢出列表（more list）
  const exceedList = ref(<any>[])
  // 人员id和detial的map
  const employeeMap = {}

  const closeIcon = close
  const searchIcon = search

  const propsValue = computed(() => {
    // 监听外部传入值变化，设置value --- 解决打包后watch不生效的问题
    if (!props.value) return []
    else {
      return typeof props.value === 'string' ? [props.value] : props.value
    }
  })
  const placeholder = computed(() => props.placeholder)
  const isDisabled = computed(() => props.disabled)
  const multiple = computed(() => props.multiple)
  const noRemote = computed(() => props.range && props.range.length)
  const isTree = computed(() => props.mode === 'tree')

  // 已选人员信息列表
  const selectedList = computed(() => {
    return value.value.map(v => employeeMap[v]).filter(v => v)
  })

  const value = ref<string[]>([])

  // 收集人员信息， 避免频繁请求接口
  const collectEmployeeMap = (list: any) => {
    list.forEach((v: any) => {
      employeeMap[v.employee_id] = v
    })
  }

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
      collectEmployeeMap(options.value)
    }
  }

  const searchByKey = debounce(onFetch, 500)

  // 人员id根据查询指定人员信息: 1. 默认值回显；2. 查询指定范围
  const getRangeEmployeesByIds = async (userIds: string[]) => {
    if (!userIds?.length) options.value = []

    const result = await api.default.ListUserInfoByIds({ user_ids: userIds })
    if (result.code === '000000') {
      const data: any = result.data
      options.value = data
      collectEmployeeMap(options.value)
    }
  }

  // 处理溢出人员

  // 获取溢出人员信息
  const getExceedEmployee = async () => {
    if (!maxTagCount.value) {
      exceedList.value.length && (exceedList.value = [])
      return
    } else {
      const exceedIds = value.value.slice(maxTagCount.value)

      const result = await api.default.ListUserInfoByIds({
        user_ids: exceedIds,
      })
      if (result.code === '000000') {
        const data: any = result.data
        exceedList.value = data
      }
      // employeeMap 中取值， 避免频繁请求接口数据 (tree 模式有问题)
      // exceedList.value = exceedIds.map(v => employeeMap[v]).filter(v => v)
    }
  }

  // 处理最多能展示多少个tag
  const maxTagCountComput = () => {
    const el = context.$refs.showEmployeeSelectInput as HTMLElement
    const elWith = el.offsetWidth
    if (!elWith) return

    maxTagCount.value = elWith > 185 ? Math.floor((elWith - 75) / 108) : 1
    // 首次计算溢出人员
    getExceedEmployee()
  }

  nextTick(() => {
    setTimeout(() => {
      maxTagCountComput()
    }, 500)
  })

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
    if (isTree.value) return
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

  // 避免首次value赋值时触发更新
  let isInitial = true

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
    //如果是tree 模式， 不需要在此处update, 只需更新input中展示即可
    if (isTree.value) {
      getExceedEmployee()
      return
    }

    // 非tree 模式
    const val = value.value

    //有初始值， 特殊处理
    if (propsValue.value?.length) {
      if (isInitial && propsValEqulValue()) {
        isInitial = false
        return
      }
      if (isInitial) return
    }

    isInitial = false

    // 非initial, update value
    context.emit('update', {
      value: val,
      options: selectedList.value,
    })
    // value 变化， 计算溢出人员
    getExceedEmployee()
  }

  // propsValue 变化时处理：
  const handlePropsValChange = () => {
    const val = propsValue.value
    if ((!val?.length && !value.value.length) || propsValEqulValue()) return
    // 更新初始值
    isInitial = true
    if (val?.length) {
      // 更新value；获取detail,回显信息
      value.value = val
      // 回显: 如果已有固定范围， 则不需要更新options
      !props.range?.length && getRangeEmployeesByIds(val)
    } else if (value.value?.length) {
      // 清除已选的值
      value.value = []
    }
  }

  // 监听value变化， 处理溢出items
  watch(
    () => value.value,
    () => {
      handleValueChange()
    },
    {
      immediate: true,
      deep: true,
    }
  )

  // 监听外部出入值propsValue, 赋值value
  watch(
    () => props.value,
    () => {
      // console.log('watch-propsvalue', propsValue.value, value.value)
      handlePropsValChange()
    },
    {
      immediate: true,
      deep: true,
    }
  )

  // 指定范围
  effect(() => {
    noRemote.value && getRangeEmployeesByIds(props.range)
  })

  // 处理多选变单选时value
  effect(() => {
    const val = multiple.value
    if (!val && value.value?.length > 1) {
      value.value = value.value.slice(0, 1)
    }
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
    propsValue,
    setOpen,
    closeOpen,
    clearSelected,
    handleDelete,
    mouseenter,
    mouseleave,
  }
}
