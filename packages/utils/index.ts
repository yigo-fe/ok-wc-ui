/**
 * 处理图片,兜底默认值
 * person: {人员信息}
 * definition: 清晰度，默认不开起
 */
import { Person } from '@c/ok-wc-ui.d'

export * from './poper'

const isSameArray = (arr1: any, arr2: any) => {
  const l1 = arr1?.length || 0
  const l2 = arr2?.length || 0
  let same = false
  if (l1 === l2) {
    same = l1 ? arr1.every(v => arr2.indexOf(v) > -1) : true
  }
  return same
}

export { isSameArray }
