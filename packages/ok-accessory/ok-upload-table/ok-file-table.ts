/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-26 16:06:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-06-30 17:58:00
 * @FilePath: /packages/ok-accessory/ok-upload-table/ok-file-table.ts
 */

import { Button, Table } from 'ant-design-vue'
import { computed, defineComponent, html, onMounted, PropType } from 'ok-lit'
import { createApp, ref } from 'vue'

import { i18n } from '../../locales'
import { ANTD_VUE_CDN, COMMON_CSS_PATH } from '../../path.config'
import { timestamp2date } from '../../utils/time'
import type { ListType, UploadFile } from '../upload.type'
import { getFileType } from '../utils'
defineComponent(
  'ok-file-table',
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
  },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const fileList = computed(() => {
            return props.fileList.map((file: any, index: number) => {
              const time = file.response?.data[0]?.create_time
              file.uploadTime = time ? timestamp2date(time) : ''
              file.suffix = getFileType(file.name)
              file.index = index + 1
              return file
            })
          })
          const showPreview = computed(() => props.showPreview)
          const showDownload = computed(() => props.showDownload)
          const showRemove = computed(() => props.showRemove)

          const columns = ref([
            {
              title: i18n.$t('common.index', '序号'),
              dataIndex: 'index',
              align: 'center',
              width: 60,
            },
            {
              title: i18n.$t(
                'control.attachmentUpload.uploadTable.fileName',
                '文件名称'
              ),
              dataIndex: 'name',
              key: 'file_name',
              slots: { customRender: 'name' },
            },
            {
              title: i18n.$t(
                'control.attachmentUpload.uploadTable.fileType',
                '文件类型'
              ),
              dataIndex: 'type',
              slots: { customRender: 'type' },
              width: 90,
            },
            {
              title: i18n.$t(
                'control.attachmentUpload.uploadTable.createTime',
                '上传时间'
              ),
              dataIndex: 'uploadTime',
              width: 190,
            },
            {
              title: i18n.$t(
                'control.attachmentUpload.uploadTable.operation',
                '操作'
              ),
              width: 100,
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

          const reupload = (file: any) => {
            context.emit('reupload', file.raw)
          }
          const removeFileList = (file: UploadFile) => {
            if (file.status === 'fail') {
              context.emit('remove', file)
            } else {
              context.emit('abort', file)
            }
          }

          const getCreatTime = (item: any) => {
            return item?.response?.data[0].create_time
          }

          const getRowKey = (record: any) => {
            return record.response
              ? record.response.data[0].file_id
              : record.uid
          }

          return {
            columns,
            fileList,
            showPreview,
            showDownload,
            showRemove,
            handleDelete,
            handlePreview,
            handleDownload,
            getCreatTime,
            getRowKey,
            reupload,
            removeFileList,
          }
        },
        template: `
          <a-table
            v-if="fileList.length"
            class="ok-upload-list-table"
            bordered
            :row-key="getRowKey"
            :dataSource="fileList"
            :columns="columns"
            :pagination="false">
            <template #name="{ record }">
              <div class="file-name-box" :class="{fail:record.status==='fail' }" >
                <div style="display:flex; align-items:center;line-height:1; margin-bottom:3px;">
                  <ok-file-icon :type="record.suffix"></ok-file-icon>
                  <span style="margin-left:6px;" class="file-name">{{record.name}}</span>
                </div>
                <ok-progress
                  v-if="record.status === 'fail' || record.status === 'uploading'"
                  class="file-list-progress"
                  :percentage="record.percentage"
                  :status="record.status"
                ></ok-progress>
              </div>
            </template>
            <template #type="{ record }">
              <span>
              {{ record.suffix }}
              </span>
            </template>
            <template #action="{ record }">
              <div class="ok-upload-list__item-actions" v-if="record.status === 'uploading' || record.status === 'fail'">
                <span v-if="record.status === 'fail'" class="file-icon-operate" @click="reupload(record)">
                  <svg
                    t="1622688547794"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="40154"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M512.3 878.8c-201.6 0-365.5-164-365.5-365.5 0-24.7 20-44.6 44.6-44.6s44.6 20 44.6 44.6c0 152.3 123.9 276.3 276.3 276.3 86.7 0 166.7-39.5 219.4-108.4 15-19.6 43-23.3 62.6-8.3s23.3 43 8.3 62.6c-69.8 91-175.7 143.3-290.3 143.3zM833.2 557.9c-24.7 0-44.6-20-44.6-44.6 0-152.4-123.9-276.3-276.3-276.3-86.3 0-166 39.2-218.8 107.6-15.1 19.5-43.1 23.1-62.6 8-19.5-15.1-23.1-43.1-8.1-62.6 69.8-90.5 175.4-142.3 289.5-142.3 201.6 0 365.6 164 365.6 365.6-0.1 24.6-20 44.6-44.7 44.6z"
                      fill="#333333"
                      p-id="40155"
                    ></path>
                    <path
                      d="M833.2 599.6c-11.4 0-22.8-4.4-31.6-13.1l-80.8-80.8c-12.8-12.8-16.6-32-9.7-48.6 6.9-16.7 23.2-27.6 41.2-27.6H914c18.1 0 34.3 10.9 41.2 27.6 6.9 16.7 3.1 35.9-9.7 48.6l-80.8 80.8c-8.7 8.7-20.1 13.1-31.5 13.1zM272.2 598.3H110.5c-18.1 0-34.3-10.9-41.2-27.6-6.9-16.7-3.1-35.9 9.7-48.6l80.8-80.8c8.4-8.4 19.7-13.1 31.6-13.1 11.8 0 23.2 4.7 31.6 13.1l80.8 80.8c12.8 12.8 16.6 32 9.7 48.6s-23.2 27.6-41.3 27.6z"
                      fill="#333333"
                      p-id="40156"
                    ></path>
                  </svg>
                </span>

                <span class="file-icon-operate" @click="removeFileList(record)">
                  <svg
                    t="1616573273136"
                    class="icon abort-icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="27041"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M512 451.669333L813.696 149.952l60.352 60.352L572.330667 512l301.717333 301.696-60.352 60.352L512 572.330667 210.304 874.048l-60.352-60.352L451.669333 512 149.952 210.304l60.352-60.352L512 451.669333z"
                      p-id="27042"
                    ></path>
                  </svg>
                </span>
              </div>
                         
              <span class="ok-upload-list__item-actions" v-if="record.status === 'success'"> 
                <i class="file-icon-operate" v-if="showPreview" @click="handlePreview(record)">
                  <svg
                    t="1615028632085"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="24342"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M511.381333 768c130.474667 0 251.306667-81.109333 363.285334-256.512C765.546667 336.725333 645.013333 256 511.381333 256 377.813333 256 257.706667 336.682667 149.333333 511.488 260.586667 686.912 380.949333 768 511.381333 768zM511.36 170.666667C687.189333 170.666667 836.736 284.458667 960 512.064 833.344 739.584 683.797333 853.333333 511.338667 853.333333S189.76 739.584 64 512.064C186.368 284.458667 335.488 170.666667 511.338667 170.666667zM512 341.333333a170.666667 170.666667 0 1 0 0 341.333334 170.666667 170.666667 0 0 0 0-341.333334z m0 85.333334a85.333333 85.333333 0 1 1 0 170.666666 85.333333 85.333333 0 0 1 0-170.666666z"
                      p-id="24343"
                    ></path>
                  </svg>
                </i>

                <a class="file-icon-operate" v-if="showDownload"
                  :href="record.response && record.response.data ? record.response.data[0].download_url : ''"
                  download
                  @click="handleDownload(record)">
                  <svg t="1625034930890" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="47055" width="16" height="16"><path d="M827.8 925.4H198.2c-72.6 0-131.6-56.3-131.6-125.4V676.1c0-24.7 20-44.6 44.6-44.6s44.6 20 44.6 44.6V800c0 19.9 19 36.1 42.4 36.1h629.6c23.3 0 42.3-16.2 42.3-36.1V676.1c0-24.7 20-44.6 44.6-44.6 24.7 0 44.6 20 44.6 44.6V800c0.1 69.1-58.9 125.4-131.5 125.4z" p-id="47056"></path><path d="M514.6 778.1c-29.6 0-57.8-12.1-79.4-34L225 531c-24.6-25-31.6-62.6-17.7-95.7 12.9-30.8 40.7-49.9 72.5-49.9h41.3V223.2c0-68.9 51.5-125 114.8-125H590c63.3 0 114.8 56.1 114.8 125v163.4h41.7c31.8 0 59.6 19.1 72.5 49.8 13.9 33.1 7.1 70.6-17.4 95.7L594.3 743.8c-21.6 22-49.8 34.2-79.5 34.2-0.1 0.1-0.1 0.1-0.2 0.1z m-220-303.5l204.2 206.8c4.8 4.8 10.2 7.4 15.8 7.4 5.6 0 11.1-2.6 15.8-7.4L731.6 476h-71.4c-24.7 0-44.6-20-44.6-44.6V223.2c0-19-11.9-35.7-25.5-35.7H436c-13.6 0-25.5 16.7-25.5 35.7v206.7c0 24.7-20 44.6-44.6 44.6h-71.3z m475.2 26.2h0.2-0.2z" p-id="47057"></path></svg>
                </a>

                <i class="file-icon-operate" v-if="showRemove" @click="handleDelete(record)">
                  <svg t="1625035260775" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="60615" width="16" height="16"><path d="M906.24 247.808h-230.4v-36.352c0-75.264-60.928-136.192-136.192-136.192H484.352C409.088 75.264 348.16 136.192 348.16 211.456v36.352H117.248c-25.088 0-45.056 19.968-45.056 45.056S92.16 337.92 117.248 337.92h70.144v488.96c0 70.144 58.88 127.488 131.584 127.488h386.56c72.192 0 131.584-57.344 131.584-127.488V339.968 337.92h69.632c24.576 0 44.544-19.968 44.544-45.056s-19.968-45.056-45.056-45.056z m-467.968-36.352c0-25.6 20.992-46.08 46.08-46.08h55.296c25.6 0 46.08 20.992 46.08 46.08v36.352H438.272v-36.352z m308.736 128.512v486.912c0 20.48-18.432 37.376-41.472 37.376H318.976c-22.528 0-41.472-16.896-41.472-37.376V339.968 337.92h469.504v2.048z" p-id="60616"></path><path d="M616.96 468.992c-25.088 0-45.056 19.968-45.056 45.056v166.4c0 25.088 19.968 45.056 45.056 45.056 24.576 0 45.056-19.968 45.056-44.544v-166.912c0-25.088-19.968-45.056-45.056-45.056zM407.04 468.992c-25.088 0-45.056 19.968-45.056 45.056v166.4c0 25.088 19.968 45.056 45.056 45.056s45.056-19.968 45.056-44.544v-166.912c0-25.088-19.968-45.056-45.056-45.056z" p-id="60617"></path></svg>
                </i>
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
      <link rel="stylesheet" .href="${ANTD_VUE_CDN}" />
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <div ref="okProcess" class="ok-file-table"></div>
    `
  }
)
