/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-04-08 11:33:25
 * @LastEditors: 付静
 * @LastEditTime: 2021-04-08 13:46:45
 * @FilePath: /packages/ok-person-card/props.ts
 */
const props = {
  // tenantKey表示外部租户账号，若传入有值则默认为外部账号
  personInfo: {
    type: [Object, String],
    default() {
      return {}
    },
  },
  // 国际化，支持zh/en/ja
  i18n: {
    type: String,
    // false
    default: 'zh',
  },
  // 卡片出现位置
  placement: {
    type: String,
    // right
    default: 'right',
  },
  // 是否将弹窗放置到body层
  transfer: {
    type: Boolean,
    // false
    default: false,
  },
  // 是否显示上级信息
  showLeader: {
    type: Boolean,
    default: true,
  },
  // 是否显示部门
  showTeam: {
    type: Boolean,
    default: true,
  },
  hideLark: {
    type: Boolean,
    default: false,
  },
  // 平台类型
  msgRelationType: {
    type: String,
    default: '',
  },
  options: {
    type: Object,
    default() {
      return {
        employee_name: 'name',
        email: 'email',
        department_name: 'org_name',
        avatar_url: 'avatar',
        employee_id: 'id',
        terminated: 'terminated',
        leaderName: 'leaderName',
        gender: 'gender',
        openId: '',
      }
    },
  },
  avatarSize: {
    type: String,
    default: 'small',
  },
  toOpenId: {
    type: String,
  },
  isAwaken: {
    type: Boolean,
  },
}

export default props
