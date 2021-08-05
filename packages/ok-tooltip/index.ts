/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-28 19:07:13
 * @LastEditors: 付静
 * @LastEditTime: 2021-08-05 17:11:05
 * @FilePath: /packages/ok-tooltip/index.ts
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

import { Tooltip } from 'ant-design-vue'
import { defineComponent, html, onMounted, PropType } from 'ok-lit'
import { computed, createApp, ref, unref } from 'vue'

type tipType = 'auto' | 'aways' | 'none'

defineComponent(
  'ok-tooltip',
  {
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
  },
  (props, context) => {
    onMounted(() => {
      const options = {
        components: { Tooltip },
        setup() {
          const title = computed(() => props.title)
          const visible = ref(false)
          const contentRef = ref(null)

          const handleChangeVisible = (value: boolean) => {
            const contentEl = unref(contentRef)
            if (contentEl && value) {
              const contentClientWidth = unref(contentRef as any)?.clientWidth
              const contentScrollWidth = unref(contentRef as any)?.scrollWidth

              if (
                contentClientWidth &&
                contentScrollWidth &&
                contentScrollWidth <= contentClientWidth
              ) {
                visible.value = false
                return
              }
            }

            visible.value = value
          }
          return {
            visible,
            title,
            handleChangeVisible,
          }
        },
        render: function (createElement) {
          return createElement('Tooltip', [props], createElement.$slots)
        },
      }
      const app = createApp(options)
      app.mount(context.$refs.showTips as HTMLElement)
    })

    return () => html`
      <style>
        .ok-tooltip-overlay .ant-tooltip-inner {
          background-color: #fff;
          color: #666666;
        }
        .ok-tooltip-overlay .ant-tooltip-arrow::before {
          background-color: #fff;
        }
        .ok-ant-tooltip div {
          display: block;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }
      </style>
      <!-- <link rel="stylesheet" href="./antd.min.css" /> -->
      <div ref="showTips" class="ok-ant-tooltip"></div>
    `
  }
)
