<template>
  <div ref="showImagePreview" class="ok-image-preview-box">
    <div ref="imgPreviewBox" style="display:none">
      <a-image-preview-group  v-if="list.length">
        <a-image v-for="item in list" :key="item.url" :width="1" :src="item.url" />
      </a-image-preview-group>
    </div>
  </div>
</template>

<script lang="ts">

import { Image } from 'ant-design-vue'
import { computed, defineComponent, ref, defineExpose, PropType, onMounted, getCurrentInstance } from 'vue'

import { ANTD_VUE_CDN, COMMON_CSS_PATH } from '../../path.config'
import { sourceHost } from '../../services/api'
import { customDefineExpose } from '../../utils'
export default defineComponent({
  props: {
    imgList: {
      type: Array as unknown as PropType<[]>,
    },
  },
  components: {
    'a-image-preview-group': Image
  },
  setup(props) {
    const instance = getCurrentInstance()
    // 处理传入的imgList数据，统一转为数组
    const list = computed(() => {
      let num: any = []
      if (props.imgList) {
        num = Array.isArray(props.imgList)
          ? props.imgList
          : [props.imgList]
      }
      return clearData(num)
    })

    // 清理数据，组装previewURL
    const clearData = (list: any) => {
      return list.map((file: any) => {
        const path = file?.response?.data?.[0].file_path
        // todo 兼容
        let url: any = ''
        if (path && /^\/\//.test(path)) {
          url = path
        } else {
          url = path ? `${sourceHost}/${path}` : ''
        }
        return {
          url,
        }
      })
    }

    // 暴露预览方法
    const imgPreviewBox: any = ref(null)
    const preview = (index: number) => {
      if (index > -1) {
        const el: any =
          imgPreviewBox.value?.querySelectorAll('.ant-image')
        el?.[index]?.click()
      }
    }
    defineExpose({ preview })
    onMounted(() => {
      setTimeout(() => {
        customDefineExpose({preview}, instance)
      })
    })

    return {
      list,
      imgPreviewBox,
    }
  },
})
</script>
