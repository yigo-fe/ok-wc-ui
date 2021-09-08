/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-05-19 15:48:50
 * @LastEditors: 付静
 * @LastEditTime: 2021-06-30 14:06:07
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

const isWindowsWxchat = () => {
  const uAgent = window.navigator.userAgent
  return /WindowsWechat/.test(uAgent)
}

export { isBroswerAllowed, isWindowsWxchat }
