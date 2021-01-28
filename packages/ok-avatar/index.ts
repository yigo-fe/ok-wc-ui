import { Person } from '@c/ok-wc-ui.d'
import { handleImage } from '@c/utils'
import { defineComponent, html, PropType } from 'ok-lit'

import okAvatarCss from '../assets/ok-avatar.less'

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
  props => {
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
