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

const customDefineExpose = (exposeMap: Record<any, any>, instance: any) => {
  if (instance) {
    Object.keys(exposeMap).forEach(key => {
      Object.defineProperty(instance, key, {
        value: exposeMap[key]
      })
    })
  }
}

export { isSameArray, customDefineExpose }
