/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-20 14:56:24
 * @LastEditors: 付静
 * @LastEditTime: 2021-04-08 18:30:05
 * @FilePath: /packages/ok-employee-select/employee-props.ts
 */

import { PropType } from 'ok-lit'

export type ModeType = 'tree' | 'default'

const propsOptions = {
  value: {
    type: [Array, String],
  },
  range: {
    type: (Array as unknown) as PropType<string[]>,
  },
  placeholder: {
    type: (String as unknown) as PropType<string>,
  },
  disabled: {
    type: (Boolean as unknown) as PropType<boolean>,
    default: false,
  },
  borderless: {
    type: (Boolean as unknown) as PropType<boolean>,
    default: false,
  },
  multiple: {
    type: (Boolean as unknown) as PropType<boolean>,
    default: false,
  },
  secrecy: {
    type: (Boolean as unknown) as PropType<boolean>,
    default: false,
  },
  mode: {
    type: (String as unknown) as PropType<ModeType>,
    default: 'default',
  },
  hideMenuOnMultiple: {
    type: (Boolean as unknown) as PropType<boolean>,
    default: false,
  },
  update: {
    type: (Function as unknown) as PropType<
      // eslint-disable-next-line no-unused-vars
      (ids: string[], options: []) => void
    >,
  },
}

export { propsOptions }
