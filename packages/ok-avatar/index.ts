import { Person } from '@c/ok-wc-ui.d'
import { handleImage, setPopover } from '@c/utils'
import { defineComponent, html, onMounted, PropType } from 'ok-lit'

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
        <img src="${handleImage(props.person)}" />
      </span>

      <ok-person-card ref="person-card"></ok-person-card>
    `
  }
)
