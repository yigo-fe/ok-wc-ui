/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-28 19:07:13
 * @LastEditors: 付静
 * @LastEditTime: 2021-08-07 20:23:32
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

import { ANTD_VUE_CDN } from '../path.config'

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
    textStyle: {
      type: Object as unknown as PropType<object>,
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

          const triggerSlot = computed(() => {
            return context.innerHTML
          })
          const textStyle = computed(() => props.textStyle)
          return {
            contentRef,
            visible,
            title,
            triggerSlot,
            textStyle,
            handleChangeVisible,
          }
        },
        template: `
          <Tooltip
            :title="title"
            :visible="visible"
            :onVisibleChange="handleChangeVisible"
          >
            <div v-if="triggerSlot" ref="contentRef" style="max-width: 100%" class="ellipsis1" v-html="triggerSlot" ></div>
            <div v-else ref="contentRef" :style="textStyle" class="tooltip-content ellipsis1" >
              {{title}}
            </div>
          </Tooltip>
        `,
      }
      const app = createApp(options)
      app.use(Tooltip)
      app.mount(context.$refs.showTips as HTMLElement)
    })

    return () => html`
      <style>
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
      <link rel="stylesheet" .href="${ANTD_VUE_CDN}" />
      <div
        ref="showTips"
        class="ok-ant-tooltip"
        style="display: inline-block; vertical-align: middle; max-width: 100%; "
      ></div>
    `
  }
)
