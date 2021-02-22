/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-25 16:18:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-02-08 13:47:00
 * @FilePath: /packages/ok-accessory/upload.ts
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

import okUploadCss from './upload.less'
import { UploadProps } from './upload.props'
import useFileHandle from './upload-hook'
defineComponent(
  'upload-list',
  {
    ...UploadProps,
  },
  (props, context) => {
    // const reqs = ref({})
    // let fileId = 0
    // const fileLists = ref([] as any)

    const {
      fileLists,
      displayFileList,
      uploadFiles,
      handleOnPreview,
      handleDetele,
      handleDownload,
    } = useFileHandle(props, context)

    displayFileList()

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

    return () => html`
      <style>
        .ok-upload:focus {
          outline: none;
        }
        ${okUploadCss}
      </style>

      <div
        class="ok-upload ok-upload--${props.listType}"
        tabindex="0"
        @click=${handleClick}
      >
        <slot></slot>
        <input
          style="display: none"
          ref="inputRef"
          class="el-upload__input"
          type="file"
          .name=${props.name}
          .multiple=${props.multiple}
          .accept=${props.accept}
          @change=${handleChange}
        />
      </div>
      <ok-upload-list
        @preview=${handleOnPreview}
        @delete=${handleDetele}
        @download=${handleDownload}
        .fileList=${fileLists.value}
        .listType=${props.listType}
      ></ok-upload-list>
    `
  }
)
