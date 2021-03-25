/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-23 21:02:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-23 21:02:51
 * @FilePath: /packages/ok-department-select/department-props.ts
 */
import { PropType } from 'ok-lit'

export type ModeType = 'tree' | 'default'

const propsOptions = {
  value: {
    type: (Array as unknown) as PropType<string[]>,
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
  update: {
    type: (Function as unknown) as PropType<
      // eslint-disable-next-line no-unused-vars
      (ids: string[], options: []) => void
    >,
  },
}

export { propsOptions }
