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
