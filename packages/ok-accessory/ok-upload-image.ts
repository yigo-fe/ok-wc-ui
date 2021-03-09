/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-25 16:18:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-08 15:43:58
 * @FilePath: /packages/ok-accessory/ok-upload-image.ts
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

import { defineComponent, effect, html } from 'ok-lit'

import CDN_PATH from '../path.config'
import okUploadImgCss from './style/ok-upload-image.less'
import { UploadProps } from './upload.props'
import useFileHandle from './upload-hook'
defineComponent(
  'ok-upload-image',
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
    effect(() => {
      displayFileList()
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

    return () => html`
      <style>
        ${okUploadImgCss} .icon {
          display: block;
          height: 100px;
          line-height: 100px;
          font-size: 42px;
          margin: 10px auto;
          color: #333;
          transition: font-size 0.25s linear, width 0.25s linear;
        }
      </style>
      <link rel="stylesheet" .href="${CDN_PATH}common.css" />
      <link
        rel="stylesheet"
        type="text/css"
        .href="${CDN_PATH}iconfont/iconfont.css"
      />
      <ok-file-image
        @preview=${handlePreview}
        @delete=${handleDetele}
        @download=${handleDownload}
        .fileList=${fileLists.value}
        .listType=${props.listType}
      ></ok-file-image>
      <div class="ok-upload ok-upload-image" @click=${handleClick}>
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
            fill="#d9d9d9"
          ></path>
        </svg>
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
)
