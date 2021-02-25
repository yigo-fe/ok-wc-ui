/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-25 15:53:09
 * @LastEditors: 付静
 * @LastEditTime: 2021-02-25 15:34:43
 * @FilePath: /packages/ok-accessory/ok-upload-draggercopy.ts
 */

import { defineComponent, html, onMounted, PropType } from 'ok-lit'
import { createApp, ref } from 'vue'

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
    onMounted(() => {
      const options = {
        setup() {
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
                  if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
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
          return {
            dragover,
            onDrop,
            onDragover,
            onDragleave,
          }
        },
        template: `
        <div
            class="ok-upload-dragger"
            :class="{dragover: dragover}"
            @drop="onDrop"
            @dragover="onDragover"
            @dragleave="onDragleave"
          >
            <div class="upload-tip">
              将文件拖拽至此，或<span class="upload-btn">点击上传</span>
            </div>
          </div>
        `,
      }
      const app = createApp(options)
      app.mount(context.$refs.okUploadDragger as HTMLElement)
    })

    return () => html`
      <style>
        ${okUploadDragCss}
      </style>
      <div ref="okUploadDragger" class="ok-upload-dragger-warp"></div>
    `
  }
)
