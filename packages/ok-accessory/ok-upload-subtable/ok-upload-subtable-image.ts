/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-25 16:18:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-12 15:23:16
 * @FilePath: /packages/ok-accessory/ok-upload-subtable/ok-upload-subtable-image.ts
 */

/**
 * drag
 * listType: text / picture
 * disabled
 * accept
 * limit
 * filelist
 * multiple
 * action
 * data
 *
 * on-exceed
 * before-upload
 * on-change
 * on-success
 *
 * file-list 相关操作：
 * download： show ?
 * preview
 * delete：showdelete(目前默认readonly状态不能delete) ？ before-delete ？
 *
 * readonly ? (涉及file-list操作通用功能)
 *
 * 上传成功之后展示filelist的数据格式
 *
 */

import { classMap } from 'lit-html/directives/class-map.js'
import { defineComponent, html, PropType } from 'ok-lit'

import { i18n } from '../../locales'
import { COMMON_CSS_PATH } from '../../path.config'
import useImageHandle from '../ok-upload-image/upload-image-hook'
import okUploadCss from '../style/upload.less'
import { UploadProps } from '../upload.props'
defineComponent(
  'ok-upload-subtable-image',
  {
    ...UploadProps,
    maxHeight: {
      type: String as unknown as PropType<string>,
      default: '180px',
    },
    type: {
      type: String as unknown as PropType<string>,
    },
    accept: {
      type: String as unknown as PropType<string>,
    },
  },
  (props, context) => {
    const {
      showPreview,
      showDownload,
      showRemove,
      fileLists,
      hideUploader,
      disabled,
      uploadFiles,
      handlePreview,
      handleDetele,
      handleDownload,
      handleAbort,
      handleRemoveFileList,
    } = useImageHandle(props, context)

    /**
     * 列表上传，点击选择文件
     */
    const handleClick = () => {
      if (!disabled.value) {
        let inputRef = context.$refs.inputRef as HTMLInputElement
        inputRef.value = ''
        inputRef.click()
      }
    }
    /**
     * 点击上传选中文件
     * @param e 选中的文件
     */
    const handleChange = (e: DragEvent) => {
      const files = (e.target as HTMLInputElement).files
      if (!files) return
      uploadFiles(files)
    }

    const renderUploader = () => {
      if (!hideUploader.value)
        return html`
          <div class="ok-upload ok-upload--subtable" @click=${handleClick}>
            <slot>
              <div
                class=${classMap({
                  'upload-subtable-inner': true,
                  disabled: props.disabled,
                  'has-file': fileLists.value,
                })}
              >
                <svg
                  t="1616578828719"
                  class="icon upload-icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="27171"
                  width="16"
                  height="16"
                >
                  <path
                    d="M917.333333 682.666667v213.333333a42.666667 42.666667 0 0 1-42.666666 42.666667H149.333333a42.666667 42.666667 0 0 1-42.666666-42.666667V682.666667h85.333333v170.666666h640v-170.666666h85.333333zM554.666667 243.498667l203.861333 203.882666 60.352-60.352L517.184 85.333333 215.466667 387.029333l60.330666 60.352L469.333333 253.866667v503.168h85.333334V243.498667z"
                    p-id="27172"
                  ></path>
                </svg>
                <span class="upload-text"
                  >${i18n.$t(
                    'control.imageUpload.uploadBtnText',
                    '上传图片'
                  )}</span
                >
              </div>
            </slot>

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
      <style>
        ${okUploadCss}
      </style>
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <ok-file-list
        @preview=${handlePreview}
        @delete=${handleDetele}
        @download=${handleDownload}
        @abort=${handleAbort}
        @remove=${handleRemoveFileList}
        .fileList=${fileLists.value}
        .listType=${props.listType}
        .showPreview=${showPreview.value}
        .showDownload=${showDownload.value}
        .showRemove=${showRemove.value}
        .maxHeight=${props.maxHeight}
        .subtable=${true}
      ></ok-file-list>
      ${renderUploader()}
    `
  }
)
