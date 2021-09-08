import dingtalk from '../assets/images/dingtalk.svg'
import kim from '../assets/images/kim.svg'
import wechat from '../assets/images/wechat.svg'
import { i18n } from '../locales'
const setLang = function (msgRelationType = 'NONE') {
  let msgType = msgRelationType
  let flag = ['WX', 'DD', 'JD', 'WX_THIRD_APP', 'LARK', 'NONE'].includes(
    msgType
  )
  if (!flag) {
    msgType = 'NONE'
  }
  const typeTitle = {
    WX: {
      title: i18n.$t('control.personCard.wechat', '企微'),
      icon: wechat,
    },
    DD: {
      title: i18n.$t('control.personCard.dingtalk', '钉钉'),
      icon: dingtalk,
    },
    JD: {
      title: i18n.$t('control.personCard.ME', 'ME'),
      icon: '',
    },
    WX_THIRD_APP: {
      title: i18n.$t('control.personCard.wechat', '企微'),
      icon: wechat,
    },
    LARK: {
      title: i18n.$t('control.personCard.lark', '飞书'),
      icon: kim,
    },
    NONE: {
      title: '',
      icon: '',
    },
  }

  let title = ''
  let icon = ''
  const curLark = typeTitle[msgType.toUpperCase()]

  if (curLark) {
    icon = curLark.icon
    title = curLark.title
  }

  // const lang = {
  //   en: {
  //     terminated: 'Discontinued',
  //     team: 'Team',
  //     email: 'Email',
  //     manager: 'Manager',
  //     more: 'More',
  //     seeMore: 'See More',
  //     sendLark: `Send ${title} Message`,
  //     sendIcon: icon,
  //   },
  //   zh: {
  //     terminated: '已停用',
  //     team: '部门',
  //     email: '邮箱',
  //     manager: '上级',
  //     more: '更多',
  //     seeMore: '查看更多',
  //     sendLark: `发送${title}消息`,
  //     sendIcon: icon,
  //   },
  //   ja: {
  //     terminated: '使用停止',
  //     team: '部署',
  //     email: 'メール',
  //     manager: '上司',
  //     more: '詳細',
  //     seeMore: '詳細を確認する',
  //     sendLark: `${title}メッセージを送る`,
  //     sendIcon: icon,
  //   },
  // }

  const lang = {
    terminated: i18n.$t('control.personCard.terminated', '已停用'),
    team: i18n.$t('control.personCard.department', '部门'),
    email: i18n.$t('control.personCard.email', '邮箱'),
    sendLark: i18n.$t('control.personCard.sendLark', `发送${title}消息`, {
      title,
    }),
    sendIcon: icon,
  }
  return lang
}
export default setLang
