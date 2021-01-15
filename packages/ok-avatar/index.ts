import { defineComponent, html, PropType } from 'ok-lit'
import { Person } from '@c/ok-wc-ui.d'

import okAvatarCss from '../assets/ok-avatar.less'
import { handleImage } from '@c/utils'

/**
 * person: {Person} 用户信息
 * TODO:
 * 头像形状：circle ｜ square
 * 文字头像：背景色自定义
 */

defineComponent(
  'ok-avatar',
  {
    person: {
      type: (Object as unknown) as PropType<Person>,
      required: true,
    },
  },
  (props, context) => {
    return () => html`
      <style>
        ${okAvatarCss}
      </style>
      <span class="ok-avatar">
        <img src="${handleImage(props.person)}" />
      </span>
    `
  }
)
