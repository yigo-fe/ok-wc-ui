import { handleImage } from '@c/utils'
import {
  defineComponent,
  html,
  onMounted,
  onUnmounted,
  onUpdated,
  PropType,
} from 'ok-lit'

import ks_kim from '../assets/ks_kim.svg'
import okPersonDetaillCss from '../assets/ok-person-detail.less'

defineComponent(
  'ok-person-detail',
  {
    person: {
      type: (Object as unknown) as PropType<any>,
      required: true,
    },
  },
  (props, _context) => {
    onMounted(() => {
      console.log(props, 'child mounted')
    })

    onUpdated(() => {
      console.log('child updated')
    })

    onUnmounted(() => {
      console.log('html child unmounted')
    })

    // 打开应用
    const openApp = () => {
      window.location.href = `kim://username?username=${props.person.userName}`
    }

    return () => html`
      <style>
        ${okPersonDetaillCss}
      </style>

      <div class="ok-person-detail">
        <header class="person-image">
          <img src=${handleImage(props.person.headImage)} />
          <div class="overlay">
            <span class="person-name">${props.person.name}</span>
          </div>
        </header>
        <footer class="person-detail-footer">
          <div class="person-detail-info">
            <span class="title">部门</span>
            <span class="placeholder">${props.person.deptName}</span>
          </div>
          <div class="person-detail-info">
            <span class="title">邮箱</span>
            <span class="placeholder">${props.person.email}</span>
          </div>
          <div @click=${openApp} class="person-detail-button">
            <img src=${ks_kim} />
            发送Kim消息
          </div>
        </footer>
      </div>
    `
  }
)
