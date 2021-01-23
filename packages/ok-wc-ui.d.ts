import { Instance, PopperElement, Props } from 'tippy.js'

import { ACTIVE_TYPE } from './enum'

interface Person {
  id?: string
  name: string
  deptId?: string
  department: string
  email: string
  avatar: string
  avatarBig?: string
  active?: ACTIVE_TYPE
}

type POPOVER_PLACEMENT =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'bottom'
  | 'right'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end'

export { Person, POPOVER_PLACEMENT }
