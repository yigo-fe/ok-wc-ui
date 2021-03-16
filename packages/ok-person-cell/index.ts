import { setPopover } from '@c/utils'
import { defineComponent, html, onMounted, ref } from 'ok-lit'

import okAvatarCss from '../assets/ok-avatar.less'
import { apiInit } from '../services/api'
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
    const api = apiInit()
    const toOpenId = ref('')
    const isAwaken = ref(false)

    const checkLardShow = async (id: string) => {
      const result = await api.default.GetInfoByEmpId({ emp_id: id })

      if (result.code === '000000') {
        const fromOpenId = result.data.from_open_id
        toOpenId.value = result.data.to_open_id
        isAwaken.value = Boolean(fromOpenId && toOpenId.value)
      }
    }

    const onTrigger = () => {
      if (toOpenId.value) return
      const personInfo: any = props.personInfo
      const id =
        personInfo.employee_id ||
        personInfo.user_id ||
        personInfo.id ||
        personInfo.employee_number

      id && checkLardShow(id)
    }
    onMounted(() => {
      setPopover(
        contxt.$refs['ok-person-trigger'] as HTMLElement,
        contxt.$refs['person-card'] as HTMLElement,
        {
          appendTo: document.body,
          popperOptions: {
            strategy: 'fixed',
          },
          onTrigger: onTrigger,
        }
      )
    })

    return () => html`
      <style>
        ${okAvatarCss}
      </style>
      <span ref="ok-person-trigger" class="ok-person-cell">
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
