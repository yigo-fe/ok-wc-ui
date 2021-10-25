export * from './poper'

const isSameArray = (arr1: any, arr2: any) => {
  const l1 = arr1?.length || 0
  const l2 = arr2?.length || 0
  let same = false
  if (l1 === l2) {
    same = l1 ? arr1.every((v: any) => arr2.indexOf(v) > -1) : true
  }
  return same
}

const customDefineExpose = (exposeMap: Record<any, any>, dom: any) => {
      if (dom) {
        Object.keys(exposeMap).forEach(key => {
          Object.defineProperty(dom, key, {
            value: exposeMap[key]
          })
        })
      } else {
        console.error('为获取到host', exposeMap)
      }
}

// 获取当前的根节点
// @ts-ignore
const getHostNode = (dom: any) => {
  if (dom && dom.parentNode) {
    return getHostNode(dom.parentNode)
  } else if(dom) {
    return dom.host
  } else {
    return ''
  }
}

export { isSameArray, customDefineExpose, getHostNode }
