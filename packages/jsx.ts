import { Person } from './ok-wc-ui'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ok-avatar': OkAvatarAttributes // 人员头像
      'ok-person': OkPersonAttributes // 人员信息
      'ok-person-detail': OkPersonDetailAttributes // 人员卡片
    }

    interface OkAvatarAttributes {
      person: Person
    }

    interface OkPersonAttributes {
      person: Person
      size: 'large' | 'middle' | 'small'
    }

    interface OkPersonDetailAttributes {
      person: Person
    }
  }
}
