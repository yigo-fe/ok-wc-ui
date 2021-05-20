/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-05-19 15:48:50
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-20 10:04:25
 * @FilePath: /packages/ok-person-card/broswer.ts
 */
const isBroswerAllowed = () => {
  const uAgent = window.navigator.userAgent
  // 判断飞书、钉钉和企微自带浏览器
  if (uAgent.match(/(DingTalk|MicroMessenger|WebPage\/sidebar-semi| Lark)/i)) {
    return false
  } else {
    return true
  }
}

export { isBroswerAllowed }
