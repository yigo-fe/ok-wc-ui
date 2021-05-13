/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-04-08 15:16:57
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-10 10:38:06
 * @FilePath: /packages/ok-employee-select/hook.ts
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
  // placeholder
  const placeholder = computed(() => props.placeholder)
  // disabled
  const disabled = computed(() => props.disabled)
  // multiple
  const multiple = computed(() => props.multiple)
  // 无边框
  const borderless = computed(() => props.borderless)
  // 限定范围
  const range = computed(() => props.range)
  // 指定范围，本地搜索， 非远程
  const remote = computed(() => !props.range?.length)
  // 是否开启了组价架构保密：如果开启了，则不展示组织架构树，只能进行搜索
  const secrecy = computed(() => props.secrecy)

  // 是否开启了组价架构保密：如果开启了，则不展示组织架构树，只能进行搜索
  const mode = computed(() => props.mode)
  // 多选时选中某项是否收起下拉菜单
  const hideMenuOnMultiple = computed(() => props.hideMenuOnMultiple)
  // 下拉框样式
  const dropdownstyle = computed(() => props.dropdownstyle)
  // 下拉框append元素
  const getPopupContainer = computed(
    () => props.getPopupContainer || (() => document.body)
  )

  const propsGetInfoByEmpId = computed(() => props.propsGetInfoByEmpId)

  // modal 展示与否
  const visible = ref(false)

  // 最多展示的tag数量
  const maxTagCount = ref(1)
  // 溢出列表（more list）
  const exceedList = ref<any>([])

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
      infoMap.value[v.employee_id] = v
    })
  }

  // 根据部门ID， 查询部门信息
  const getItemByIds = async (ids: string[]) => {
    return await api.default.ListUserInfoByIdsUserPrivateV1POST({
      payload: {
        user_ids: ids,
      },
    })
  }

  // 搜索
  const searchUser = async (query: string) => {
    if (props.remoteMethod) {
      return await props.remoteMethod(query)
    } else {
      return await api.default.SearchUserInfo({ param: query })
    }
  }

  // 远程模式下, 如果未选中， 清除options缓存
  const dropdownVisibleChange = open => {
    if (!open) return
    if (remote.value && !value.value.length) {
      options.value = []
    }
  }

  // 搜索loading
  const loading = ref(false)

  // 本地搜索
  const filterOption = (inputValue: string, option: any) => {
    const optionDetail = infoMap.value[option.value]
    const query = inputValue?.toLowerCase()
    const employeeId = optionDetail?.employee_id?.toLowerCase()
    const email = optionDetail?.email?.split('@')[0].toLowerCase()
    return (
      employeeId?.indexOf(query) > -1 ||
      optionDetail?.employee_name?.indexOf(inputValue) > -1 ||
      email?.indexOf(inputValue) > -1
    )
  }

  // 人员搜索
  const onFetch = async (query: string) => {
    // 本地模式不需要远程搜索
    if (!remote.value) return
    if (!query) return
    loading.value = true
    const result = await searchUser(query)
    loading.value = false
    if (result.code === '000000') {
      const data: any = result.data?.rows
      options.value = data
      collectMap(options.value)
    }
  }

  const searchByKey = debounce(onFetch, 500)

  // 处理溢出
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
    maxTagCountComput()
  })

  // 打开下拉框
  const isOpen = ref(false)
  const setOpen = () => {
    isOpen.value = true
  }
  const closeOpen = () => {
    props.onBlur && props.onBlur()
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
    props.onClear && props.onClear()
  }

  // 删除单个
  const handleDelete = (id: string) => {
    value.value = value.value.filter(v => v !== id)
    props.onRemove && props.onRemove(infoMap.value[id])
  }

  // ‘更过’ 弹窗中的删除
  const exceedDelete = (e: CustomEvent) => {
    handleDelete(e.detail)
  }

  // 渲染更多弹窗
  const maxTagPlaceholder = () => {
    return h('ok-employee-more', {
      exceedList: exceedList.value,
      onDelete: exceedDelete,
    })
  }

  // focus
  const handleFocus = () => {
    props.onFocus && props.onFocus()
  }

  // init回显：根据ids查询信息: 1. 默认值回显; 2. 收集
  let initDisplay = async (ids: string[], flag?: string) => {
    // 如果是本地
    const params = remote ? ids : props.range
    if (!params?.length) options.value = []
    const result = await getItemByIds(params)
    if (result.code === '000000') {
      const data: any = result.data
      options.value = data
      // 收集map
      collectMap(options.value)
      // 处理溢出
      getExceed()
      if (!flag) {
        // 更新value；获取detail,回显信息; 注意处理单选
        value.value = multiple.value ? ids : ids.slice(0, 1)
      }
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

  effect(() => {
    if (props.range?.length) {
      initDisplay(props.range, 'range')
    }
  })

  return {
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
    isOpen,
    isMouseenter,
    maxTagCount,
    exceedList,
    infoMap,
    selectedList,
    secrecy,
    visible,
    loading,
    mode,
    hideMenuOnMultiple,
    dropdownstyle,
    getPopupContainer,
    getExceed,
    handleInputClick,
    closeOpen,
    mouseenter,
    mouseleave,
    searchUser,
    getItemByIds,
    clearSelected,
    handleDelete,
    maxTagPlaceholder,
    dropdownVisibleChange,
    filterOption,
    searchByKey,
    handleModalChange,
    handleCloseModal,
    handleOpenModal,
    collectMap,
    handleFocus,
    propsGetInfoByEmpId,
  }
}
