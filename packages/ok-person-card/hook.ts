/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-03 17:28:13
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-19 15:58:41
 * @FilePath: /packages/ok-person-card/hook.ts
 */
import { computed, effect, ExtractPropTypes, ref } from 'vue'

import { isBroswerAllowed } from './broswer'
import defineProps from './props'
import setLang from './lang'

export default function (props: ExtractPropTypes<typeof defineProps>) {
  const personInfoCom: any = ref({})
  const relationType = computed(
    () => props.personInfo?.msg_relation_type || props.msgRelationType
  )

  const formartType = ['WX', 'DD', 'JD', 'WX_THIRD_APP', 'LARK']

  const validMsgType = computed(() => {
    return formartType.includes(relationType.value)
  })
  // 是否展示发送消息按钮
  const showSendBtn = computed(() => {
    // 1.是否设置了隐藏、2.属于支持类型、3.浏览器(飞书，钉钉，企微浏览器不展示按钮)、4.接口数据
    return (
      !props.hideLark &&
      validMsgType.value &&
      isBroswerAllowed() &&
      props.isAwaken
    )
  })

  const statusType = computed(() => props.statusType)

  const deptText = computed(() => {
    if (props.deptList?.length) {
      return props.deptList.map(
        (v: any) =>
          `${v.dept_name_path.replace(/@/g, '/')}${
            v.main_dept_flag === '1' ? ' (主)' : ''
          }`
      )
    } else {
      return props.personInfo.department_name
        ? [props.personInfo.department_name]
        : ''
    }
  })

  const langPack = ref({
    terminated: '',
    team: '',
    email: '',
    sendLark: '',
    sendIcon: '',
  })

  // 打开应用
  const openApp = () => {
    switch (relationType.value) {
      case 'WX':
        location.href = 'wxwork://'
        break
      case 'WX_THIRD_APP':
        break
      case 'JD':
        break
      case 'DD':
        location.href = `dingtalk://dingtalkclient/page/link`
        break
      case 'LARK':
        location.href = `lark://applink.feishu.cn/client/chat/open?openId=${props.toOpenId}`
        break
      default:
    }
  }
  const textStyle = ref({
    width: '100%',
    'line-height': '170px',
    'font-size': '60px',
    'font-weight': '500',
    height: '170px',
  })

  const showTeam = ref(props.showTeam)

  const mapFields = (obj: any) => {
    // 兼容姓名和部门不是对象
    let name: any
    if (obj.name && typeof obj.name == 'object') {
      name = obj.name
    } else if (typeof obj.employee_name !== 'object') {
      name = {
        zh: obj.employee_name,
        en: obj.employee_en_name,
        ja: obj.employee_name,
      }
    }
    let dept: any
    // 兼容org_name为null的情况
    if (obj.org_name && typeof obj.org_name == 'object') {
      dept = obj.org_name
    } else if (typeof obj.department_name !== 'object') {
      dept = {
        zh: obj.department_name || obj.org_name,
        en: obj.department_en_name,
        ja: obj.department_name,
      }
    }
    return {
      ...obj,
      id: obj.employee_id || obj.user_id || obj.id || obj.employee_number,
      name: name || obj.employee_name,
      email: obj.email,
      avatar: obj.avatar || obj.avatar_url,
      org_name: dept || obj.department_name,
      leaderName: obj.leader_name, // 待确定
      leaderEid: obj.leader_eid,
      terminated: obj.terminated,
      gender: obj.gender,
    }
  }

  const initPersonInfo = () => {
    if (!props.personInfo) return
    personInfoCom.value = mapFields(props.personInfo)
  }

  const initData = () => {
    if (!props.personInfo) return
    initPersonInfo()
    langPack.value = setLang(relationType.value)
    if (!relationType.value) {
      console.warn('请传入平台字段msgRelationType')
    }
  }
  effect(() => {
    initData()
  })

  return {
    textStyle,
    deptText,
    openApp,
    showTeam,
    validMsgType,
    langPack,
    personInfoCom,
    showSendBtn,
    statusType,
  }
}
