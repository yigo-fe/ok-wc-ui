/* eslint-disable no-unused-vars */
/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-23 21:02:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-07-29 19:56:24
 * @FilePath: /packages/ok-department-select/department-props.ts
 */
import {PropType} from 'vue'
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
  // 设置border-radius， 默认all, 可设置 left, right, none
  borderRadius: {
    type: String as unknown as PropType<string>,
    default: 'all',
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
    type: Function as unknown as PropType<(e: FocusEvent) => void>,
  },
  onBlur: {
    type: Function as unknown as PropType<(e: FocusEvent) => void>,
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
  // 平铺展示
  flat: {
    type: Boolean as unknown as PropType<boolean>,
    default: false,
  },
  // 校验失败
  isError: {
    type: Boolean,
    default: false,
  },
  // 自定义接口：根据id查信息
  getInfoById: {
    type: Function as unknown as PropType<
      (department_ids: string[], display_level: number) => Promise<unknown>
    >,
  },
  // 自定义搜索
  remoteMethod: {
    type: Function as unknown as PropType<
      (query: string, display_level: number) => Promise<unknown>
    >,
  },
  // 查询组织架构根节点
  getRootDept: {
    type: Function as unknown as PropType<() => Promise<unknown>>,
  },
  // 查询子部门节点
  getSubDept: {
    type: Function as unknown as PropType<
      (parent_dept_id: string, display_level: number) => Promise<unknown>
    >,
  }
}

export { propsOptions }
