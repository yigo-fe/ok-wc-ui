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

export { Person }
