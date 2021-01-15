import { defineComponent, html, PropType } from 'ok-lit'

import { Person } from '@c/ok-wc-ui.d'
import { SIZE_TYPE } from '@c/enum'

import okPersonCss from '../assets/ok-person.less'

/**
 * person: {Person} 用户信息
 *
 * 插槽：
 *  person-info ：展示用户信息
 */

defineComponent(
  'ok-person',
  {
    person: {
      type: (Object as unknown) as PropType<Person>,
      required: true,
    },
    size: {
      type: (String as unknown) as SIZE_TYPE,
      default: SIZE_TYPE.MIDDLE,
      required: true,
    },
  },
  props => {
    return () => html`
      <style>
        ${okPersonCss}
      </style>
      <div class="ok-person ok-person-${props.size}">
        <ok-avatar class="avatar"></ok-avatar>
        <slot name="person-info">
          <div class="person-info">
            <span class="name">${props.person?.name}</span>
            <span class="department">${props.person?.department}</span>
          </div>
        </slot>
      </div>
    `
  }
)
