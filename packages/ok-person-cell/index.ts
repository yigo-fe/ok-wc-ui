import { createPopper, Instance } from '@popperjs/core'
import { defineComponent, html, onMounted, PropType } from 'ok-lit'
import { Person } from './person-cell.utils'

import okPersonCellCss from '../assets/ok-person-cell.less'
import { handleImage } from '@c/utils'

/**
 * person: {Person} 用户信息
 * size: {number} 图片大小
 * zIndex: {string} 卡片层级
 */

defineComponent(
  'ok-person-cell',
  {
    person: {
      type: (Object as unknown) as PropType<Person>,
      default: {
        id: '500',
        name: '小辛辛',
        userName: 'liuzhe',
        orgName: 'HRBP-产品技术运营-北京',
        email: 'masiwei@kuaishou.com',
      },
      // required: true,
    },
    size: {
      type: Number,
      default: 32,
      required: true,
    },
    zIndex: {
      type: String,
      default: '9000',
      required: true,
    },
  },
  (props, context) => {
    let poper: Instance
    // 隐藏/显示poper
    const togglePoper = (toggle: boolean) => {
      poper.setOptions({
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 20],
            },
          },
          {
            name: 'hide',
            fn: (_ref: Instance) => {
              _ref.state.attributes.popper[
                'data-popper-reference-hidden'
              ] = toggle

              // 提高层级避免遮盖
              _ref.state.styles.popper.zIndex = (props.zIndex as unknown) as string
            },
          },
        ],
      })
    }

    onMounted(() => {
      poper = createPopper(context.$refs.personCell, context.$refs.tooltip, {
        placement: 'left',
        strategy: 'fixed',
      })

      // 初始化隐藏
      requestAnimationFrame(() => {
        togglePoper(true)
      })
    })

    let showTimer: number | undefined = undefined
    let hideTimer: number | undefined = undefined
    // 鼠标进入
    const handleMouseenter = () => {
      if (hideTimer) window.clearTimeout(hideTimer)
      showTimer = window.setTimeout(() => {
        togglePoper(false)
      }, 200)
    }

    // 鼠标移除
    const handleMouseleave = () => {
      if (showTimer) window.clearTimeout(showTimer)
      hideTimer = window.setTimeout(() => {
        togglePoper(true)
      }, 200)
    }

    return () => html`
      <style>
        ${okPersonCellCss}
      </style>
      <span
        @mouseenter=${handleMouseenter}
        @mouseleave=${handleMouseleave}
        ref="personCell"
        class="ok-person-cell"
      >
        <img src="${handleImage(props.person?.headImage)}" />
      </span>
      <div ref="tooltip" id="tooltip">
        <ok-person-detail
          @mouseenter=${handleMouseenter}
          @mouseleave=${handleMouseleave}
          .person=${props.person}
        >
        </ok-person-detail>
      </div>
    `
  }
)
