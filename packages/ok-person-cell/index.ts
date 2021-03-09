import { setPopover } from '@c/utils'
import axios from 'axios'
import { defineComponent, effect, html, onMounted, ref } from 'ok-lit'

import okAvatarCss from '../assets/ok-avatar.less'
// import { personInfo } from '../mock'
/**
 * person: {Person} 用户信息
 * TODO:
 * 头像形状：circle ｜ square
 * 文字头像：背景色自定义
 */
import props from './props'
defineComponent(
  'ok-person-cell',
  {
    ...props,
  },
  (props, contxt) => {
    onMounted(() => {
      setPopover(
        contxt.$refs['ok-avatar'] as HTMLElement,
        contxt.$refs['person-card'] as HTMLElement,
        {
          appendTo: document.body,
          popperOptions: {
            strategy: 'fixed',
          },
        }
      )
    })

    const toOpenId = ref('')
    const isAwaken = ref(false)
    const checkLardShow = (id: string) => {
      const w: any = window
      axios
        .post(`${w.larkUrl}/api/v1/private/user/getInfoByEmpId`, {
          emp_id: id,
        })
        .then(res => {
          let resData = res.data
          if (resData.code === '000000') {
            const fromOpenId = resData.data.from_open_id
            toOpenId.value = resData.data.to_open_id
            isAwaken.value = Boolean(fromOpenId && toOpenId.value)
            console.log('isAwaken.value', isAwaken.value)
          }
        })
    }

    effect(() => {
      const personInfo: any = props.personInfo
      const id =
        personInfo.employee_id ||
        personInfo.user_id ||
        personInfo.id ||
        personInfo.employee_number

      id && checkLardShow(id)
    })

    return () => html`
      <style>
        ${okAvatarCss}
      </style>
      <span ref="ok-avatar" class="ok-avatar">
        <slot>
          <ok-avatar
            .personInfo=${props.personInfo}
            .size=${props.size}
            .width=${props.width}
            .height=${props.height}
          ></ok-avatar>
        </slot>
      </span>
      <ok-person-card
        ref="person-card"
        .personInfo=${props.personInfo}
        .toOpenId=${toOpenId.value}
        .isAwaken=${isAwaken.value}
      ></ok-person-card>
    `
  }
)
