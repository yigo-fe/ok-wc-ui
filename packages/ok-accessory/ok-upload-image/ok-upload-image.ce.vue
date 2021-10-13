<template>
  <link rel="stylesheet" href="https://fe-resource.baiteda.com/lib/byteluck/byteluck.theme.blue.ant.css?t=1632896784891%22">
  <div class="ok-upload-imge-root" ref="showUploadImage">
    <ok-file-image
      class="ok-file-image-list"
      @preview="handlePreview"
      @delete="handleDetele"
      @download="handleDownloa"
      @abort="handleAbort"
      @remove="handleRemoveFileList"
      @reupload="handleReupload"
      :style="imageStyle"
      .fileList="fileLists"
      .listType="listType"
      .showPreview="showPreview"
      .showDownload="showDownload"
      .showRemove="showRemove"
      .thumbStyle="thumbStyle"
      .rowNumber="maxImgCount"
    ></ok-file-image>

    <div
      v-if="!hideUploader"
      :class="{
        'ok-upload': true,
        'ok-upload-image-box': true,
        disabled: disabled,
        'has-margin': fileLists &&
        fileLists.length % maxImgCount.value === 0,
    }"
    style="width: auto;"
    @click="handleClick"
    >
    <slot>
      <div class="ok-upload-image-inner">
        <svg
          t="1615189238946"
          class="upload-img-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="24594"
          width="40"
          height="40"
        >
          <path
            d="M469.333333 469.333333V85.333333h85.333334v384h384v85.333334H554.666667v384h-85.333334V554.666667H85.333333v-85.333334z"
            p-id="24595"
          ></path>
        </svg>
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

  </div>
</template>

<script lang="ts">
  import debounce from 'lodash/debounce'
  import { defineComponent, onMounted, onUnmounted, PropType, ref, getCurrentInstance } from 'vue'

  import { COMMON_CSS_PATH } from '../../path.config'
  import useImageHandle from '../image.common.hook'
  import { UploadProps } from '../upload.props'
  export default defineComponent({
    props: {
      ...UploadProps,
      accept: {
        type: String as unknown as PropType<string>,
      },
      limit: {
        type: Number as unknown as PropType<number>,
      },
      imageStyle: {
        type: Object as unknown as PropType<{}>,
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
        uploadFiles,
        handlePreview,
        handleDetele,
        handleDownload,
        handleAbort,
        handleRemoveFileList,
        handleReupload,
      } = useImageHandle(props, instance)

      const maxImgCount = ref(1)

      // 处理最多能展示多少个tag
      const maxImgCountComput = debounce(() => {
        const el = instance.refs.showUploadImage as HTMLElement
        const elWith = el?.offsetWidth
        if (!elWith) return

        maxImgCount.value = Math.floor((elWith + 8) / 108)
      }, 300)

      onMounted(() => {
        maxImgCountComput()
        window.addEventListener('resize', () => maxImgCountComput(), false)
      })

      onUnmounted(() => {
        window.removeEventListener('resize', () => maxImgCountComput(), false)
      })

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
      const handleChange = (e: DragEvent) => {
        const files = (e.target as HTMLInputElement).files
        if (!files) return
        uploadFiles(files)
      }


      const renderUploader = () => {
        if (hideUploader.value) return
        const hasMargin =
          fileLists.value.length &&
          fileLists.value.length % maxImgCount.value === 0
      }
      return {
        showPreview,
        showDownload,
        showRemove,
        fileLists,
        hideUploader,
        uploadFiles,
        handlePreview,
        handleDetele,
        handleDownload,
        handleAbort,
        handleRemoveFileList,
        handleReupload,
        maxImgCount,
        maxImgCountComput,
        handleClick,
        renderUploader,
        handleChange
      }
    }
  })
</script>
<style lang="less">
  @import "../../assets/styles/common.less";
</style>

