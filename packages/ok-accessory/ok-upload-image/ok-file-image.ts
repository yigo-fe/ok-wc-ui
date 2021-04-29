/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-26 16:06:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-04-29 18:47:41
 * @FilePath: /packages/ok-accessory/ok-upload-image/ok-file-image.ts
 */

import { computed, defineComponent, html, onMounted, PropType } from 'ok-lit'
import { createApp } from 'vue'

import { COMMON_CSS_PATH } from '../../path.config'
import type { ListType, UploadFile, UploadStatus } from '../upload.type'
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
    showPreview: {
      type: (Boolean as unknown) as PropType<boolean>,
    },
    showDownload: {
      type: (Boolean as unknown) as PropType<boolean>,
    },
    showRemove: {
      type: (Boolean as unknown) as PropType<boolean>,
    },
    thumbStyle: {
      type: (Object as unknown) as PropType<object>,
    },
    rowNumber: {
      type: (Number as unknown) as PropType<number>,
    },
  },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const fileList = computed(() => props.fileList)
          const showPreview = computed(() => props.showPreview)
          const showDownload = computed(() => props.showDownload)
          const showRemove = computed(() => props.showRemove)
          const thumbStyle = computed(() => props.thumbStyle)
          const rowNumber = computed(() => props.rowNumber)
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

          // 上传中， 上传失败 的关闭按钮
          const handleCloseClick = (file: UploadFile, status: UploadStatus) => {
            // 上传中： 终止上传； 上传失败： 从传输列表中移除
            const event = status === 'uploading' ? 'abort' : 'remove'
            context.emit(event, file)
          }

          return {
            fileList,
            showPreview,
            showDownload,
            showRemove,
            thumbStyle,
            rowNumber,
            handleDelete,
            handlePreview,
            handleDownload,
            handleCloseClick,
          }
        },
        template: `
          <li v-for="(file, index) in fileList" :key="file.id" :class="['ok-upload-list__item', 'is-' + file.status, (index+1)%rowNumber === 0 ? 'last': '' ]" :style="thumbStyle">
            <div v-if="file.status === 'uploading' || file.status === 'fail'" class="ok-process-wraper" >
              <div class="image-process-wraper">
                <ok-progress class="image-progress" :percentage="file.percentage" :status="file.status" ></ok-progress>
                <span class="image-close-btn" @click="handleCloseClick(file, file.status)">
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
              </div>

            </div>
            <img class="ok-upload-list__item-thumbnail" v-show="file?.response?.data[0]?.thumb_url" :src="file?.response?.data[0]?.thumb_url" />
            <span class="ok-upload-list__item-actions" v-show="file?.response?.data[0]?.thumb_url">
              <i v-if="showPreview" @click="handlePreview(file)">
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
                    fill="#fff"
                    p-id="24343"
                  ></path>
                </svg>
              </i>

              <a v-if="showDownload" :href="file?.response?.data?.[0]?.download_url" @click="handleDownload(file)">
                <svg
                  t="1615028599608"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="24216"
                  width="16"
                  height="16"
                >
                  <path
                    d="M917.312 682.688V896a42.688 42.688 0 0 1-42.624 42.688H149.312A42.688 42.688 0 0 1 106.688 896v-213.312H192v170.624h640v-170.624h85.312z m-362.624-83.84l203.84-203.84 60.352 60.288-301.696 301.76-301.696-301.76 60.352-60.288 193.472 193.472V85.312h85.376v513.536z"
                    p-id="24217"
                    fill="#fff"
                  ></path>
                </svg>
              </a>        
              <i v-if="showRemove" @click="handleDelete(file)">
                <svg
                  t="1615028657246"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="24468"
                  width="16"
                  height="16"
                >
                  <path
                    d="M235.63571416 340.55v532.41428584h552.53571417V340.55h66.66428583v535.75714248a64.28571416 64.28571416 0 0 1-64.28571416 64.28571504H233.45a64.28571416 64.28571416 0 0 1-64.28571416-64.28571504V340.55H235.57142832z m225.9 85.75714248V769.14285752H394.87142832V426.30714248h66.66428584z m164.63571416 0V769.14285752H564.07142832V426.30714248h62.16428584zM640.57142832 83.40714248v85.75714336h257.14285752V238.78571416H126.28571416V169.16428584h257.14285752V83.40714248h257.14285665z"
                    p-id="24469"
                    fill="#fff"
                  ></path>
                </svg> 
              </i>
            </span>
          </li>
        `,
      }
      const app = createApp(options)
      app.mount(context.$refs.okUploadImage as HTMLElement)
    })

    return () => html`
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <ul ref="okUploadImage" class="ok-upload-list ok-upload-list-image"></ul>
    `
  }
)
