/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-07-16 10:35:15
 * @LastEditors: 付静
 * @LastEditTime: 2021-08-11 16:30:18
 * @FilePath: /packages/ok-person-group-new/props.ts
 */

import { SIZE_TYPE } from '@c/enum'
import { PropType } from 'ok-lit'
const props = {
  personList: {
    type: Array as unknown as PropType<any[]>,
    default: () => {
      return []
    },
  },
  size: {
    type: String as unknown as PropType<SIZE_TYPE>,
    default: SIZE_TYPE.SMALL,
  },
  width: {
    type: String as unknown as PropType<string>,
  },
  height: {
    type: String as unknown as PropType<string>,
  },
  showDelete: {
    type: Boolean as unknown as PropType<boolean>,
    default: false,
  },
  showAll: {
    type: Boolean as unknown as PropType<boolean>,
    default: false,
  },
  detailSize: {
    type: String as unknown as PropType<string>,
  },
  detailWidth: {
    type: String as unknown as PropType<string>,
    default: '22px',
  },
  detailHeight: {
    type: String as unknown as PropType<string>,
    default: '22px',
  },
  contentStyle: {
    type: Object as unknown as PropType<{}>,
  },
  itemStyle: {
    type: Object as unknown as PropType<{}>,
  },
  placement: {
    type: String as unknown as PropType<string>,
  },
  singleBordered: {
    // 单个人员是否有边框
    type: Boolean as unknown as PropType<boolean>,
  },
  deleteItem: {
    // eslint-disable-next-line no-unused-vars
    type: Function as unknown as PropType<(item: any) => void>,
  },
  subtitleRender: {
    // eslint-disable-next-line no-unused-vars
    type: Function as unknown as PropType<(item: any) => void>,
  },
  // 审批组件传入，卡片请求数据方法
  propsGetInfoByEmpId: {
    type: Function,
  },
  inlineStyle: {
    type: String as unknown as PropType<string>,
  },
}

export default props
