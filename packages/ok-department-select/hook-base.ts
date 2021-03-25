/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-23 22:08:42
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-23 22:12:16
 * @FilePath: /packages/ok-department-select/hook-base.ts
 */
import { debounce } from 'lodash'
import { effect } from 'ok-lit'
import { computed, nextTick, ref, watch } from 'vue'

import close from '../assets/images/closed.svg'
import search from '../assets/images/search.svg'
import { apiInit } from '../services/api'
import { isSameArray } from '../utils/index'
export default function (props: any, context: any) {
  const api = apiInit()
  // placeholder
  const placeholder = computed(() => props.placeholder)
  // disabled
  const isDisabled = computed(() => props.disabled)
  // multiple
  const multiple = computed(() => props.multiple)

  const closeIcon = close
  const searchIcon = search

  return { api, placeholder, isDisabled, multiple, closeIcon, searchIcon }
}
