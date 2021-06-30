/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-10 15:48:00
 * @LastEditors: 付静
 * @LastEditTime: 2021-06-30 15:07:44
 * @FilePath: /packages/ok-accessory/utils.ts
 */

const getFileType = filePath => {
  if (!filePath) return
  var startIndex = filePath.lastIndexOf('.')
  if (startIndex != -1)
    return filePath.substring(startIndex + 1, filePath.length).toLowerCase()
  else return ''
}

export { getFileType }
