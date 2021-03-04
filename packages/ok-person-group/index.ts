import { SIZE_TYPE } from '@c/enum'
import { Person } from '@c/ok-wc-ui.d'
import { setPopover } from '@c/utils'
import { computed, defineComponent, html, onMounted, PropType } from 'ok-lit'

import okPersonGroupCss from '../assets/ok-person-group.less'

/**
 * @props persons: {Array<Person>} 用户信息组
 */

defineComponent(
  'ok-person-group',
  {
    personList: {
      type: (Object as unknown) as PropType<Array<Person>>,
      required: true,
    },
    size: {
      type: (String as unknown) as SIZE_TYPE,
      default: SIZE_TYPE.SMALL,
    },
    width: {
      type: (String as unknown) as String,
    },
    height: {
      type: (String as unknown) as String,
    },
    showDelete: {
      type: (Boolean as unknown) as Boolean,
      default: true,
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
  (props, contxt) => {
    const showList = computed(() => {
      return props.personList?.slice(0, 3)
    })

    onMounted(() => {
      if (props.personList.length > 1) {
        setPopover(
          contxt.$refs['showMore'] as HTMLElement,
          contxt.$refs['personGroupPopper'] as HTMLElement,
          {
            appendTo: document.body,
            popperOptions: {
              strategy: 'fixed',
            },
          }
        )
      }
    })

    const avatarRender = () => {
      return html`
        ${showList.value.map(
          item => html`<ok-person-cell
            class="avatar-list"
            .personInfo=${item}
            .size=${props.size}
            .width=${props.width}
            .height=${props.height}
          ></ok-person-cell>`
        )}
        ${showList.value.length === 1
          ? html`<span class="single-user-name"
              >${showList.value[0].employee_name}</span
            >`
          : html`<span ref="showMore" class="more"
              >...${showList.value.length}</span
            >`}
      `
    }

    const popperRender = () => {
      return html`
        <ul ref="personGroupPopper" class="popper-wraper">
          ${props.personList.map(
            item =>
              html`
                <li class="popper-item">
                  <ok-person-cell
                    class="popper-item-avatar"
                    .personInfo=${item}
                    .size=${props.detailSize}
                    .width=${props.detailWidth}
                    .height=${props.detailHeight}
                  ></ok-person-cell>
                  <span class="popper-item-name">${item.employee_name}</span>
                  ${props.showDelete &&
                  html`<span class="popper-item-operate">x</span>`}
                </li>
              `
          )}
        </ul>
      `
    }

    return () => html`
      <style>
        ${okPersonGroupCss}
      </style>
      <div class="ok-person-group">
        ${avatarRender()} ${props.personList.length > 1 ? popperRender() : ''}
      </div>
    `
  }
)
