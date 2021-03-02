/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-26 16:57:48
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-01 09:54:40
 * @FilePath: /packages/lang.ts
 */

const testLang = 'zh-cn'

// import '../locale/en'

// 读本地json文件， 将内容挂载window上

declare global {
  interface Window {
    $t: any
  }
}

const initLang = () => {
  window.onload = function () {
    var url = './en.json'
    var request = new XMLHttpRequest()
    request.open('get', url) /*设置请求方法与路径*/
    request.send(null) /*不发送数据到服务器*/
    request.onload = function () {
      /*XHR对象获取到返回信息后执行*/
      if (request.status == 200) {
        /*返回状态为200，即为数据获取成功*/
        var json = JSON.parse(request.responseText)
        console.log(json)
        window.$t = json
      }
    }
  }
}

initLang()

export default initLang
