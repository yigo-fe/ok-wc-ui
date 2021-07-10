/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-07-09 14:58:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-07-10 13:46:19
 * @FilePath: /packages/ok-accessory/ok-image-preview/index.ts
 */
import { Image } from 'ant-design-vue'
import { defineComponent, html, onMounted, PropType } from 'ok-lit'
import { computed, createApp, ref } from 'vue'

import { ANTD_VUE_CDN, COMMON_CSS_PATH } from '../../path.config'
import { sourceHost } from '../../services/api'
defineComponent(
  'ok-image-preview',
  {
    imgList: {
      type: Array as unknown as PropType<[]>,
    },
  },
  (props, context: any) => {
    onMounted(() => {
      const options = {
        setup() {
          // 处理传入的imgList数据，统一转为数组
          const list = computed(() => {
            let num: any = []
            if (props.imgList) {
              num = Array.isArray(props.imgList)
                ? props.imgList
                : [props.imgList]
            }
            return clearData(num)
          })

          // 清理数据，组装previewURL
          const clearData = (list: any) => {
            return list.map((file: any) => {
              const path = file?.response?.data?.[0].file_path
              // todo 兼容
              let url: any = ''
              if (path && /^\/\//.test(path)) {
                url = path
              } else {
                url = path ? `${sourceHost}/${path}` : ''
              }
              return {
                url,
              }
            })
          }

          // 暴露预览方法
          const imgPreviewBox: any = ref(null)
          const preview = (index: number) => {
            if (index > -1) {
              const el: any =
                imgPreviewBox.value?.querySelectorAll('.ant-image')
              el?.[index]?.click()
            }
          }
          context.expose({ preview })

          return {
            list,
            imgPreviewBox,
          }
        },
        template: `
          <div ref="imgPreviewBox" style="display:none">
            <a-image-preview-group  v-if="list.length">
              <a-image v-for="item in list" :key="item.url" :width="1" :src="item.url" />
            </a-image-preview-group>
          </div>
        `,
      }
      const app = createApp(options)
      app.use(Image)
      app.mount(context.$refs.showImagePreview as HTMLElement)
    })

    return () => html`
      <link rel="stylesheet" .href="${ANTD_VUE_CDN}" />
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <div ref="showImagePreview" class="ok-image-preview-box"></div>
    `
  }
)
