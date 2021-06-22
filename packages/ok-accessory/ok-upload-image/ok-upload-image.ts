/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-25 16:18:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-06-21 16:52:13
 * @FilePath: /packages/ok-accessory/ok-upload-image/ok-upload-image.ts
 */

import { classMap } from 'lit-html/directives/class-map.js'
import { styleMap } from 'lit-html/directives/style-map'
import { debounce } from 'lodash'
import { defineComponent, html, onMounted, onUnmounted, PropType } from 'ok-lit'
import { ref } from 'vue'

import { COMMON_CSS_PATH } from '../../path.config'
import { UploadProps } from '../upload.props'
import useImageHandle from './upload-image-hook'
defineComponent(
  'ok-upload-image',
  {
    ...UploadProps,
    accept: {
      type: String as unknown as PropType<string>,
    },
    limit: {
      type: Number as unknown as PropType<number>,
    },
    imageStyle: {
      type: Object as unknown as PropType<{}>,
    },
  },
  (props, context) => {
    const {
      showPreview,
      showDownload,
      showRemove,
      fileLists,
      hideUploader,
      uploadFiles,
      handlePreview,
      handleDetele,
      handleDownload,
      handleAbort,
      handleRemoveFileList,
      handleReupload,
    } = useImageHandle(props, context)

    const maxImgCount = ref(1)

    // 处理最多能展示多少个tag
    const maxImgCountComput = debounce(() => {
      const el = context.$refs.showUploadImage as HTMLElement
      const elWith = el?.offsetWidth
      if (!elWith) return

      maxImgCount.value = Math.floor((elWith + 8) / 108)
    }, 300)

    onMounted(() => {
      maxImgCountComput()
      window.addEventListener('resize', () => maxImgCountComput(), false)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', () => maxImgCountComput(), false)
    })

    /**
     * 列表上传，点击选择文件
     */
    const handleClick = () => {
      if (!props.disabled) {
        let inputRef = context.$refs.inputRef as HTMLInputElement
        inputRef.value = ''
        inputRef.click()
      }
    }
    /**
     * 列表上传选中文件
     * @param e 选中的文件
     */
    const handleChange = (e: DragEvent) => {
      const files = (e.target as HTMLInputElement).files
      if (!files) return
      uploadFiles(files)
    }

    const renderUploader = () => {
      if (hideUploader.value) return
      const hasMargin =
        fileLists.value.length &&
        fileLists.value.length % maxImgCount.value === 0

      return html`
        <div
          class=${classMap({
            'ok-upload': true,
            'ok-upload-image-box': true,
            disabled: props.disabled,
            'has-margin': hasMargin,
          })}
          style="width: auto;"
          @click=${handleClick}
        >
          <slot>
            <div class="ok-upload-image-inner test123">
              <svg
                t="1615189238946"
                class="upload-img-icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="24594"
                width="40"
                height="40"
              >
                <path
                  d="M469.333333 469.333333V85.333333h85.333334v384h384v85.333334H554.666667v384h-85.333334V554.666667H85.333333v-85.333334z"
                  p-id="24595"
                ></path>
              </svg>
            </div>
          </slot>
          <!-- <span class="upload-img-icon pro-app-page page-addition"> </span> -->
          <input
            style="display: none"
            ref="inputRef"
            class="ok-upload__input"
            type="file"
            .name=${props.name}
            .multiple=${props.multiple}
            .accept=${props.accept}
            @change=${handleChange}
          />
        </div>
      `
    }

    return () => html`
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <div class="ok-upload-imge-root" ref="showUploadImage">
        <ok-file-image
          class="ok-file-image-list"
          @preview=${handlePreview}
          @delete=${handleDetele}
          @download=${handleDownload}
          @abort=${handleAbort}
          @remove=${handleRemoveFileList}
          @reupload=${handleReupload}
          style=${styleMap(props.imageStyle)}
          .fileList=${fileLists.value}
          .listType=${props.listType}
          .showPreview=${showPreview.value}
          .showDownload=${showDownload.value}
          .showRemove=${showRemove.value}
          .thumbStyle=${props.thumbStyle}
          .rowNumber=${maxImgCount.value}
        ></ok-file-image>
        ${renderUploader()}
      </div>
    `
  }
)
