/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-26 16:06:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-06-22 14:47:34
 * @FilePath: /packages/ok-accessory/ok-upload-image/ok-file-image.ts
 */

import { classMap } from 'lit-html/directives/class-map.js'
import { StyleInfo, styleMap } from 'lit-html/directives/style-map'
import { defineComponent, html, PropType } from 'ok-lit'

import { i18n } from '../../locales'
import { COMMON_CSS_PATH } from '../../path.config'
import type { ListType, UploadFile, UploadStatus } from '../upload.type'
defineComponent(
  'ok-file-image',
  {
    fileList: {
      type: Array as unknown as PropType<UploadFile[]>,
      default: () => [] as UploadFile[],
    },
    listType: {
      type: String as unknown as PropType<ListType>,
      default: 'text',
    },
    disabled: {
      type: Boolean as unknown as PropType<boolean>,
    },
    showProgress: {
      type: Boolean as unknown as PropType<boolean>,
    },
    showPreview: {
      type: Boolean as unknown as PropType<boolean>,
    },
    showDownload: {
      type: Boolean as unknown as PropType<boolean>,
    },
    showRemove: {
      type: Boolean as unknown as PropType<boolean>,
    },
    thumbStyle: {
      type: Object as unknown as PropType<StyleInfo>,
      default: {},
    },
    rowNumber: {
      type: Number as unknown as PropType<number>,
    },
  },
  (props, context) => {
    /**
     * 点击删除文件
     * @param file 要删除的文件
     */
    // const handleDelete = (file: UploadFile) => {
    //   context.emit('delete', file)
    // }

    const handlePreview = (file: UploadFile) => {
      context.emit('preview', file)
    }

    const handleDownload = (file: UploadFile) => {
      context.emit('download', file)
    }

    // 重新上传
    const reupload = (file: UploadFile) => {
      context.emit('reupload', file.raw)
    }

    // 上传中， 上传失败 的关闭按钮
    const handleCloseClick = (file: UploadFile, status: UploadStatus) => {
      // 上传中： 终止上传； 上传失败： 从传输列表中移除
      const event = status === 'uploading' ? 'abort' : 'remove'
      context.emit(event, file)
    }

    const handleRemove = (file: UploadFile) => {
      const event = file.status === 'fail' ? 'remove' : 'delete'
      context.emit(event, file)
    }

    const renderProgress = (file: any) => {
      // if (file.status === 'uploading') {
      //   return renderUploading(file)
      // } else if (file.status === 'fail') {
      //   return renderUploadFail(file)
      // }

      if (file.status === 'uploading' || file.status === 'fail') {
        return renderUpload(file)
      }
    }

    const uploadFailText = i18n.$t('common.uploadFail', '上传失败')

    // /**
    //  * 根据上传状态判断是否展示进度条
    //  * @param item 当前文件
    //  */
    // const renderUploading = (file: any) => {
    //   let p = file.percentage || 0
    //   const percentage = `${parseInt(p.toFixed(), 10)}%`
    //   return html`
    //     <div class="ok-process-wraper ok-image-uploading" style="position: absolute; top:0;">
    //       <span
    //         class="image-close-btn"
    //         @click=${() => handleCloseClick(file, file.status)}">
    //         <svg
    //           t="1616573273136"
    //           class="icon abort-icon"
    //           viewBox="0 0 1024 1024"
    //           version="1.1"
    //           xmlns="http://www.w3.org/2000/svg"
    //           p-id="27041"
    //           width="12"
    //           height="12"
    //         >
    //           <path
    //             d="M512 451.669333L813.696 149.952l60.352 60.352L572.330667 512l301.717333 301.696-60.352 60.352L512 572.330667 210.304 874.048l-60.352-60.352L451.669333 512 149.952 210.304l60.352-60.352L512 451.669333z"
    //             p-id="27042"
    //           ></path>
    //         </svg>
    //       </span>
    //       <div class="image-process-wraper">
    //         <span class="percentage-text">${percentage}</span>
    //         <ok-progress
    //           class="image-progress"
    //           .percentage=${file.percentage}
    //           .status=${file.status}
    //         ></ok-progress>
    //       </div>
    //     </div>
    //   `
    // }

    // 上传失败
    // const renderUploadFail = (file: any) => {
    //   return html`
    //     <div
    //       class="ok-process-wraper ok-image-fail"
    //       style="position: absolute; top:0;"
    //     >
    //       <div class="image-process-wraper">
    //         <span class="upload-fail-text">${uploadFailText}</span>
    //         <ok-progress
    //           class="image-progress"
    //           .percentage=${file.percentage}
    //           .status=${file.status}
    //         ></ok-progress>
    //       </div>
    //     </div>
    //   `
    // }

    const renderCloseBtn = (file: any) => {
      return html`
          <span
            class="image-close-btn"
            @click=${() => handleCloseClick(file, file.status)}">
            <svg
              t="1616573273136"
              class="icon abort-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="27041"
              width="12"
              height="12"
            >
              <path
                d="M512 451.669333L813.696 149.952l60.352 60.352L572.330667 512l301.717333 301.696-60.352 60.352L512 572.330667 210.304 874.048l-60.352-60.352L451.669333 512 149.952 210.304l60.352-60.352L512 451.669333z"
                p-id="27042"
              ></path>
            </svg>
          </span>
      `
    }

    /**
     * 根据上传状态判断是否展示进度条
     * @param item 当前文件
     */
    const renderUpload = (file: any) => {
      let p = file.percentage || 0
      const percentage = `${parseInt(p.toFixed(), 10)}%`
      return html`
        <div
          class=${classMap({
            'ok-process-wraper': true,
            'ok-image-uploading': file.status === 'uploading',
            'ok-image-fail': file.status === 'fail',
          })}
          style="position: absolute; top:0;"
        >
          ${file.status === 'uploading' ? renderCloseBtn(file) : ''}
          <div class="image-process-wraper">
            <span
              class=${classMap({
                'ok-image-process-msg': true,
                fail: file.status === 'fail',
              })}
              >${file.status === 'uploading'
                ? percentage
                : uploadFailText}</span
            >
            <ok-progress
              class="image-progress"
              .percentage=${file.percentage}
              .status=${file.status}
            ></ok-progress>
          </div>
        </div>
      `
    }

    const renderImage = (file: any) => {
      if (!file?.response?.data[0]?.thumb_url) return
      return html`
        <img
          class="ok-upload-list__item-thumbnail"
          .src=${file.response.data[0].thumb_url}
        />
      `
    }

    const renderPrveiew = (item: UploadFile) => {
      if (props.showPreview)
        return html`
          <i class="operation-icon" @click=${() => handlePreview(item)}>
            <svg
              t="1615028632085"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="24342"
              width="20"
              height="20"
            >
              <path
                d="M511.381333 768c130.474667 0 251.306667-81.109333 363.285334-256.512C765.546667 336.725333 645.013333 256 511.381333 256 377.813333 256 257.706667 336.682667 149.333333 511.488 260.586667 686.912 380.949333 768 511.381333 768zM511.36 170.666667C687.189333 170.666667 836.736 284.458667 960 512.064 833.344 739.584 683.797333 853.333333 511.338667 853.333333S189.76 739.584 64 512.064C186.368 284.458667 335.488 170.666667 511.338667 170.666667zM512 341.333333a170.666667 170.666667 0 1 0 0 341.333334 170.666667 170.666667 0 0 0 0-341.333334z m0 85.333334a85.333333 85.333333 0 1 1 0 170.666666 85.333333 85.333333 0 0 1 0-170.666666z"
                fill="#fff"
                p-id="24343"
              ></path>
            </svg>
          </i>
        `
    }

    const renderDownload = (item: UploadFile) => {
      if (props.showDownload) {
        const response: any = item.response
        const download_url =
          response && response.data ? response.data[0].download_url : ''
        return html`
          <a
            class="operation-icon"
            @click=${() => handleDownload(item)}
            .href=${download_url}
            download
          >
            <svg
              t="1615028599608"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="24216"
              width="20"
              height="20"
            >
              <path
                d="M917.312 682.688V896a42.688 42.688 0 0 1-42.624 42.688H149.312A42.688 42.688 0 0 1 106.688 896v-213.312H192v170.624h640v-170.624h85.312z m-362.624-83.84l203.84-203.84 60.352 60.288-301.696 301.76-301.696-301.76 60.352-60.288 193.472 193.472V85.312h85.376v513.536z"
                p-id="24217"
                fill="#fff"
              ></path>
            </svg>
          </a>
        `
      }
    }

    const renderRemove = (item: UploadFile) => {
      if (props.showRemove)
        return html` <i
          class="operation-icon"
          @click=${() => handleRemove(item)}
        >
          <svg
            t="1615028657246"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="24468"
            width="20"
            height="20"
          >
            <path
              d="M235.63571416 340.55v532.41428584h552.53571417V340.55h66.66428583v535.75714248a64.28571416 64.28571416 0 0 1-64.28571416 64.28571504H233.45a64.28571416 64.28571416 0 0 1-64.28571416-64.28571504V340.55H235.57142832z m225.9 85.75714248V769.14285752H394.87142832V426.30714248h66.66428584z m164.63571416 0V769.14285752H564.07142832V426.30714248h62.16428584zM640.57142832 83.40714248v85.75714336h257.14285752V238.78571416H126.28571416V169.16428584h257.14285752V83.40714248h257.14285665z"
              p-id="24469"
              fill="#fff"
            ></path>
          </svg>
        </i>`
    }

    // 重新上传
    const handleReupload = (item: UploadFile) => {
      return html` <i class="operation-icon" @click=${() => reupload(item)}>
        <svg
          t="1622688547794"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="40154"
          width="20"
          height="20"
        >
          <path
            d="M512.3 878.8c-201.6 0-365.5-164-365.5-365.5 0-24.7 20-44.6 44.6-44.6s44.6 20 44.6 44.6c0 152.3 123.9 276.3 276.3 276.3 86.7 0 166.7-39.5 219.4-108.4 15-19.6 43-23.3 62.6-8.3s23.3 43 8.3 62.6c-69.8 91-175.7 143.3-290.3 143.3zM833.2 557.9c-24.7 0-44.6-20-44.6-44.6 0-152.4-123.9-276.3-276.3-276.3-86.3 0-166 39.2-218.8 107.6-15.1 19.5-43.1 23.1-62.6 8-19.5-15.1-23.1-43.1-8.1-62.6 69.8-90.5 175.4-142.3 289.5-142.3 201.6 0 365.6 164 365.6 365.6-0.1 24.6-20 44.6-44.7 44.6z"
            fill="#fff"
            p-id="40155"
          ></path>
          <path
            d="M833.2 599.6c-11.4 0-22.8-4.4-31.6-13.1l-80.8-80.8c-12.8-12.8-16.6-32-9.7-48.6 6.9-16.7 23.2-27.6 41.2-27.6H914c18.1 0 34.3 10.9 41.2 27.6 6.9 16.7 3.1 35.9-9.7 48.6l-80.8 80.8c-8.7 8.7-20.1 13.1-31.5 13.1zM272.2 598.3H110.5c-18.1 0-34.3-10.9-41.2-27.6-6.9-16.7-3.1-35.9 9.7-48.6l80.8-80.8c8.4-8.4 19.7-13.1 31.6-13.1 11.8 0 23.2 4.7 31.6 13.1l80.8 80.8c12.8 12.8 16.6 32 9.7 48.6s-23.2 27.6-41.3 27.6z"
            fill="#fff"
            p-id="40156"
          ></path>
        </svg>
      </i>`
    }

    const renderOperation = (file: any) => {
      if (file.status === 'fail') {
        return html`
          <span class="ok-upload-list__item-actions">
            ${handleReupload(file)} ${renderRemove(file)}
          </span>
        `
      } else if (file?.response?.data[0].thumb_url) {
        return html`
          <span
            class="ok-upload-list__item-actions"
            v-show="file.response.data[0].thumb_url"
          >
            ${renderPrveiew(file)} ${renderDownload(file)} ${renderRemove(file)}
          </span>
        `
      }
    }

    const renderListItem = (item: any) => {
      return html`
        ${renderProgress(item)} ${renderImage(item)} ${renderOperation(item)}
      `
    }

    return () => html`
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <ul ref="okUploadImage" class="ok-upload-list-image">
        ${props.fileList.map(
          (item, index) => html` <li
            class=${classMap({
              'ok-upload-list__item': true,
              disabled: props.disabled,
              last: (index + 1) % props.rowNumber === 0,
              'is-uploading': item.status === 'uploading',
              'is-success': item.status === 'success',
              'is-fail': item.status === 'fail',
            })}
            style=${styleMap(props.thumbStyle)}
          >
            ${renderListItem(item)}
          </li>`
        )}
      </ul>
    `
  }
)
