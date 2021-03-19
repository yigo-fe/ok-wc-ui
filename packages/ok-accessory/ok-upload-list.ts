/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-25 16:18:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-19 02:25:06
 * @FilePath: /packages/ok-accessory/ok-upload-list.ts
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

import { defineComponent, html } from 'ok-lit'

import okUploadCss from './style/upload.less'
import { UploadProps } from './upload.props'
import useAttachmentHandle from './upload-attachment-hook'
defineComponent(
  'ok-upload-list',
  {
    ...UploadProps,
  },
  (props, context) => {
    const {
      fileLists,
      showPreview,
      showDownload,
      showRemove,
      hideUploader,
      uploadFiles,
      handlePreview,
      handleDetele,
      handleDownload,
    } = useAttachmentHandle(props, context)

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
      if (!hideUploader.value)
        return html`
          <div
            class="ok-upload ok-upload--${props.listType}"
            tabindex="0"
            @click=${handleClick}
          >
            <slot>
              <div class="ok-upload-list-btn">点击上传</div>
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

      ${renderUploader()}
      <ok-file-table
        @preview=${handlePreview}
        @delete=${handleDetele}
        @download=${handleDownload}
        .fileList=${fileLists.value}
        .listType=${props.listType}
        .showPreview=${showPreview.value}
        .showDownload=${showDownload.value}
        .showRemove=${showRemove.value}
      ></ok-file-table>
    `
  }
)
