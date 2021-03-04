/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-03 17:28:13
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-04 18:10:08
 * @FilePath: /packages/ok-person-card/hook.ts
 */
// import ks_kim from '../assets/ks_kim.svg'
import { ref } from 'vue'

import kim from '../assets/images/kim.svg'
import wechat from '../assets/images/wechat.svg'
export default function (props) {
  // 打开应用
  const openApp = () => {
    // TODO
    window.location.href =
      props.personInfo?.msg_relation_type === 'WX'
        ? `wxwork://`
        : `kim://username?username=${props.personInfo?.email.split('@')[0]}`
  }

  const userName = ref(props.personInfo?.employee_name)
  const textStyle = ref({
    width: '100%',
    'line-height': '170px',
    'font-size': '60px',
    'font-weight': '500',
  })

  const btnIcon = props.personInfo?.msg_relation_type === 'WX' ? wechat : kim
  const btnText = `发送${
    props.personInfo?.msg_relation_type === 'WX' ? '微信' : '飞书'
  }消息`

  const showTeam = ref(props.showTeam)
  return {
    textStyle,
    openApp,
    userName,
    btnIcon,
    btnText,
    showTeam,
  }
}
