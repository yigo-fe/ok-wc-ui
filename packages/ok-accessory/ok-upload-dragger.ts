/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-25 15:53:09
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-22 14:32:00
 * @FilePath: /packages/ok-accessory/ok-upload-dragger.ts
 */

import { classMap } from 'lit-html/directives/class-map.js'
import { defineComponent, html, PropType, ref } from 'ok-lit'

import okUploadDragCss from './style/ok-upload-dragger.less'

defineComponent(
  'ok-upload-dragger',
  {
    disabled: {
      type: (Boolean as unknown) as PropType<boolean>,
      default: false,
    },
    accept: {
      type: (String as unknown) as PropType<string>,
      default: '',
    },
  },
  (props, context) => {
    const dragover = ref(false)
    const onDrop = (e: DragEvent) => {
      e.preventDefault()
      if (props.disabled) return
      let files = (e.dataTransfer as DataTransfer).files
      // 更改拖拽中状态
      dragover.value = false

      const accept = props.accept

      if (!accept) {
        context.emit('file', files)
        return
      }

      // 根据accept过滤符合条件的文件
      const acceptedFiles = Array.from(files).filter(file => {
        const { type, name } = file
        const extension =
          name.indexOf('.') > -1 ? `.${name.split('.').pop()}` : ''
        const baseType = type.replace(/\/.*$/, '')
        return accept
          .split(',')
          .map(type => type.trim())
          .filter(type => type)
          .some(acceptedType => {
            if (acceptedType.startsWith('.')) {
              return extension === acceptedType
            }
            if (/\/\*$/.test(acceptedType)) {
              return baseType === acceptedType.replace(/\/\*$/, '')
            }
            if (/^[^/]+\/[^/]+$/.test(acceptedType)) {
              return type === acceptedType
            }
            return false
          })
      })

      if (!acceptedFiles.length) {
        console.warn('文件格式不正确')
      }

      context.emit('file', acceptedFiles)
    }

    const onDragover = (e: DragEvent) => {
      e.preventDefault()
      if (!props.disabled) dragover.value = true
    }

    const onDragleave = (e: DragEvent) => {
      e.preventDefault()
      dragover.value = false
    }

    return () => html`
      <style>
        ${okUploadDragCss}
      </style>
      <div
        class="ok-upload-dragger ${classMap({
          dragover: dragover.value,
          disabled: props.disabled,
        })}"
        @drop=${onDrop}
        @dragover=${onDragover}
        @dragleave=${onDragleave}
      >
        <slot></slot>
      </div>
    `
  }
)
