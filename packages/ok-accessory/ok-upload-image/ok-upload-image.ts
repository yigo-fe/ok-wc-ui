/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-25 16:18:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-04-16 20:45:28
 * @FilePath: /packages/ok-accessory/ok-upload-image/ok-upload-image.ts
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

import CDN_PATH from '../../path.config'
// import okUploadImgCss from '../style/ok-upload-image.less'
import { UploadProps } from '../upload.props'
import useImageHandle from './upload-image-hook'
defineComponent(
  'ok-upload-image',
  {
    ...UploadProps,
    accept: {
      type: (String as unknown) as PropType<string>,
      default: '.jpg,.jpeg,.gif,.tif,.tiff,.bmp,.png,.svg',
    },
    limit: {
      type: (Number as unknown) as PropType<number>,
      default: 10,
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
    } = useImageHandle(props, context)

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
            class=${classMap({
              'ok-upload': true,
              'ok-upload-image': true,
              disabled: props.disabled,
            })}
            @click=${handleClick}
          >
            <slot>
              <div class="ok-upload-image-inner">
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
      <link rel="stylesheet" .href="${CDN_PATH}common.css" />
      <ok-file-image
        class="ok-file-image-list"
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
        .thumbStyle=${props.thumbStyle}
      ></ok-file-image>
      ${renderUploader()}
    `
  }
)
