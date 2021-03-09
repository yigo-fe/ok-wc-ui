/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-25 15:53:09
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-06 18:35:42
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
            <svg
            t="1615026805397"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7786"
            width="200"
            height="200"
          >
            <path
              d="M948.069961 416.274443C898.889858 364.459691 833.462757 331.965695 762.766359 324.939966c-44.789022-118.998285-144.027444-190.133791-284.981132-190.133791-183.108062-2.19554-315.718696 137.001715-324.939966 310.888508-44.789022 14.490566-81.234991 42.593482-109.777015 82.552315-28.542024 39.519726-43.910806 87.382504-43.03259 136.123499 0 62.353345 21.077187 115.48542 63.670669 161.152659 43.03259 45.22813 93.090909 68.06175 151.931389 68.06175h92.212693c19.320755 0 32.054889-14.490566 32.054888-31.615781 0.439108-16.686106-12.734134-31.176672-29.859348-31.61578H216.076822c-40.83705 0-76.843911-16.686106-107.581475-49.180103-29.42024-31.61578-45.667238-73.331046-44.789022-116.363637 0-39.519726 12.295026-74.64837 36.885077-106.26415 25.02916-31.61578 54.888508-50.058319 90.017152-56.205832l28.981132-4.830189-2.19554-29.859348h-0.878216c0-153.687822 104.068611-269.173242 262.147513-269.173242 118.998285 0 195.842196 55.327616 230.97084 166.421955l7.025729 21.955403 22.83362 0.878217c60.157804 0.878216 111.972556 21.955403 155.883361 64.109777C939.726908 493.996569 961.682311 544.493997 961.682311 602.456261c3.073756 107.581475-75.087479 230.092624-181.790738 227.897084h-194.524871c-2.19554 0-4.391081 0-6.586621-0.439108-33.811321-2.634648-61.036021-28.981132-65.427101-62.792453h-0.878216v-173.886793l70.25729 76.843911c8.782161 8.782161 22.833619 11.855918 32.054888 3.073757l7.903945-4.830189c8.782161-10.538593 8.782161-24.590051 0-33.372213L505.009927 506.291595v-0.878216l-8.343054-7.903945c-9.221269-8.782161-23.711835-8.782161-32.933104 0l-7.903945 7.903945v0.878216L339.905295 632.315609c-8.782161 8.782161-8.782161 22.833619 0 33.811321l8.343054 5.269296c8.782161 8.782161 21.955403 5.708405 32.933104-3.073756l68.06175-75.087479-0.878216 173.886793c0 3.951973 0 7.464837 0.439108 11.416809v2.195541c0 59.718696 57.084048 112.411664 116.802744 112.411664H780.330681c160.274443-6.147513 243.704974-153.687822 243.704975-290.689537 0.878216-69.818182-26.346484-137.001715-75.965695-186.181818z"
              p-id="7787"
              fill="#1296db"
            ></path>
          </svg>
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