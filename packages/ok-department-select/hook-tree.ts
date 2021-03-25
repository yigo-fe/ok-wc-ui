/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-23 22:07:02
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-24 09:49:21
 * @FilePath: /packages/ok-department-select/hook-tree.ts
 */
// import { debounce } from 'lodash'
// import { effect } from 'ok-lit'
import { computed, nextTick, ref, watch } from 'vue'

import { isSameArray } from '../utils/index'
import useBaseHandle from './hook-base'

export default function (props: any, context: any) {
  const { api, placeholder, isDisabled, multiple } = useBaseHandle(
    props,
    context
  )
  // 是否开启了组价架构保密：如果开启了，则不展示组织架构树，只能进行搜索
  const secrecy = computed(() => props.secrecy)

  // 组件外部传入的初始value
  const propsValue = computed(() => {
    if (!props.value) {
      return []
    } else {
      return Array.isArray(props.value) ? props.value : [props.value]
    }
  })

  // 保存组件内部已选ids
  const value = ref<string[]>([])
  // 搜索结果 - 人员列表
  const searchResultList = ref<any[]>([])

  // 已选人员信息集合
  const selectedList = ref<any[]>([])

  // modal 展示与否
  const visible = ref(false)

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

  let isInitial = false

  // watch value 变化： 调用update,更新组件外部值
  const handleValueChange = () => {
    const val = value.value
    if (isInitial) {
      isInitial = false
      return
    }
    context.emit('update', { value: val, options: selectedList.value })
  }
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

  // watch props.value, 赋值组件内部value
  const handlePropsValChange = () => {
    const val = propsValue.value
    if ((!val?.length && !value.value.length) || propsValEqulValue()) return
    // 更新初始值
    isInitial = true
    if (val?.length) {
      // 更新value；获取detail,回显信息
      value.value = val
    } else if (value.value?.length) {
      // 清除已选的值
      value.value = []
    }
  }
  watch(
    () => propsValue.value,
    (val, oldVal) => {
      // 有时val和oldValue一样也会触发，具体原因待排查
      if (isSameArray(val, oldVal)) return
      handlePropsValChange()
    },
    {
      immediate: true,
      deep: true,
    }
  )

  return {
    placeholder,
    isDisabled,
    visible,
    searchResultList,
  }
}
