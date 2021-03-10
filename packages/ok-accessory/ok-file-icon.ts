/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-10 14:22:53
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-10 16:52:01
 * @FilePath: /packages/ok-accessory/ok-file-icon.ts
 */
import { computed, defineComponent, html, onMounted, PropType } from 'ok-lit'
import { createApp, ref } from 'vue'

import ae from '../assets/file-icon/icon_file-ae_colorful.svg'
import ai from '../assets/file-icon/icon_file-ai_colorful.svg'
import android from '../assets/file-icon/icon_file-android_colorful.svg'
import audio from '../assets/file-icon/icon_file-audio_colorful.svg'
import bitable from '../assets/file-icon/icon_file-bitable_colorful.svg'
import code from '../assets/file-icon/icon_file-code_colorful.svg'
import csv from '../assets/file-icon/icon_file-csv_colorful.svg'
// import doc from '../assets/file-icon/icon_file-doc_colorful.svg'
import excel from '../assets/file-icon/icon_file-excel_colorful.svg'
import folder from '../assets/file-icon/icon_file-folder_colorful.svg'
import img from '../assets/file-icon/icon_file-image_colorful.svg'
import ios from '../assets/file-icon/icon_file-ios_colorful.svg'
import keynote from '../assets/file-icon/icon_file-keynote_colorful.svg'
import numbers from '../assets/file-icon/icon_file-numbers_colorful.svg'
import pdf from '../assets/file-icon/icon_file-pdf_colorful.svg'
import ppt from '../assets/file-icon/icon_file-ppt_colorful.svg'
import ps from '../assets/file-icon/icon_file-ps_colorful.svg'
import text from '../assets/file-icon/icon_file-text_colorful.svg'
import unknow from '../assets/file-icon/icon_file-unknow_colorful.svg'
import video from '../assets/file-icon/icon_file-video_colorful.svg'
import word from '../assets/file-icon/icon_file-word_colorful.svg'
import zip from '../assets/file-icon/icon_file-zip_colorful.svg'
import okFileIconCss from './style/ok-file-icon.less'
defineComponent(
  'ok-file-icon',
  {
    type: {
      type: (String as unknown) as PropType<string>,
    },
  },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const type = ref(props.type)

          const fileIcon = computed(() => {
            let icon = ''
            switch (type.value) {
              case 'ae':
                icon = ae
                break
              case 'ai':
                icon = ai
                break
              case 'apk':
                icon = android
                break
              case 'audio':
                icon = audio
                break
              case 'bi':
                icon = bitable
                break
              case 'code':
                icon = code
                break
              case 'ipa':
                icon = ios
                break
              case 'folder':
                icon = folder
                break
              case 'keynote':
                icon = keynote
                break
              case 'png':
              case 'jpg':
              case 'jpeg':
              case 'svg':
              case 'bmp':
                icon = img
                break
              case 'doc':
              case 'docx':
                icon = word
                break
              case 'pdf':
                icon = pdf
                break
              case 'txt':
                icon = text
                break
              case 'xlsx':
              case 'xls':
                icon = excel
                break
              case 'ppt':
              case 'pptx':
                icon = ppt
                break
              case 'ps':
                icon = ps
                break
              case 'numbers':
                icon = numbers
                break
              case 'video':
                icon = video
                break
              case 'csv':
                icon = csv
                break
              case 'zip':
                icon = zip
                break
              default:
                icon = unknow
            }
            return icon
          })

          return {
            fileIcon,
          }
        },
        template: `
          <img :src='fileIcon' class="ok-file-icon-img" />
        `,
      }
      const app = createApp(options)
      app.mount(context.$refs.showFileIcon as HTMLElement)
    })

    return () => html`
      <style>
        ${okFileIconCss}
      </style>
      <span ref="showFileIcon" class="ok-file-icon"></div>
    `
  }
)
