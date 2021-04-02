/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-03 21:17:47
 * @LastEditors: 付静
 * @LastEditTime: 2021-04-01 15:48:54
 * @FilePath: /packages/ok-employee-select/hook-input.ts
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
    disabled,
    multiple,
    remote,
    closeIcon,
    searchIcon,
    borderless,
    isOpen,
    isMouseenter,
    maxTagCount,
    exceedList,
    infoMap,
    setOpen,
    closeOpen,
    mouseenter,
    mouseleave,
    searchUser,
    collectMap,
    clearSelected,
    handleDelete,
    maxTagPlaceholder,
  } = useBaseHandle(props, context)

  // 远程模式下, 且未选中， 清除options缓存
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

  return {
    testVal,
    disabled,
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
    remote,
    exceedList,
    setOpen,
    closeOpen,
    clearSelected,
    handleDelete,
    mouseenter,
    mouseleave,
    filterOption,
    dropdownVisibleChange,
    maxTagPlaceholder,
  }
}
