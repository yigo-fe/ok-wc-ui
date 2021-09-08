/* eslint-disable no-unused-vars */
import { SIZE_TYPE } from './enum'
import { Person, POPOVER_PLACEMENT } from './ok-wc-ui'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ok-avatar': OkAvatarAttributes // 人员头像
      'ok-person-group': OkPersonGroupAttributes // 人员信息组
      'ok-popper': OkPopoverAttributes // 弹层
    }

    interface OkAvatarAttributes {
      person: Person
    }

    interface OkPersonGroupAttributes {
      person: Array<Person>
      size: SIZE_TYPE
    }
    interface OkPersonAttributes {
      person: Person
      size: SIZE_TYPE
    }

    interface OkPopoverAttributes {
      zIndex: String
      placement: POPOVER_PLACEMENT
      delayShow: number
    }
    interface OkPersonDetailAttributes {
      person: Person
    }
  }

  interface Window {
    // ok-wc-ui 配置
    okuiConfig: {
      env?: string // 环境配置 DEV PRD
      apiPath: string // 接口地址
      sourceHost?: string
      basePath?: string
      cardPath?: string
      options?: {
        preview?: boolean
      }
      locale?: string
      theme?: string
    }
  }
}
