import { Person } from '@c/ok-wc-ui.d'
import { setPopover } from '@c/utils'
import { defineComponent, html, onMounted, PropType } from 'ok-lit'

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
      ></ok-person-card>
    `
  }
)
