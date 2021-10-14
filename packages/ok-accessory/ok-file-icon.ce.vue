<template>
  <span ref="showFileIcon" class="ok-file-icon ok-file-icon-root">
    <img :src='fileIcon' :style="{height: height, width: 'auto', 'vertical-align':'middle'}" class="ok-file-icon-img" :class="{'hover-bigger': hoverBigger}" />
  </span>
</template>
<script lang="ts">
  import { defineComponent, onMounted, PropType, computed } from 'vue'

  import ae from '../assets/file-icon/icon_file-ae_colorful.svg'
  import ai from '../assets/file-icon/icon_file-ai_colorful.svg'
  import android from '../assets/file-icon/icon_file-android_colorful.svg'
  import audio from '../assets/file-icon/icon_file-audio_colorful.svg'
  import bitable from '../assets/file-icon/icon_file-bitable_colorful.svg'
  import code from '../assets/file-icon/icon_file-code_colorful.svg'
  import csv from '../assets/file-icon/icon_file-csv_colorful.svg'
  import excel from '../assets/file-icon/icon_file-excel_colorful.svg'
  import folder from '../assets/file-icon/icon_file-folder_colorful.svg'
  import img from '../assets/file-icon/icon_file-image_colorful.svg'
  import ios from '../assets/file-icon/icon_file-ios_colorful.svg'
  import keynote from '../assets/file-icon/icon_file-keynote_colorful.svg'
  import mindnode from '../assets/file-icon/icon_file-mindnote_colorful.svg'
  import pages from '../assets/file-icon/icon_file-nages_colorful.svg'
  import numbers from '../assets/file-icon/icon_file-numbers_colorful.svg'
  import pdf from '../assets/file-icon/icon_file-pdf_colorful.svg'
  import ppt from '../assets/file-icon/icon_file-ppt_colorful.svg'
  import ps from '../assets/file-icon/icon_file-ps_colorful.svg'
  import sketch from '../assets/file-icon/icon_file-sketch_colorful.svg'
  import sld from '../assets/file-icon/icon_file-slide_colorful.svg'
  import text from '../assets/file-icon/icon_file-text_colorful.svg'
  import unknow from '../assets/file-icon/icon_file-unknow_colorful.svg'
  import video from '../assets/file-icon/icon_file-video_colorful.svg'
  import word from '../assets/file-icon/icon_file-word_colorful.svg'
  import zip from '../assets/file-icon/icon_file-zip_colorful.svg'
  // import okFileIconCss from './style/ok-file-icon.less'
  import { COMMON_CSS_PATH } from '../path.config'
  export default defineComponent({
    props: {
      type: {
        type: String as unknown as PropType<string>,
      },
      hoverBigger: {
        type: Boolean as unknown as PropType<boolean>,
      },
      height: {
        type: String as unknown as PropType<string>,
      },
    },
    setup(props) {
      const suffix = computed(() => props.type)
      const hoverBigger = computed(() => props.hoverBigger)
      const height = computed(() => props.height || '22px')

      const fileIcon = computed(() => {
        let icon = ''
        switch (suffix.value) {
          case 'ae':
            icon = ae
            break
          case 'ai':
            icon = ai
            break
          case 'apk':
            icon = android
            break
          case 'ac3':
          case 'au':
          case 'mp2':
          case 'mp3':
          case 'ogg':
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
          case 'key':
            icon = keynote
            break
          case 'dwg':
          case 'gif':
          case 'dxf':
          case 'jp2':
          case 'jpe':
          case 'jpeg':
          case 'jpg':
          case 'svf':
          case 'tif':
          case 'tiff':
          case 'png':
          case 'bmp':
          case 'svg':
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
          case 'pages':
            icon = pages
            break
          case 'sketch':
            icon = sketch
            break
          case 'sld':
            icon = sld
            break
          case 'mindnode':
            icon = mindnode
            break
          case 'numbers':
            icon = numbers
            break
          case '3gpp':
          case 'mp4':
          case 'mpeg':
          case 'mpg':
          case 'mov':
          case 'asf':
            icon = video
            break
          case 'csv':
            icon = csv
            break
          case 'zip':
          case 'rar':
            icon = zip
            break
          default:
            icon = unknow
        }
        return icon
      })

      return {
        fileIcon,
        hoverBigger,
        height,
      }
    },
  })

</script>

<style lang="less">
  @import url('../assets/styles/common.less');
</style>
