/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-25 16:18:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-02-25 20:32:23
 * @FilePath: /packages/ok-accessory/ok-upload-drag.ts
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

import CDN_PATH from '../path.config'
import okUploadCss from './style/upload.less'
import { UploadProps } from './upload.props'
import useFileHandle from './upload-hook'
defineComponent(
  'ok-upload-drag',
  {
    ...UploadProps,
  },
  (props, context) => {
    const {
      fileLists,
      displayFileList,
      uploadFiles,
      handlePreview,
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
    /**
     * 拖拽上传选择文件
     * @param e emit事件
     */
    const dragFiles = (e: CustomEvent) => {
      uploadFiles(e.detail)
    }

    return () => html`
      <style>
        ${okUploadCss}
      </style>
      <link rel="stylesheet" .href="${CDN_PATH}common.css" />
      <!-- <h3>this is h3</h3> -->
      <!-- <span class="ok-test-css">this is test css</span> -->
      <!-- <h3>测试background</h3> -->
      <!-- <div class="test-bg"></div> -->
      <div class="ok-upload ok-upload--drag" @click=${handleClick}>
        <ok-upload-dragger
          .accept=${props.accept}
          .disabled=${props.disabled}
          @file=${dragFiles}
        >
          <div class="upload-tip">
            将文件拖拽至此，或<span class="upload-btn">点击上传</span>
          </div>
        </ok-upload-dragger>

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

      <ok-file-list
        @preview=${handlePreview}
        @delete=${handleDetele}
        @download=${handleDownload}
        .fileList=${fileLists.value}
        .listType=${props.listType}
      ></ok-file-list>
    `
  }
)
