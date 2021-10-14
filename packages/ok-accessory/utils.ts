/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-10 15:48:00
 * @LastEditors: 付静
 * @LastEditTime: 2021-07-10 11:21:37
 * @FilePath: /packages/ok-accessory/utils.ts
 */

// 根据文件名称获取文件类型（后缀名）
const getFileType = (filePath: string) => {
  if (!filePath) return
  var startIndex = filePath.lastIndexOf('.')
  if (startIndex != -1)
    return filePath.substring(startIndex + 1, filePath.length).toLowerCase()
  else return ''
}

// 下载
const download = (url: string) => {
  let a = document.createElement('a')
  a.href = url
  a.setAttribute('download', '')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export { download, getFileType }
