<template>
  <ok-file-list
    @preview="handlePreview"
    @delete="handleDetele"
    @download="handleDownload"
    @abort="handleAbort"
    @remove="handleRemoveFileList"
    .fileList="fileLists"
    .listType="listType"
    .showPreview="showPreview"
    .showDownload="showDownload"
    .showRemove="showRemove"
    .maxHeight="maxHeight"
    .subtable="true"
  ></ok-file-list>

  <div v-if="!hideUploader" class="ok-upload ok-upload--subtable" @click="handleClick">
    <slot>
      <div :class="upload-btn-box-subtable">
        <div
          :class="{
            'upload-subtable-inner': true,
            disabled: disabled,
            'has-file': fileLists,
          }">
          <svg
            t="1616578828719"
            class="icon upload-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="27171"
            width="16"
            height="16"
          >
            <path
              d="M917.333333 682.666667v213.333333a42.666667 42.666667 0 0 1-42.666666 42.666667H149.333333a42.666667 42.666667 0 0 1-42.666666-42.666667V682.666667h85.333333v170.666666h640v-170.666666h85.333333zM554.666667 243.498667l203.861333 203.882666 60.352-60.352L517.184 85.333333 215.466667 387.029333l60.330666 60.352L469.333333 253.866667v503.168h85.333334V243.498667z"
              p-id="27172"
            ></path>
          </svg>
          <span class="upload-text"
          >
            {{i18n.$t('control.imageUpload.uploadBtnText', '上传图片')}}</span
          >
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
</template>

<script lang="ts">


  import { defineComponent, PropType, getCurrentInstance } from 'vue'

  import { i18n } from '../../locales'
  import { COMMON_CSS_PATH } from '../../path.config'
  import useImageHandle from '../image.common.hook'
  import { UploadProps } from '../upload.props'
  export default defineComponent({
    props: {
      ...UploadProps,
      maxHeight: {
        type: String as unknown as PropType<string>,
        default: '180px',
      },
      type: {
        type: String as unknown as PropType<string>,
      },
      accept: {
        type: String as unknown as PropType<string>,
      },
    },
    setup(props) {
      const instance: any = getCurrentInstance()
      const {
        showPreview,
        showDownload,
        showRemove,
        fileLists,
        hideUploader,
        disabled,
        uploadFiles,
        handlePreview,
        handleDetele,
        handleDownload,
        handleAbort,
        handleRemoveFileList,
      } = useImageHandle(props, instance)

      /**
       * 列表上传，点击选择文件
       */
      const handleClick = () => {
        if (!disabled.value) {
          let inputRef = instance.refs.inputRef as HTMLInputElement
          inputRef.value = ''
          inputRef.click()
        }
      }
      /**
       * 点击上传选中文件
       * @param e 选中的文件
       */
      const handleChange = (e: DragEvent) => {
        const files = (e.target as HTMLInputElement).files
        if (!files) return
        uploadFiles(files)
      }
      return {
        i18n,
        showPreview,
        showDownload,
        showRemove,
        fileLists,
        hideUploader,
        disabled,
        uploadFiles,
        handlePreview,
        handleDetele,
        handleDownload,
        handleAbort,
        handleRemoveFileList,
        handleClick,
        handleChange
      }
    }
  })
</script>
<style lang="less">
  @import "../../assets/styles/common.less";
</style>
