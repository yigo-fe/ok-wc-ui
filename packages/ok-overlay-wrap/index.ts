import { POPOVER_PLACEMENT } from '@c/ok-wc-ui'
import { setPopover } from '@c/utils'
import { defineComponent, html, onMounted } from 'ok-lit'
import { PropType } from 'ok-lit/dist/types/props'
import tippyCSS from 'tippy.js/dist/tippy.css'

import overlayCSS from '../assets/ok-overlay.less'

defineComponent(
  'ok-overlay-wrap',
  {
    zIndex: {
      type: String,
      default: '9000',
      required: true,
    },
    placement: {
      type: (String as unknown) as POPOVER_PLACEMENT,
      default: 'top',
    },
    delayShow: {
      type: (Number as unknown) as PropType<number>,
      default: 200,
    },
    content: {
      type: String,
      default: '',
    },
    arrow: {
      type: (Boolean as unknown) as PropType<boolean>,
      default: true,
    },
    hideOnClick: {
      type: (Boolean as unknown) as PropType<boolean>,
      default: false,
    },
    trigger: {
      type: (String as unknown) as PropType<'click' | undefined>,
      default: undefined,
    },
    duration: {
      type: (Number as unknown) as PropType<number>,
      default: 1000,
    },
    delay: {
      type: (Array as unknown) as PropType<[number, number]>,
      default: [100, 100],
    },
    popoverIndex: {
      type: Number,
      default: 1,
    },
  },
  (props, context) => {
    let instance: any = null
    let instance1: any = null
    let instance2: any = null
    onMounted(() => {
      instance = setPopover(context.$refs.reference, context.$refs.tooltip)
      instance1 = setPopover(context.$refs.reference1, context.$refs.tooltip1)
      instance2 = setPopover(context.$refs.reference2, context.$refs.tooltip2)

      // // 初始化隐藏
      requestAnimationFrame(() => {
        // instance.show()
        // instance1.show()
        // instance2.show()
      })
    })

    return () => html`
      <style>
        ${tippyCSS + overlayCSS}
      </style>
      <div id="parent">
        <span ref="reference" class="ok-person" aria-expanded="false">
          <slot><ok-avatar></ok-avatar></slot>
        </span>

        <div ref="tooltip">
          <div id="parent1">
            <div ref="reference1" class="reference1">第一层tooltip</div>
            <div ref="tooltip1">
              <div id="parent2">
                <div ref="reference2" class="tooltip1">
                  <ok-avatar></ok-avatar>
                </div>
                <div ref="tooltip2">
                  <div class="tooltip2">
                    <ok-avatar></ok-avatar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
)
