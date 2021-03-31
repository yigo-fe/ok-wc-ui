/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-23 21:37:38
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-31 13:43:40
 * @FilePath: /packages/ok-department-select/hook-input.ts
 */
import { debounce } from 'lodash'
import { ref } from 'vue'

import useBaseHandle from './hook-base'
export default function (props: any, context: any) {
  const {
    testVal,
    value,
    options,
    placeholder,
    isDisabled,
    multiple,
    closeIcon,
    searchIcon,
    borderless,
    isOpen,
    isMouseenter,
    maxTagCount,
    exceedList,
    setOpen,
    closeOpen,
    mouseenter,
    mouseleave,
    searchDept,
    collectdepartmentMap,
    clearSelected,
    handleDelete,
    maxTagPlaceholder,
  } = useBaseHandle(props, context, 'input')

  // 远程模式下, 如果未选中， 清除options缓存
  const dropdownVisibleChange = open => {
    if (!open) return
    if (!value.value.length) {
      options.value = []
    }
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
      collectdepartmentMap(data)
    }
  }

  const searchByKey = debounce(onFetch, 500)

  return {
    testVal,
    isDisabled,
    placeholder,
    multiple,
    isOpen,
    loading,
    options,
    maxTagCount,
    value,
    closeIcon,
    searchIcon,
    borderless,
    isMouseenter,
    searchByKey,
    exceedList,
    setOpen,
    closeOpen,
    clearSelected,
    handleDelete,
    mouseenter,
    mouseleave,
    maxTagPlaceholder,
    dropdownVisibleChange,
  }
}
