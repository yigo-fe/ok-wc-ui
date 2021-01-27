import { POPOVER_PLACEMENT } from '@c/ok-wc-ui'
import { defineComponent, html, onMounted } from 'ok-lit'
import { PropType } from 'ok-lit/dist/types/props'
import tippy, { Instance, Props } from 'tippy.js'
import tippyCSS from 'tippy.js/dist/tippy.css'

import popoverCSS from '../assets/ok-popover.less'

/**
 * @props placement 弹层方向
 * @props zIndex 卡片层级
 * @props delayShow hover多久显示
 * @props content 气泡内容
 * @props arrow 展示小箭头
 * @props duration 过渡时间
 * @props trigger 触发时机 hover / click
 * @props hideOnClick 气泡是否点击隐藏
 * @props popoverIndex 第几层气泡
 *
 * @slot default 触发气泡元素
 * @slot content 气泡内容
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
    onMounted(() => {
      instance = tippy(context.$refs.reference as HTMLElement, {
        content: props.content || context.$refs.tooltip,
        // popperOptions: {
        //   strategy: 'fixed',
        // },
        placement: props.placement,
        theme: 'ok-ui',
        interactive: true,
        appendTo: document.body, // 绑定到父元素
        duration: props.duration,
        arrow: props.arrow,
        delay: props.delay,
        trigger: props.trigger,
        hideOnClick: props.hideOnClick,
        // followCursor: true,
        // plugins: [followCursor],
        offset: (i: any) => {
          // console.log(i, 'offset')
          return [0, 10]
        },
        // render: (instance: Instance) => {
        //   console.log(instance, 'render')
        //   return {
        //     popper: instance.popper,
        //     onUpdate: (prevProps: Props, nextProps: Props) => {
        //       console.log(prevProps, nextProps, 'onUpdate')
        //     },
        //   }
        // },
        // sticky: 'popper',
      })
      // console.log(instance)
      // // 初始化隐藏
      requestAnimationFrame(() => {
        instance.show()
      })
    })

    return () => html`
      <style>
        ${tippyCSS + popoverCSS}
      </style>
      <div id="parent">
        <span ref="reference" class="ok-person" aria-expanded="true">
          <slot></slot>
        </span>
        <div>
          <div ref="tooltip">
            <slot name="content">popover</slot>
          </div>
        </div>
      </div>
    `
  }
)
