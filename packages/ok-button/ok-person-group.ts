import { SIZE_TYPE } from '@c/enum'
import { Person } from '@c/ok-wc-ui.d'
import { computed, defineComponent, html, onMounted, PropType } from 'ok-lit'
import { createApp } from 'vue'

import okPersonGroupCss from '../assets/ok-person-group.less'

/**
 * @props persons: {Array<Person>} 用户信息组
 */

defineComponent(
  'ok-person-group1',
  {
    personList: {
      type: (Object as unknown) as PropType<Array<Person>>,
      required: true,
    },
    size: {
      type: (String as unknown) as SIZE_TYPE,
      default: SIZE_TYPE.MIDDLE,
      required: true,
    },
    width: {
      type: (String as unknown) as String,
    },
    height: {
      type: (String as unknown) as String,
    },
    showDelete: {
      type: (Boolean as unknown) as Boolean,
    },
    detailSize: {
      type: (String as unknown) as String,
      default: 'mini',
    },
    detailWidth: {
      type: (String as unknown) as String,
      default: '',
    },
    detailHeight: {
      type: (String as unknown) as String,
      default: '',
    },
  },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {},
        template: `
          <span>123</span>
        `,
      }
      const app = createApp(options)
      app.mount(context.$refs.showPersonGroup as HTMLElement)
    })
    return () => html`
      <style>
        ${okPersonGroupCss}
      </style>
      <div ref="showPersonGroup" class="ok-person-group">123</div>
    `
  }
)
