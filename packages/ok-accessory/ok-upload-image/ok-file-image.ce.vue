<template>
  <ul ref="okUploadImage" class="ok-upload-list-image">
    <li
      v-for="(item, index) in fileList"
      :key="index"
      :class="{
        'ok-upload-list__item': true,
        disabled: disabled,
        last: (index + 1) % rowNumber === 0,
        'is-uploading': item.status === 'uploading',
        'is-success': item.status === 'success',
        'is-fail': item.status === 'fail'
       }"
      :style="thumbStyle"
    >
      <!--进入条-->
      <div
        v-if="item.status === 'uploading' || item.status === 'fail'"
        :class="{
          'ok-process-wraper': true,
          'ok-image-uploading': item.status === 'uploading',
          'ok-image-fail': item.status === 'fail',
        }"
        style="position: absolute; top:0;"
      >
        <span
          v-if="item.status === 'uploading'"
          class="image-close-btn"
          @click="handleCloseClick(item, item.status)">
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

        <div class="image-process-wraper">
            <span
              :class="{
                'ok-image-process-msg': true,
                fail: item.status === 'fail',
              }"
            >
              {{item.status === 'uploading' ? parseInt((item.percentage || 0).toFixed(), 10) + '%' : uploadFailText}}</span
            >
          <ok-progress
            class="image-progress"
            .percentage="item.percentage"
            .status="item.status"
          ></ok-progress>
        </div>
      </div>

      <img
        v-if="item.response && item.response.data[0].thumb_url"
        class="ok-upload-list__item-thumbnail"
        :src="item.response.data[0].thumb_url"
      />

      <span v-if="item.status === 'fail'" class="ok-upload-list__item-actions">
        <!--重新上传-->
        <i class="operation-icon" @click="reupload(item)">
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
        </i>
        <!--删除-->
        <i
          class="operation-icon"
          @click="handleRemove(item)"
        >
          <svg
            t="1625035260775"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="60615"
            width="20"
            height="20"
          >
            <path
              d="M906.24 247.808h-230.4v-36.352c0-75.264-60.928-136.192-136.192-136.192H484.352C409.088 75.264 348.16 136.192 348.16 211.456v36.352H117.248c-25.088 0-45.056 19.968-45.056 45.056S92.16 337.92 117.248 337.92h70.144v488.96c0 70.144 58.88 127.488 131.584 127.488h386.56c72.192 0 131.584-57.344 131.584-127.488V339.968 337.92h69.632c24.576 0 44.544-19.968 44.544-45.056s-19.968-45.056-45.056-45.056z m-467.968-36.352c0-25.6 20.992-46.08 46.08-46.08h55.296c25.6 0 46.08 20.992 46.08 46.08v36.352H438.272v-36.352z m308.736 128.512v486.912c0 20.48-18.432 37.376-41.472 37.376H318.976c-22.528 0-41.472-16.896-41.472-37.376V339.968 337.92h469.504v2.048z"
              p-id="60616"
              fill="#fff"
            ></path>
            <path
              d="M616.96 468.992c-25.088 0-45.056 19.968-45.056 45.056v166.4c0 25.088 19.968 45.056 45.056 45.056 24.576 0 45.056-19.968 45.056-44.544v-166.912c0-25.088-19.968-45.056-45.056-45.056zM407.04 468.992c-25.088 0-45.056 19.968-45.056 45.056v166.4c0 25.088 19.968 45.056 45.056 45.056s45.056-19.968 45.056-44.544v-166.912c0-25.088-19.968-45.056-45.056-45.056z"
              p-id="60617"
              fill="#fff"
            ></path>
          </svg>
        </i>
      </span>

      <span
        class="ok-upload-list__item-actions"
        v-else-if="item.response && item.response.data[0].thumb_url"
      >
        <!--预览-->
        <i v-if="showPreview" class="operation-icon" @click="handlePreview(item, index)">
            <svg
              t="1625108551730"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="24470"
              width="20"
              height="20"
            >
              <path
                d="M511.3 850.3c-184.5 0-339.5-156.9-415.5-250.5-42.4-52.3-42.4-128.1 0-180.4 76-93.6 231-250.5 415.5-250.5s339.5 156.9 415.5 250.5c42.5 52.3 42.4 128.1 0 180.4-76 93.6-230.9 250.5-415.5 250.5z m0-591.9c-147.4 0-280.1 136.2-346.1 217.5-15.4 19-15.4 48.7 0 67.6 66 81.2 198.6 217.4 346.1 217.4 147.5 0 280.1-136.2 346.1-217.4 15.4-19 15.4-48.7 0-67.6-65.9-81.3-198.6-217.5-346.1-217.5z"
                p-id="24471"
              ></path>
              <path
                d="M511.3 668.9c-86 0-156-70-156-156s70-156 156-156 156 70 156 156-70 156-156 156z m0-222.6c-36.7 0-66.6 29.9-66.6 66.6 0 36.7 29.9 66.6 66.6 66.6 36.7 0 66.6-29.9 66.6-66.6 0-36.8-29.9-66.6-66.6-66.6z"
                p-id="24472"
              ></path>
            </svg>
        </i>
        <!--下载-->
        <i v-if="showDownload" class="operation-icon" @click="handleDownload(item)">
            <svg
              t="1625034930890"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="47055"
              width="20"
              height="20"
            >
              <path
                d="M827.8 925.4H198.2c-72.6 0-131.6-56.3-131.6-125.4V676.1c0-24.7 20-44.6 44.6-44.6s44.6 20 44.6 44.6V800c0 19.9 19 36.1 42.4 36.1h629.6c23.3 0 42.3-16.2 42.3-36.1V676.1c0-24.7 20-44.6 44.6-44.6 24.7 0 44.6 20 44.6 44.6V800c0.1 69.1-58.9 125.4-131.5 125.4z"
                p-id="47056"
                fill="#fff"
              ></path>
              <path
                d="M514.6 778.1c-29.6 0-57.8-12.1-79.4-34L225 531c-24.6-25-31.6-62.6-17.7-95.7 12.9-30.8 40.7-49.9 72.5-49.9h41.3V223.2c0-68.9 51.5-125 114.8-125H590c63.3 0 114.8 56.1 114.8 125v163.4h41.7c31.8 0 59.6 19.1 72.5 49.8 13.9 33.1 7.1 70.6-17.4 95.7L594.3 743.8c-21.6 22-49.8 34.2-79.5 34.2-0.1 0.1-0.1 0.1-0.2 0.1z m-220-303.5l204.2 206.8c4.8 4.8 10.2 7.4 15.8 7.4 5.6 0 11.1-2.6 15.8-7.4L731.6 476h-71.4c-24.7 0-44.6-20-44.6-44.6V223.2c0-19-11.9-35.7-25.5-35.7H436c-13.6 0-25.5 16.7-25.5 35.7v206.7c0 24.7-20 44.6-44.6 44.6h-71.3z m475.2 26.2h0.2-0.2z"
                p-id="47057"
                fill="#fff"
              ></path>
            </svg>
        </i>

        <!--删除-->
        <i
          v-if="showRemove"
          class="operation-icon"
          @click="handleRemove(item)"
        >
          <svg
            t="1625035260775"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="60615"
            width="20"
            height="20"
          >
            <path
              d="M906.24 247.808h-230.4v-36.352c0-75.264-60.928-136.192-136.192-136.192H484.352C409.088 75.264 348.16 136.192 348.16 211.456v36.352H117.248c-25.088 0-45.056 19.968-45.056 45.056S92.16 337.92 117.248 337.92h70.144v488.96c0 70.144 58.88 127.488 131.584 127.488h386.56c72.192 0 131.584-57.344 131.584-127.488V339.968 337.92h69.632c24.576 0 44.544-19.968 44.544-45.056s-19.968-45.056-45.056-45.056z m-467.968-36.352c0-25.6 20.992-46.08 46.08-46.08h55.296c25.6 0 46.08 20.992 46.08 46.08v36.352H438.272v-36.352z m308.736 128.512v486.912c0 20.48-18.432 37.376-41.472 37.376H318.976c-22.528 0-41.472-16.896-41.472-37.376V339.968 337.92h469.504v2.048z"
              p-id="60616"
              fill="#fff"
            ></path>
            <path
              d="M616.96 468.992c-25.088 0-45.056 19.968-45.056 45.056v166.4c0 25.088 19.968 45.056 45.056 45.056 24.576 0 45.056-19.968 45.056-44.544v-166.912c0-25.088-19.968-45.056-45.056-45.056zM407.04 468.992c-25.088 0-45.056 19.968-45.056 45.056v166.4c0 25.088 19.968 45.056 45.056 45.056s45.056-19.968 45.056-44.544v-166.912c0-25.088-19.968-45.056-45.056-45.056z"
              p-id="60617"
              fill="#fff"
            ></path>
          </svg>
        </i>
      </span>
    </li>
  </ul>
</template>

<script lang="ts">

  import { defineComponent, PropType, getCurrentInstance } from 'vue'

  import { i18n } from '../../locales'
  import { COMMON_CSS_PATH } from '../../path.config'
  import type { ListType, UploadFile, UploadStatus } from '../upload.type'
  export default defineComponent({
    props: {
      fileList: {
        type: Array as unknown as PropType<any[]>,
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
        type: Object,
        default: {},
      },
      rowNumber: {
        type: Number as unknown as PropType<number>,
        default: 0
      },
    },
    emits: ['preview', 'download', 'reupload', 'uploading', 'abort', 'remove', 'fail', 'delete'],
    setup(props, {emit}) {
      const instance = getCurrentInstance()
      const handlePreview = (file: UploadFile, index: number) => {
        emit('preview', { file, index })
      }

      const handleDownload = (file: UploadFile) => {
        emit('download', file)
      }

      // 重新上传
      const reupload = (file: UploadFile) => {
        emit('reupload', file.raw)
      }

      // 上传中， 上传失败 的关闭按钮
      const handleCloseClick = (file: UploadFile, status: UploadStatus) => {
        // 上传中： 终止上传； 上传失败： 从传输列表中移除
        const event = status === 'uploading' ? 'abort' : 'remove'
        emit(event, file)
      }

      const handleRemove = (file: UploadFile) => {
        const event = file.status === 'fail' ? 'remove' : 'delete'
        emit(event, file)
      }

      const uploadFailText = i18n.$t('common.uploadFail', '上传失败')
      return {
        handlePreview,
        handleDownload,
        reupload,
        handleCloseClick,
        handleRemove,
        uploadFailText
      }
    }
  })
</script>
<style lang="less">
  @import "../../assets/styles/common.less";
</style>
