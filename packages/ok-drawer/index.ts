/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-04-19 22:13:17
 * @LastEditors: 付静
 * @LastEditTime: 2021-04-20 15:28:10
 * @FilePath: /packages/ok-drawer/index.ts
 */
import { Drawer } from 'ant-design-vue'
import { defineComponent, html, onMounted, PropType } from 'ok-lit'
import { computed, createApp, nextTick, ref } from 'vue'

import { CDN_PATH, COMMON_CSS_PATH } from '../path.config'
defineComponent(
  'ok-drawer',
  {
    // 展示弹窗
    visible: {
      type: (Boolean as unknown) as PropType<boolean>,
      default: false,
    },
    // 关闭时是否清除子元素，默认保留
    destroyOnClose: {
      type: (Boolean as unknown) as PropType<boolean>,
      default: false,
    },
    // 关闭弹窗时的回调
    close: {
      type: Function,
    },
  },
  (props, context) => {
    // console.log('context', context, context.innerHTML)
    onMounted(() => {
      const options = {
        setup() {
          // 是否打开drawer
          const visible = computed(() => props.visible)
          const destroyOnClose = computed(() => props.destroyOnClose)
          // 关闭drawer
          const onClose = () => {
            props.close && props.close()
          }
          // 手动获取slot内容
          const slotDetail = context.innerHTML

          // 计算drawer高度
          const height = ref(700)
          nextTick(() => {
            height.value = window.innerHeight - 40
          })

          return {
            visible,
            slotDetail,
            height,
            destroyOnClose,
            onClose,
          }
        },
        template: `
          <a-drawer
            placement="bottom"
            :destroyOnClose="destroyOnClose"
            :closable="false"
            :maskClosable="false"
            :visible="visible"
            :height="height"
            wrapClassName="ok-drawer-wrap"
            @close="onClose"
          >
            <svg @click="onClose" t="1618899167174" class="drawer-close-icon icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16102" width="26" height="26"><path d="M512 451.669333L813.696 149.952l60.352 60.352L572.330667 512l301.717333 301.696-60.352 60.352L512 572.330667 210.304 874.048l-60.352-60.352L451.669333 512 149.952 210.304l60.352-60.352L512 451.669333z" p-id="16103" fill="#fff"></path></svg>
            <div class="ok-drawer-content" v-html="slotDetail"></div>
          </a-drawer>
        `,
      }
      const app = createApp(options)
      app.use(Drawer)
      app.mount(context.$refs.showDrawer as HTMLElement)
    })

    return () => html`
      <link rel="stylesheet" .href="${CDN_PATH}antd.min.css" />
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <div ref="showDrawer" class="ok-drawer-root"></div>
    `
  }
)
