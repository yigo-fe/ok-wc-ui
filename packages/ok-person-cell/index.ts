import './popover-ant'
import './popover-tippy'

import { defineComponent, html } from 'ok-lit'

import { isWindowsWxchat } from '../ok-person-card/broswer'
import props from './props'
defineComponent(
  'ok-person-cell',
  {
    ...props,
  },
  props => {
    // 判断是否为企业微信
    const showAntPopover = isWindowsWxchat()

    const render = () => {
      if (showAntPopover) {
        return html`
          <ok-person-ant
            .personInfo=${props.personInfo}
            .i18n=${props.i18n}
            .avatarClass=${props.avatarClass}
            .size=${props.size}
            .width=${props.width}
            .height=${props.height}
            .round=${props.round}
            .background=${props.background}
            .avatarWapper=${props.avatarWapper}
            .avatarStyle=${props.avatarStyle}
            .textStyle=${props.textStyle}
            .hidePopper=${props.hidePopper}
            .propsGetInfoByEmpId=${props.propsGetInfoByEmpId}
          >
            <slot></slot>
          </ok-person-ant>
        `
      } else {
        return html`
          <ok-person-tippy
            .personInfo=${props.personInfo}
            .i18n=${props.i18n}
            .avatarClass=${props.avatarClass}
            .size=${props.size}
            .width=${props.width}
            .height=${props.height}
            .round=${props.round}
            .background=${props.background}
            .avatarWapper=${props.avatarWapper}
            .avatarStyle=${props.avatarStyle}
            .textStyle=${props.textStyle}
            .hidePopper=${props.hidePopper}
            .propsGetInfoByEmpId=${props.propsGetInfoByEmpId}
            ><slot>
              <ok-avatar
                .personInfo=${props.personInfo}
                .size=${props.size}
                .width=${props.width}
                .height=${props.height}
              ></ok-avatar></slot
          ></ok-person-tippy>
        `
      }
    }
    return () => html` ${render()} `
  }
)
