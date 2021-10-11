import { defineCustomElement } from 'vue'
import './assets/styles/common.less'
import okAvatar from './ok-avatar/index.ce.vue'
import okPersonCard from './ok-person-card/index.ce.vue'
import okPersonCell from './ok-person-cell/index.ce.vue'
import okPersonGroup from './ok-person-group/index.ce.vue'
import okEmployeeSelect from './ok-employee-select/index.ce.vue'
import okDepartmentSelect from './ok-department-select/index.ce.vue'

console.log(okPersonCard.styles) // ["/* 内联的 css */"]

// 转换为自定义元素构造器
const okAvatarElement = defineCustomElement(okAvatar)
const okPersonCardElement = defineCustomElement(okPersonCard)
const okPersonCellElement = defineCustomElement(okPersonCell)
const okPersonGroupElement = defineCustomElement(okPersonGroup)
const okEmployeeSelectElement = defineCustomElement(okEmployeeSelect)
const okDepartmentSelectElement = defineCustomElement(okDepartmentSelect)

// 注册
customElements.define('ok-avatar', okAvatarElement)
customElements.define('ok-person-card', okPersonCardElement)
customElements.define('ok-person-cell', okPersonCellElement)
customElements.define('ok-person-group', okPersonGroupElement)
customElements.define('ok-employee-select', okEmployeeSelectElement)
customElements.define('ok-department-select', okDepartmentSelectElement)
