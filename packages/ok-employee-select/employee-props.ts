/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-20 14:56:24
 * @LastEditors: 付静
 * @LastEditTime: 2021-06-29 17:27:55
 * @FilePath: /packages/ok-employee-select/employee-props.ts
 */

import { PropType } from 'ok-lit'

export type ModeType = 'tree' | 'default'

const propsOptions = {
  // value
  value: {
    type: [Array, String],
  },
  /**
   * 指定人员选择范围。类型指定人员的id集合
   */
  range: {
    type: Array as unknown as PropType<string[]>,
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
  // 是否隐藏组织架构
  secrecy: {
    type: Boolean as unknown as PropType<boolean>,
    default: false,
  },
  // 人员选择的模式：tree | default
  mode: {
    type: String as unknown as PropType<ModeType>,
    default: 'default',
  },
  // 多选时，每次选择后都收起下拉框
  hideMenuOnMultiple: {
    type: Boolean as unknown as PropType<boolean>,
    default: false,
  },
  // dropdownstyle, 同Ant Design Vue 中select的dropdownstyle属性
  dropdownstyle: {
    type: Object as unknown as PropType<object>,
  },
  // modal的z-index
  modalZIndex: {
    type: Number as unknown as PropType<number>,
  },
  width: {
    type: String as unknown as PropType<ModeType>,
  },
  // modal的container
  getContainerModal: {
    type: Function as unknown as PropType<() => void>,
  },
  // getPopupContainer, 同Ant Design Vue 中select的getPopupContainer属性
  getPopupContainer: {
    type: Function as unknown as PropType<
      // eslint-disable-next-line no-unused-vars
      (triggerNode: any) => void
    >,
  },
  /**
   * 回调函数。选中的数据发生变化时调用
   * @param ids: 选中的人员id集合
   * @param options: 选中的人员option集合
   */
  update: {
    type: Function as unknown as PropType<
      // eslint-disable-next-line no-unused-vars
      (ids: string[], options: []) => void
    >,
  },
  /**
   * 回调函数。focus
   */
  onFocus: {
    type: Function as unknown as PropType<() => void>,
  },
  /**
   * 回调函数。blur
   */
  onBlur: {
    type: Function as unknown as PropType<() => void>,
  },
  /**
   * 回调函数。删除单个人员
   * @param item: 要删除的人员option
   */
  onRemove: {
    type: Function as unknown as PropType<
      // eslint-disable-next-line no-unused-vars
      (option: any) => void
    >,
  },
  // 回调函数。清空所有已选人员
  onClear: {
    type: Function as unknown as PropType<() => void>,
  },
  remoteMethod: {
    type: Function,
  },
  // 审批组件传入，卡片请求数据方法
  propsGetInfoByEmpId: {
    type: Function,
  },
}

export { propsOptions }
