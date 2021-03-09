/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-26 16:06:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-08 17:03:06
 * @FilePath: /packages/ok-accessory/ok-file-table.ts
 */

import { Button, Table } from 'ant-design-vue'
import { computed, defineComponent, html, onMounted, PropType } from 'ok-lit'
import { createApp, ref } from 'vue'

import CDN_PATH from '../path.config'
import okFileTableCss from './style/ok-file-table.less'
import type { ListType, UploadFile } from './upload.type'
defineComponent(
  'ok-file-table',
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
          const fileList = computed(() => {
            return props.fileList.map((file: any) => {
              const time = file.response?.data[0]?.create_time
              file.uploadTime = time ? new Date(time).toLocaleDateString() : ''
              return file
            })
          })

          const columns = ref([
            {
              title: '附件名称',
              dataIndex: 'name',
              key: 'file_name',
            },
            {
              title: '附件类型',
              dataIndex: 'type',
              slots: { customRender: 'type' },
            },
            {
              title: '上传时间',
              dataIndex: 'uploadTime',
            },
            {
              title: '操作',
              dataIndex: 'action',
              slots: { customRender: 'action' },
            },
          ])

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
          console.log('fileList', fileList.value)

          const getCreatTime = (item: any) => {
            return item.response?.data[0]?.create_time
          }

          return {
            columns,
            fileList,
            handleDelete,
            handlePreview,
            handleDownload,
            getCreatTime,
          }
        },
        template: `
          <a-table class="ok-upload-list-table" v-if="fileList.length" :dataSource="fileList" :columns="columns">
            <template #type="{ record }">
              <span>
              {{
                record.name.split('.')[
                  record.name.split('.').length - 1
                ]
              }}
              </span>
            </template>
            <template #time="{ record }">
              <span>
               {{record.response?.data[0]?.create_time}}
              </span>
            </template>
            <template #action="{ record }">
              <span>
                <a-button type="link" @click="handleDownload(record)">下载</a-button>
                <a-button type="link" @click="handlePreview(record)">预览</a-button>
                <a-button type="link" @click="handleDelete(record)">删除</a-button>
              </span>
            </template>
          </a-table>
        `,
      }
      const app = createApp(options)
      app.use(Table)
      app.use(Button)
      app.mount(context.$refs.okProcess as HTMLElement)
    })

    return () => html`
      <style>
        ${okFileTableCss}
      </style>
      <link rel="stylesheet" .href="${CDN_PATH}antd.min.css" />
      <div ref="okProcess" class="ok-file-table"></div>
    `
  }
)
