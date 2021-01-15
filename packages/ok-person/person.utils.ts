export interface Person {
  id?: string
  name: string
  deptId?: string
  department: string
  email: string
  avatar: string
  avatar_big?: string
  active?: ACTIVE_TYPE
}

enum ACTIVE_TYPE {
  RESIGN = 0, // 离职
  ACTIVE = 1, // 在职
}
