import dingtalk from '../assets/images/dingtalk.svg'
import kim from '../assets/images/kim.svg'
import wechat from '../assets/images/wechat.svg'
const setLang = function (i18n = 'zh', msgRelationType = 'NONE') {
  let msgType = msgRelationType
  let flag = ['WX', 'DD', 'JD', 'WX_THIRD_APP', 'LARK', 'NONE'].includes(
    msgType
  )
  if (!flag) {
    msgType = 'NONE'
  }
  const typeTitle = {
    WX: {
      zh: '企微',
      en: 'WeChat Work',
      ja: 'WeChat Work',
      icon: wechat,
    },
    DD: {
      zh: '钉钉',
      en: 'DingTalk',
      ja: 'DingTalk',
      icon: dingtalk,
    },
    JD: {
      zh: 'ME',
      en: 'ME',
      ja: 'ME',
      icon: '',
    },
    WX_THIRD_APP: {
      zh: '企微',
      en: 'WeChat Work',
      ja: 'WeChat Work',
      icon: wechat,
    },
    LARK: {
      zh: '飞书',
      en: 'Lark',
      ja: 'Lark',
      icon: kim,
    },
    NONE: {
      zh: '',
      en: '',
      ja: '',
      icon: '',
    },
  }
  let title = ''
  let icon = typeTitle[msgType.toUpperCase()].icon || ''
  if (typeTitle[msgType.toUpperCase()]) {
    title = typeTitle[msgType.toUpperCase()][i18n]
  }
  const lang = {
    en: {
      terminated: 'Discontinued',
      team: 'Team',
      email: 'Email',
      manager: 'Manager',
      more: 'More',
      seeMore: 'See More',
      sendLark: `Send ${title} Message`,
      sendIcon: icon,
    },
    zh: {
      terminated: '已停用',
      team: '部门',
      email: '邮箱',
      manager: '上级',
      more: '更多',
      seeMore: '查看更多',
      sendLark: `发送${title}消息`,
      sendIcon: icon,
    },
    ja: {
      terminated: '使用停止',
      team: '部署',
      email: 'メール',
      manager: '上司',
      more: '詳細',
      seeMore: '詳細を確認する',
      sendLark: `${title}メッセージを送る`,
      sendIcon: icon,
    },
  }
  return lang
}
export default setLang
