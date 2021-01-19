import { SIZE_TYPE } from './enum'
import { Person, POPOVER_PLACEMENT } from './ok-wc-ui'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ok-avatar': OkAvatarAttributes // 人员头像
      'ok-person': OkPersonAttributes // 人员信息
      'ok-person-group': OkPersonGroupAttributes // 人员信息组
      'ok-person-detail': OkPersonDetailAttributes // 人员卡片
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
}
