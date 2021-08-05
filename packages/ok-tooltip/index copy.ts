/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-28 19:07:13
 * @LastEditors: 付静
 * @LastEditTime: 2021-08-05 16:41:05
 * @FilePath: /packages/ok-tooltip/index copy.ts
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
import { computed, createApp, ref } from 'vue'

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
        setup() {
          // 展示
          const tipType = computed(() => props.tipType)
          // tooltip 位置
          const placement = computed(() => props.placement)

          const innerHTML = ref(context.innerHTML)
          const titleSlot = ref()
          // 计算溢出多少行后截断
          const contentStyle = computed(() => {
            return { webkitLineClamp: props.cuttingNum }
          })
          // 展示内容：插槽处理
          const contentText = computed(() => {
            // 没有content 默认展示title内容
            if (!innerHTML.value) {
              return props.title
            }
            // todo 去掉 title slot

            // const parent: any = innerHTML.value

            // document.querySelector

            return innerHTML.value || ''
          })
          // tooltip 的title
          // const title = computed(() => props.title || contentText.value)

          // 控制是否展示popover
          const isShowTips = ref(false)

          // 处理title内容
          const handleTitleContent = () => {
            let tipSlot = Array.from(context.children).find(
              (v: any) => v.slot === 'title'
            )
            titleSlot.value = tipSlot || props.title || contentText.value

            console.log('titleSlot.value', titleSlot.value)
          }
          handleTitleContent()

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
            isShowTips,
            contentText,
            contentStyle,
            mouseenter,
            titleSlot,
            placement,
            innerHTML,
          }
        },
        template: `
          <!-- 始终展示tooltip -->
          <a-tooltip 
            v-if="tipType==='always'"
            ref="Tooltip"
            :placement="placement"      
            >
            <template #title>
              <div v-html="titleSlot"></div>
            </template> 
            <div class="content" :style="contentStyle" v-html="contentText">
            </div>
          </a-tooltip>
          
          <!-- 溢出时展示tooltip 溢出 -->
          <a-tooltip 
            v-else-if="isShowTips"
            ref="Tooltip"  
            :placement="placement"       
            >
            <template #title>
              <div v-html="titleSlot"></div>
            </template>           
            <div class="content" :style="contentStyle" v-html="contentText">
            </div>
          </a-tooltip>

          <!-- 溢出时展示tooltip 未溢出 -->
          <div
            v-else
            :style="contentStyle"
            @mouseenter="mouseenter"
            v-html="contentText"
            >
          </div>
        
      `,
      }
      const app = createApp(options)
      app.use(Tooltip)
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
