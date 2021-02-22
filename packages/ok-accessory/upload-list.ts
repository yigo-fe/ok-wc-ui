/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-26 16:06:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-02-18 11:50:33
 * @FilePath: /packages/ok-accessory/upload-list.ts
 */

import { defineComponent, html, PropType } from 'ok-lit'

import okUploadListCss from './style/upload-list.less'
import type { ListType, UploadFile } from './upload.type'

defineComponent(
  'ok-upload-list',
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

    /**
     * 根据上传状态判断是否展示进度条
     * @param item 当前文件
     */
    const showProgress = (item: UploadFile) => {
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
    const showClose = (item: UploadFile) => {
      if (item.status === 'success') {
        return html`
          <i class="ok-icon-close preview" @click=${() => handlePreview(item)}>
            预览
          </i>
          <i class="ok-icon-close" @click=${() => handleDelete(item)}> 删除 </i>
        `
      }
    }

    const renderListItem = (item: UploadFile) => {
      if (props.listType === 'text') {
        return html`
          <span class="ok-upload-list__item-name"> ${item.name} </span>
        `
      } else if (props.listType === 'picture') {
        return html`
          <img
            class="ok-upload-list__item-thumbnail"
            .src=${item.response}
            alt=""
          />
        `
      }
    }

    return () => html`
      <style>
        ${okUploadListCss} .ok-upload-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .ok-upload-list--picture {
          margin: 0;
          display: inline;
          vertical-align: top;
        }
        .ok-upload-list__item {
          transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
          font-size: 14px;
          color: #606266;
          line-height: 1.8;
          margin-top: 5px;
          position: relative;
          box-sizing: border-box;
          border-radius: 4px;
          width: 100%;
        }

        .ok-upload-list--picture .ok-upload-list__item {
          overflow: hidden;
          background-color: #fff;
          border: 1px solid #c0ccda;
          border-radius: 6px;
          box-sizing: border-box;
          width: 148px;
          height: 148px;
          margin: 0 8px 8px 0;
          display: inline-block;
        }

        .ok-upload-list__item-name {
          color: #606266;
          display: block;
          margin-right: 40px;
          overflow: hidden;
          padding-left: 4px;
          text-overflow: ellipsis;
          transition: color 0.3s;
          white-space: nowrap;
        }
        .ok-upload-list__item .ok-icon-close {
          /* display: none; */
          position: absolute;
          top: 5px;
          right: 5px;
          cursor: pointer;
          opacity: 0.75;
          color: #606266;
          font-style: normal;
        }

        .ok-upload-list__item .ok-icon-close.preview {
          right: 40px;
        }

        .ok-upload-list--picture .ok-upload-list__item-thumbnail {
          width: 100%;
          height: 100%;
        }
      </style>
      <ul
        class="ok-upload-list ok-upload-list--${props.listType} ${props.disabled
          ? 'is-disabled'
          : ''}"
        style="width: 300px"
      >
        ${props.fileList.map(
          item => html` <li class="ok-upload-list__item">
            ${renderListItem(item)} ${showClose(item)}
            <p>${showProgress(item)}</p>
          </li>`
        )}
      </ul>
    `
  }
)
