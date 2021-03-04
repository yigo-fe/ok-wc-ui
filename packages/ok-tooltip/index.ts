/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-28 19:07:13
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-04 18:30:00
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
import { Button } from 'ant-design-vue'
import { defineComponent, html, onMounted, PropType } from 'ok-lit'
import { computed, createApp, ref } from 'vue'

// @ts-ignore
// import Vue from 'vue/dist/vue.cjs.prod.js'
// import Vue from '../../node_modules/vue/dist/vue.cjs.prod.js'
// import Vue from '../../node_modules/vue/dist/vue.cjs.prod.js'
// import Vue from 'vue'

// console.log(computed, ref)

type tipType = 'auto' | 'aways' | 'none'

defineComponent(
  'ok-tooltip',
  {
    tipType: {
      type: (String as unknown) as PropType<tipType>,
      default: 'auto',
    },
    showSuffix: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    placement: {
      type: String,
      default: 'rightTop',
    },
    overlayClassName: {
      type: String,
      default: 'ok-tooltip-overlay',
    },
    cuttingNum: {
      // 显示几行后裁切
      type: Number,
      default: 1,
    },
  },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const tipType = ref(props.tipType)
          const showSuffix = ref(props.showSuffix)
          const isShowTips = ref(false)
          const title = ref(props.title)
          const cuttingNum = ref(props.cuttingNum)
          const nameStart = ref('')
          const nameEnd = ref('')
          const innerHTML = ref(context.innerHTML)
          const titleSlot = ref()

          const contentStyle = computed(() => {
            return { webkitLineClamp: cuttingNum.value }
          })
          // 展示内容：插槽处理
          const contentText = computed(() => {
            // 没有content 默认展示title内容
            if (!innerHTML.value) {
              return title.value
            }
            // todo 去掉 title slot
            return innerHTML.value || ''
          })

          // tip 内容
          // const tipContent = computed(() => {
          //   console.log('tipContent', context.children)
          //   // 处理title slot
          //   // if (!title.value) {
          //   //   return context.slots.default ? context.slots.default[0].text : ''
          //   // }
          //   let tipSlot = Array.from(context.children).find(
          //     (v: any) => v.slot === 'title'
          //   )
          //   console.log('tipSlot', tipSlot)
          //   if (tipSlot) {
          //     console.log(1, tipSlot)
          //     titleSlot.value = tipSlot
          //   }

          //   return title.value
          // })

          // 处理title内容
          const handleTitleContent = () => {
            let tipSlot = Array.from(context.children).find(
              (v: any) => v.slot === 'title'
            )
            if (tipSlot) {
              titleSlot.value = tipSlot.toString()
              // console.log(123, titleSlot.value)
            }
          }
          handleTitleContent()

          // 处理文件后缀
          // TODO 嵌套标签
          // const handleSuffix = (fileName: string) => {
          //   let idx = fileName.lastIndexOf('.')
          //   nameStart.value = fileName.substr(0, idx - 2)
          //   if (nameStart.value.length > 2) {
          //     nameEnd.value = fileName.substr(idx - 2)
          //   }
          // }
          // showSuffix.value && handleSuffix(innerHTML.value)

          // 添加隐藏元素，根据高度对比，计算是否需要展示tooltip
          const mouseenter = () => {
            const showTips = context.$refs.showTips as HTMLElement
            const offsetWidth = showTips.offsetWidth
            const offsetHeight = showTips.offsetHeight
            const textDiv = document.createElement('div')
            const curStyle = window.getComputedStyle(showTips)
            textDiv.style.cssText = `
                    word-break: break-word;
                    width:${offsetWidth}px;
                    font-size: ${curStyle.fontSize || '14px'};
                    font-weight: ${curStyle.fontWeight || 'normal'};
                    line-height: ${curStyle.lineHeight || '22px'};
                `
            document.body.appendChild(textDiv)
            textDiv.innerHTML = contentText.value.toString()
            textDiv.offsetHeight > offsetHeight && (isShowTips.value = true)
            document.body.removeChild(textDiv)
          }

          return {
            tipType,
            showSuffix,
            isShowTips,
            contentText,
            contentStyle,
            mouseenter,
            title,
            nameStart,
            nameEnd,
            titleSlot,
          }
        },
        template: `
          <a-tooltip 
            v-if="tipType==='always'"
            ref="Tooltip"
            placement="left"
            :title="title">
            <div class="content" :style="contentStyle" v-html="contentText">
            </div>
          </a-tooltip>
          
          <a-tooltip 
            v-else-if="isShowTips"
            ref="Tooltip"
            placement="left"
            :title="title">
            <template #title>
              <div v-html="titleSlot"></div>
            </template>
            
            <div v-if="!showSuffix" class="content" :style="contentStyle" v-html="contentText">
            </div>

            <p v-else class="file-name-wrap inner">
              <span class="name-start">
              {{nameStart}}</span
              ><span class="name-end">{{nameEnd}}</span>
            </p>
          </a-tooltip>

          <div
            v-else-if="!showSuffix"
            :style="contentStyle"
            @mouseenter="mouseenter"
            v-html="contentText"
            >
          </div>
          
          <p 
            v-else
            @mouseenter="mouseenter"
            class="file-name-wrap outer">
            <span class="name-start">
            {{nameStart}}</span
            ><span class="name-end">{{nameEnd}}</span>
          </p>
      `,
      }
      const app = createApp(options)
      app.use(Tooltip)
      app.use(Button)
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

        .file-name-wrap {
          display: flex;
          align-items: center;
          max-width: 100%;
          color: #1f2329;
        }
        .name-end {
          flex-shrink: 0;
        }
        .name-start {
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      </style>
      <!-- <link rel="stylesheet" href="./antd.min.css" /> -->
      <div ref="showTips" class="ok-ant-tooltip"></div>
    `
  }
)
