/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-23 21:02:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-25 17:31:50
 * @FilePath: /packages/ok-department-select/department-props.ts
 */
import { PropType } from 'ok-lit'

export type ModeType = 'tree' | 'default'

const propsOptions = {
  value: {
    type: [Array, String],
  },
  placeholder: {
    type: String as unknown as PropType<string>,
  },
  disabled: {
    type: Boolean as unknown as PropType<boolean>,
    default: false,
  },
  // 展示input的边框
  bordered: {
    type: Boolean as unknown as PropType<boolean>,
    default: true,
  },
  // 展示border-radius
  hasBorderRadius: {
    type: Boolean as unknown as PropType<boolean>,
    default: true,
  },
  multiple: {
    type: Boolean as unknown as PropType<boolean>,
    default: false,
  },
  secrecy: {
    type: Boolean as unknown as PropType<boolean>,
    default: false,
  },
  mode: {
    type: String as unknown as PropType<ModeType>,
    default: 'default',
  },
  level: {
    type: String as unknown as PropType<string>,
    default: '1',
  },
  dropdownstyle: {
    type: Object as unknown as PropType<object>,
  },
  // modal的z-index
  modalZIndex: {
    type: Number as unknown as PropType<number>,
  },
  // modal的container
  getContainerModal: {
    type: Function as unknown as PropType<() => void>,
  },
  getPopupContainer: {
    type: Function as unknown as PropType<
      // eslint-disable-next-line no-unused-vars
      (triggerNode: any) => void
    >,
  },
  update: {
    type: Function as unknown as PropType<
      // eslint-disable-next-line no-unused-vars
      (ids: string[], options: []) => void
    >,
  },
  onFocus: {
    type: Function as unknown as PropType<() => void>,
  },
  onBlur: {
    type: Function as unknown as PropType<() => void>,
  },
  onRemove: {
    type: Function as unknown as PropType<
      // eslint-disable-next-line no-unused-vars
      (item: any) => void
    >,
  },
  onClear: {
    type: Function as unknown as PropType<() => void>,
  },
}

export { propsOptions }
