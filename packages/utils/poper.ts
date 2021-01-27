import { POPOVER_PLACEMENT } from '@c/ok-wc-ui'
import tippy, {
  createSingleton,
  CreateSingletonInstance,
  Instance,
  SingleTarget,
} from 'tippy.js'

/**
 * @placement 弹层方向
 * @delayShow hover多久显示
 * @content 气泡内容
 * @arrow 展示小箭头
 * @duration 过渡时间
 * @trigger 触发时机hover
 * @hideOnClick 气泡是否点击隐藏
 * @theme 主题
 * @offset 偏移量
 */
class PopoverOptions {
  public placement?: POPOVER_PLACEMENT
  // public delayShow: number
  public arrow?: boolean
  public trigger?: 'click' | 'focus' | undefined
  public theme?: string
  public offset?: [number, number]
  // public animateFill: boolean
  public appendTo?: 'parent' | Element | ((ref: Element) => Element)
  // public aria: {
  //   content?: 'auto' | 'describedby' | 'labelledby' | null
  //   expanded?: 'auto' | boolean
  // }
  public delay?: number | [number | null, number | null]
  public duration?: number | [number | null, number | null]
  // public followCursor: boolean | 'horizontal' | 'vertical' | 'initial'
  public hideOnClick?: boolean | 'toggle'
  // public ignoreAttributes: boolean
  // public inlinePositioning: boolean
  public interactive?: boolean
  // public interactiveBorder: number
  // public interactiveDebounce: number
  // public moveTransition: string
  // public render:
  //   | ((
  //       instance: Instance
  //     ) => {
  //       popper: PopperElement
  //       onUpdate?: (prevProps: Props, nextProps: Props) => void
  //     })
  //   | null
  // public showOnCreate: boolean
  // public sticky: boolean | 'reference' | 'popper'
  // public touch: boolean | 'hold' | ['hold', number]
  // public triggerTarget: Element | Element[] | null
  constructor(props?: Partial<PopoverOptions>) {
    this.placement = props?.placement ?? 'left'
    this.theme = props?.theme ?? 'ok-ui'
    this.appendTo = props?.appendTo ?? 'parent' // 绑定到父元素
    this.duration = props?.duration ?? 200
    this.arrow = props?.arrow ?? true
    this.delay = props?.delay ?? 0
    this.trigger = props?.trigger ?? undefined
    this.hideOnClick = props?.hideOnClick ?? false
    this.offset = props?.offset ?? [0, 0]
    this.interactive = props?.interactive ?? true
  }
}

/**
 * 创建弹层
 *
 * @reference 基元素
 * @tooltip 气泡元素
 * @options {PopoverOptions}
 */
const setPopover = function (
  reference: SingleTarget,
  tooltip?: HTMLElement | string,
  options?: PopoverOptions
): Instance {
  const instance = tippy(reference, {
    content: tooltip,
    ...new PopoverOptions(options),
  })

  return instance
}

/**
 * 创建建单例弹层（列表）
 *
 * @reference 基元素数组
 * @tooltip 气泡元素
 * @options {PopoverOptions}
 */
const setMultiplePopover = function (
  reference: string | Element[] | NodeList,
  tooltip?: HTMLElement | string,
  options?: PopoverOptions
): Instance[] {
  const instances = tippy(reference, {
    content: tooltip,
    ...new PopoverOptions(options),
  })

  return instances
}

/**
 * 获取数组气泡-单例对象
 */
const getSingleton = (
  reference: string | Element[] | NodeList,
  tooltip?: HTMLElement | string
): CreateSingletonInstance => {
  const instances = setMultiplePopover(reference, tooltip)
  const singleton = createSingleton(instances, {
    delay: 0,
    placement: 'left',
    hideOnClick: false,
    interactive: true,
    arrow: false,
    appendTo: 'parent',
    theme: 'ok-ui',
  })

  return singleton
}

export { createSingleton, getSingleton, setMultiplePopover, setPopover }
export type { CreateSingletonInstance, Instance }
