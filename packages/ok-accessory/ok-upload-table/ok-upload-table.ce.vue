<template>
  <div
    v-if="!hideUploader"
    :class="{
      'ok-upload': true,
      'ok-upload--text': true,
      disabled: disabled,
  }"
    tabindex="0"
    style="width: auto;"
    @click="handleClick"
  >
    <slot>
      <div style="display: inline-block; vertical-align: middle;">
        <div
          :class="{
          'ok-upload-list-btn': true,
          disabled: disabled,
        }"
        >
          <svg
            t="1616578828719"
            class="icon upload-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="27171"
            width="14"
            height="14"
          >
            <path
              d="M917.333333 682.666667v213.333333a42.666667 42.666667 0 0 1-42.666666 42.666667H149.333333a42.666667 42.666667 0 0 1-42.666666-42.666667V682.666667h85.333333v170.666666h640v-170.666666h85.333333zM554.666667 243.498667l203.861333 203.882666 60.352-60.352L517.184 85.333333 215.466667 387.029333l60.330666 60.352L469.333333 253.866667v503.168h85.333334V243.498667z"
              p-id="27172"
            ></path>
          </svg>
          <span class="btn-text">
        {{i18n.$t('control.attachmentUpload.uploadBtnTable', '点击上传')}}</span>
        </div>
      </div>
    </slot>
    <input
      style="display: none"
      ref="inputRef"
      class="ok-upload__input"
      type="file"
      .name="name"
      .multiple="multiple"
      .accept="accept"
      @change="handleChange"
    />
  </div>

  <ok-file-table
    v-if="fileLists.length"
    class="ok-file-table-wraper"
    @preview="handlePreview"
    @delete="handleDetele"
    @download="handleDownload"
    @abort="handleAbort"
    @remove="handleRemoveFileList"
    @reupload="handleReupload"
    .fileList="fileLists"
    .listType="listType"
    .showPreview="showPreview"
    .showDownload="showDownload"
    .showRemove="showRemove"
  ></ok-file-table>
</template>

<script lang="ts">
  import {defineComponent, getCurrentInstance} from 'vue'
  import { i18n } from '../../locales'
  import { COMMON_CSS_PATH } from '../../path.config'
  import useAttachmentHandle from '../attachment.common.hook'
  import { UploadProps } from '../upload.props'
  export default defineComponent({
    props: {
      ...UploadProps
    },
    setup(props) {
      const instance: any = getCurrentInstance()
      const {
        fileLists,
        showPreview,
        showDownload,
        showRemove,
        hideUploader,
        uploadFiles,
        handlePreview,
        handleDetele,
        handleDownload,
        handleAbort,
        handleRemoveFileList,
        handleReupload,
      } = useAttachmentHandle(props, instance)

      /**
       * 列表上传，点击选择文件
       */
      const handleClick = () => {
        if (!props.disabled) {
          let inputRef = instance.refs.inputRef as HTMLInputElement
          inputRef.value = ''
          inputRef.click()
        }
      }
      /**
       * 列表上传选中文件
       * @param e 选中的文件
       */
      const handleChange = (e: any) => {
        const files = (e.target as HTMLInputElement).files
        if (!files) return
        uploadFiles(files)
      }
      return {
        i18n,
        fileLists,
        showPreview,
        showDownload,
        showRemove,
        hideUploader,
        uploadFiles,
        handlePreview,
        handleDetele,
        handleDownload,
        handleAbort,
        handleRemoveFileList,
        handleReupload,
        handleChange,
        handleClick
      }
    }
  })
</script>
<style lang="less">
  @import url('../../assets/styles/common.less');
</style>
