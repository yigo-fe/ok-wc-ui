/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-26 16:06:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-02-24 17:01:22
 * @FilePath: /packages/ok-accessory/ok-file-list.ts
 */

import { defineComponent, html, PropType } from 'ok-lit'

import CDN_PATH from '../path.config'
import okUploadListCss from './style/ok-file-list.less'
import type { ListType, UploadFile } from './upload.type'
defineComponent(
  'ok-file-list',
  {
    fileList: {
      type: (Array as unknown) as PropType<UploadFile[]>,
      default: () => [] as UploadFile[],
    },
    listType: {
      type: (String as unknown) as PropType<ListType>,
      default: 'text',
    },
    disabled: {
      type: (Boolean as unknown) as PropType<boolean>,
    },
    showProgress: {
      type: (Boolean as unknown) as PropType<boolean>,
    },
  },
  (props, context) => {
    /**
     * 点击删除文件
     * @param file 要删除的文件
     */
    const handleDelete = (file: UploadFile) => {
      context.emit('delete', file)
    }

    const handlePreview = (file: UploadFile) => {
      context.emit('preview', file)
    }

    const handleDownload = (file: UploadFile) => {
      context.emit('download', file)
    }

    /**
     * 根据上传状态判断是否展示进度条
     * @param item 当前文件
     */
    const renderProgress = (item: UploadFile) => {
      if (item.status === 'uploading') {
        return html`
          <ok-progress
            .percentage=${item.percentage}
            .status=${item.status}
          ></ok-progress>
        `
      }
    }
    /**
     * 根据上传状态判断是否展示删除按钮
     * @param item 当前文件
     */
    const renderClose = (item: UploadFile) => {
      if (item.status === 'success') {
        return html`
          <i class="ok-icon-close preview" @click=${() => handlePreview(item)}>
            预览
          </i>
          <i class="ok-icon-close" @click=${() => handleDelete(item)}> 删除 </i>
          <i
            class="ok-icon-close download"
            @click=${() => handleDownload(item)}
          >
            下载
          </i>
        `
      }
    }

    const renderListItem = (item: UploadFile) => {
      if (props.listType === 'text') {
        return html`
          <span class="ok-file-list__item-name"> ${item.name} </span>
        `
      } else if (props.listType === 'picture') {
        return html`
          <img
            class="ok-file-list__item-thumbnail"
            .src=${item.response}
            alt=""
          />
        `
      }
    }

    return () => html`
      <style>
        ${okUploadListCss}
      </style>
      <link rel="stylesheet" .href="${CDN_PATH}common.css" />
      <ul
        class="ok-file-list ok-file-list--${props.listType} ${props.disabled
          ? 'is-disabled'
          : ''}"
      >
        ${props.fileList.map(
          item => html` <li class="ok-file-list__item">
            ${renderListItem(item)} ${renderClose(item)}
            <p>${renderProgress(item)}</p>
          </li>`
        )}
      </ul>
    `
  }
)
