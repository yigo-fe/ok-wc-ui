export interface Person {
  id?: string
  name: string
  userName: string
  deptId?: string
  orgName: string
  email: string
  headImage: string
  active?: ACTIVE_TYPE
}

enum ACTIVE_TYPE {
  RESIGN = 0, // 离职
  ACTIVE = 1, // 在职
}
