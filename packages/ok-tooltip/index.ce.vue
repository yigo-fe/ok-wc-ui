/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-28 19:07:13
 * @LastEditors: 付静
 * @LastEditTime: 2021-08-10 11:01:08
 * @FilePath: /packages/ok-tooltip/index.ce.vue
 */

/**
 * 四种形式：
 * 1、全部内容, 一直tooltip
 * 2、超出展示 ..., 不展示tooltip (不考虑， css样式解决)
 * 3、超出展示... , 超出时展示tooltip
 * 4、超出展示... , 不管是否超出一直展示tooltip
 *
 * 两个属性：
 * showPop: aways/auto
 * innerEllipsis: true/false
 * showSuffix: 文件特有：展示文件后缀。eg: 这是一个名字很长很长很长..文件.doc
 */

/**
 * 1、属性不能使用 title 关键字 (不能在元素上直接绑定)
 * 2、属性透传（不是大问题，麻烦）
 * 3、外部传入的props需要转一下， 不能直接使用
 * 4、不能直接使用slot（方案： 获取插槽内容，手动放入）
 * 5、render 层要引入 ant css
 * 6、调试不方便
 *
 */

<template>
 <div>
   <link rel="stylesheet" href="https://fe-resource.baiteda.com/lib/byteluck/byteluck.theme.blue.ant.css?t=1632896784891%22">
   <div :id="id">
     <a-tooltip
       :title="title"
       :visible="visible"
       :onVisibleChange="handleChangeVisible"
     >
       <div v-if="isSlot" ref="contentRef" style="max-width: 100%" class="ellipsis1"><slot></slot></div>
       <div v-else ref="contentRef" :style="textStyle" class="tooltip-content ellipsis1" >
         {{title}}
       </div>
     </a-tooltip>
   </div>
 </div>
</template>

<script lang="ts">

import { Tooltip } from 'ant-design-vue'
import { computed, createApp, ref, unref, defineComponent, PropType, getCurrentInstance, onMounted } from 'vue'

import { ANTD_VUE_CDN } from '../path.config'

type tipType = 'auto' | 'aways' | 'none'

  export default defineComponent({
    components: {
      'a-tooltip': Tooltip
    },
    props: {
      tipType: {
        type: String as unknown as PropType<tipType>,
        default: 'auto',
      },
      title: {
        type: String as unknown as PropType<string>,
      },
      placement: {
        type: String as unknown as PropType<string>,
      },
      overlayClassName: {
        type: String as unknown as PropType<string>,
        default: 'ok-tooltip-overlay',
      },
      cuttingNum: {
        // 显示几行后裁切
        type: Number as unknown as PropType<number>,
        default: 1,
      },
      textStyle: {
        type: Object as unknown as PropType<object>,
      },
    },
    data() {
      return {
        isSlot: true,
        visible: false
      }
    },
    mounted() {
      const slots = this.$el.querySelectorAll('slot') || []
      if (slots.length && slots[0].assignedNodes().length) {
        this.isSlot = true
      } else {
        this.isSlot = false
      }
    },
    methods: {
      handleChangeVisible(value: boolean) {
        const contentEl:any = this.$refs.contentRef
        if (contentEl && value) {
          const contentClientWidth = contentEl.clientWidth
          const contentScrollWidth = contentEl.scrollWidth

          if (
            contentClientWidth &&
            contentScrollWidth &&
            contentScrollWidth <= contentClientWidth
          ) {
            this.visible = false
            return
          }
        }
        this.visible = value
      }
    }
  })
</script>
<style lang="less" scoped>
  :host {
    display: inline-block;
  }
  .tooltip-content {
    font-size: 14px;
    color: var(--bl-n900-c, #1f2329);
    max-width: 100%;
  }
  .ellipsis1 {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .ellipsis2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .ellipsis2::after,
  .ellipsis1::after {
    content: '';
    display: block;
  }
</style>
