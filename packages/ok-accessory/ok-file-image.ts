/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-26 16:06:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-01 18:17:01
 * @FilePath: /packages/ok-accessory/ok-file-image.ts
 */

import { defineComponent, html, onMounted, PropType } from 'ok-lit'
import { createApp, ref } from 'vue'

import CDN_PATH from '../path.config'
import okUploadImgCss from './style/ok-upload-image.less'
import type { ListType, UploadFile } from './upload.type'
defineComponent(
  'ok-file-image',
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
    onMounted(() => {
      const options = {
        setup() {
          const fileList = ref(props.fileList)
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

          return {
            fileList,
            handleDelete,
            handlePreview,
            handleDownload,
          }
        },
        template: `
          <li v-for="file in fileList" :key="file.id" :class="['ok-upload-list__item', 'is-' + file.status]">
            <div class="ok-process-wraper" v-if="file.status === 'uploading'">
              <ok-progress :percentage="file.percentage" :status="file.status" ></ok-progress>
            </div>
            <img class="ok-upload-list__item-thumbnail" v-show="file?.response?.data[0]?.thumb_url" :src="file?.response?.data[0]?.thumb_url" />
            <span class="ok-upload-list__item-actions">
              <i @click="handleDownload(file)">下载</i>
              <i @click="handlePreview(file)">预览</i>
              <i @click="handleDelete(file)">删除</i>
            </span>
          </li>
        `,
      }
      const app = createApp(options)
      app.mount(context.$refs.okUploadImage as HTMLElement)
    })

    return () => html`
      <style>
        ${okUploadImgCss}
      </style>
      <link rel="stylesheet" .href="${CDN_PATH}iconfont/iconfont.css" />
      <ul ref="okUploadImage" class="ok-upload-list ok-upload-list-image"></ul>
    `
  }
)
