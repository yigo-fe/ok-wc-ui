// import { Instance, PopperElement, Props } from 'tippy.js'

import { ACTIVE_TYPE, GENDER_TYPE } from './enum'

interface Person {
  id?: string
  employee_name?: string
  department_id?: string
  department_name?: string
  email?: string
  avatar_url?: string
  avatar_big?: string
  avatar_small: string
  active?: ACTIVE_TYPE
  gender?: GENDER_TYPE
  tenant_id?: string
  phone?: string
  msg_relation_type?: string
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
