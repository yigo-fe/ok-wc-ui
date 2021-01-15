import { defineComponent, html, PropType } from 'ok-lit'
import { Person } from './person.utils'

import okPersonCss from '../assets/ok-person.less'
import { handleImage } from '@c/utils'

/**
 * person: {Person} 用户信息
 * size: {number} 图片大小
 */

defineComponent(
  'ok-person',
  {
    person: {
      type: (Object as unknown) as PropType<Person>,
      default: {
        id: '500',
        name: '小辛辛',
        department: 'HRBP-产品技术运营-北京',
        email: 'masiwei@kuaishou.com',
      },
      // required: true,
    },
    size: {
      type: Number,
      default: 32,
      required: true,
    },
  },
  (props, context) => {
    return () => html`
      <style>
        ${okPersonCss}
      </style>
      <span class="ok-person">
        <img src="${handleImage(props.person)}" />
      </span>
    `
  }
)
