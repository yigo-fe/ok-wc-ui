import { Person } from '@c/ok-person/person.utils'
import { handleImage } from '@c/utils'
import { defineComponent, html, PropType } from 'ok-lit'
import ks_kim from '../assets/ks_kim.svg'
import okPersonDetaillCss from '../assets/ok-person-detail.less'

defineComponent(
  'ok-person-detail',
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
  },
  (props, _context) => {
    // 打开应用
    const openApp = () => {
      window.location.href = `kim://username?username=${
        props.person.email.split('@')[0]
      }`
    }
    return () => html`
      <style>
        ${okPersonDetaillCss}
      </style>
      <ok-popover>
        <slot>
          <ok-person .person=${props.person} class="cell"></ok-person>
        </slot>

        <div slot="content" class="ok-person-detail">
          <header class="person-image">
            <img src=${handleImage(props.person, true)} />
            <div class="overlay">
              <span class="person-name">${props.person?.name}</span>
            </div>
          </header>
          <footer class="person-detail-footer">
            <div class="person-detail-info">
              <span class="title">部门</span>
              <span class="placeholder">${props.person?.department}</span>
            </div>
            <div class="person-detail-info">
              <span class="title">邮箱</span>
              <span class="placeholder">${props.person?.email}</span>
            </div>
            <div id="tippy" @click=${openApp} class="person-detail-button">
              <img src=${ks_kim} />
              发送Kim消息
            </div>
          </footer>
        </div>
      </ok-popover>
    `
  }
)
