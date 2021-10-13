import { defineCustomElement } from 'vue'
import './assets/styles/common.less'
import okAvatar from './ok-avatar/index.ce.vue'
import okPersonCard from './ok-person-card/index.ce.vue'
import okPersonCell from './ok-person-cell/index.ce.vue'
import okPersonGroup from './ok-person-group/index.ce.vue'
import okEmployeeSelect from './ok-employee-select/index.ce.vue'
import okDepartmentSelect from './ok-department-select/index.ce.vue'
import okTooltip from './ok-tooltip/index.ce.vue'

import okUploadDrag from './ok-accessory/ok-upload-drag/ok-upload-drag.ce.vue'
import okFileList from './ok-accessory/ok-upload-drag/ok-file-list.ce.vue'
import okImagePreview from './ok-accessory/ok-image-preview/index.ce.vue'
import okUploadImage from './ok-accessory/ok-upload-image/ok-upload-image.ce.vue'
import okProgress from './ok-accessory/ok-progress.ce.vue'
import okFileImage from './ok-accessory/ok-upload-image/ok-file-image.ce.vue'
import okUploadSubtableFile from './ok-accessory/ok-upload-subtable/ok-upload-subtable-file.ce.vue'
import okUploadSubtableImage from './ok-accessory/ok-upload-subtable/ok-upload-subtable-image.ce.vue'
import okFileIcon from './ok-accessory/ok-file-icon.ce.vue'
import okUploadTable from './ok-accessory/ok-upload-table/ok-upload-table.ce.vue'
import okFileTable from './ok-accessory/ok-upload-table/ok-file-table.ce.vue'

console.log(okPersonCard.styles) // ["/* 内联的 css */"]

// 转换为自定义元素构造器
const okAvatarElement = defineCustomElement(okAvatar)
const okPersonCardElement = defineCustomElement(okPersonCard)
const okPersonCellElement = defineCustomElement(okPersonCell)
const okPersonGroupElement = defineCustomElement(okPersonGroup)

const okEmployeeSelectElement = defineCustomElement(okEmployeeSelect)

const okDepartmentSelectElement = defineCustomElement(okDepartmentSelect)

const okTooltipElement = defineCustomElement(okTooltip)

const okUploadDragElement = defineCustomElement(okUploadDrag)
const okFileListElement = defineCustomElement(okFileList)
const okImagePreviewElement = defineCustomElement(okImagePreview)
const okUploadImageElement = defineCustomElement(okUploadImage)
const okProgressElement = defineCustomElement(okProgress)
const okFileImageElement = defineCustomElement(okFileImage)
const okUploadSubtableFileElement = defineCustomElement(okUploadSubtableFile)
const okUploadSubtableImageElement = defineCustomElement(okUploadSubtableImage)
const okFileIconElement = defineCustomElement(okFileIcon)
const okUploadTableElement = defineCustomElement(okUploadTable)
const okFileTableElement = defineCustomElement(okFileTable)

// 注册
customElements.define('ok-avatar', okAvatarElement)
customElements.define('ok-person-card', okPersonCardElement)
customElements.define('ok-person-cell', okPersonCellElement)
customElements.define('ok-person-group', okPersonGroupElement)
customElements.define('ok-employee-select', okEmployeeSelectElement)
customElements.define('ok-department-select', okDepartmentSelectElement)
customElements.define('ok-tooltip', okTooltipElement)
customElements.define('ok-upload-drag', okUploadDragElement)
customElements.define('ok-file-list', okFileListElement)
customElements.define('ok-image-preview', okImagePreviewElement)
customElements.define('ok-upload-image', okUploadImageElement)
customElements.define('ok-progress', okProgressElement)
customElements.define('ok-file-image', okFileImageElement)
customElements.define('ok-upload-subtable-file', okUploadSubtableFileElement)
customElements.define('ok-upload-subtable-image', okUploadSubtableImageElement)
customElements.define('ok-file-icon', okFileIconElement)
customElements.define('ok-upload-table', okUploadTableElement)
customElements.define('ok-file-table', okFileTableElement)
