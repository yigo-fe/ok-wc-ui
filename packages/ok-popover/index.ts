import { POPOVER_PLACEMENT } from '@c/ok-wc-ui'
import { createPopper, Instance } from '@popperjs/core'
import { defineComponent, html, onMounted } from 'ok-lit'
import { PropType } from 'ok-lit/dist/types/props'

import popover from '../assets/ok-popover.less'

/**
 * @props placement 弹层方向
 * @props zIndex 卡片层级
 * @props delayShow hover多久显示
 */

defineComponent(
  'ok-popover',
  {
    zIndex: {
      type: String,
      default: '9000',
      required: true,
    },
    placement: {
      type: (String as unknown) as POPOVER_PLACEMENT,
      default: 'auto',
    },
    delayShow: {
      type: (Number as unknown) as PropType<number>,
      default: 200,
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
          {
            name: 'arrow',
            options: {
              element: '[data-popper-arrow]',
              // padding: 5, // 5px from the edges of the popper
            },
          },
        ],
      })
    }

    onMounted(() => {
      poper = createPopper(context.$refs.reference, context.$refs.tooltip, {
        placement: props.placement,
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
      }, props.delayShow)
    }

    // 鼠标移除
    const handleMouseleave = () => {
      if (showTimer) window.clearTimeout(showTimer)
      hideTimer = window.setTimeout(() => {
        togglePoper(true)
      }, props.delayShow)
    }

    return () => html`
      <style>
        ${popover}
      </style>
      <span
        @mouseenter=${handleMouseenter}
        @mouseleave=${handleMouseleave}
        ref="reference"
        class="ok-person"
      >
        <slot></slot>
      </span>
      <div ref="tooltip" id="tooltip">
        <div data-popper-arrow></div>
        <div @mouseenter=${handleMouseenter} @mouseleave=${handleMouseleave}>
          <slot name="content">popover</slot>
        </div>
      </div>
    `
  }
)
