/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-06-30 14:55:33
 * @LastEditors: 付静
 * @LastEditTime: 2021-06-30 14:57:10
 * @FilePath: /packages/utils/time.ts
 */

const add0 = m => {
  return m < 10 ? '0' + m : m
}
const timestamp2date = timestamp => {
  var time = new Date(timestamp)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var mm = time.getMinutes()
  var s = time.getSeconds()
  return (
    y +
    '-' +
    add0(m) +
    '-' +
    add0(d) +
    ' ' +
    add0(h) +
    ':' +
    add0(mm) +
    ':' +
    add0(s)
  )
}

export { timestamp2date }
