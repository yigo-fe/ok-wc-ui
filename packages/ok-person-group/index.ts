import { SIZE_TYPE } from '@c/enum'
import { setPopover } from '@c/utils'
import { computed, defineComponent, effect, html, PropType } from 'ok-lit'

import { COMMON_CSS_PATH } from '../path.config'

/**
 * @props persons: {Array<Person>} 用户信息组
 */

defineComponent(
  'ok-person-group',
  {
    personList: {
      type: (Array as unknown) as PropType<any[]>,
      default: () => {
        return []
      },
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

    const setPopup = () => {
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

    // onMounted(() => {
    //   if (props.personList.length > 1) {
    //     setPopover(
    //       contxt.$refs['showMore'] as HTMLElement,
    //       contxt.$refs['personGroupPopper'] as HTMLElement,
    //       {
    //         appendTo: document.body,
    //         popperOptions: {
    //           strategy: 'fixed',
    //         },
    //       }
    //     )
    //   }
    // })

    effect(() => {
      if (props.personList?.length) {
        setPopup()
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

    // ${avatarRender()} ${props.personList.length > 1 ? popperRender() : ''}

    return () => html`
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <div class="ok-person-group ok-person-group-root">
        <div class="ok-person-group-wrap">
          ${avatarRender()} ${popperRender()}
        </div>
      </div>
    `
  }
)
