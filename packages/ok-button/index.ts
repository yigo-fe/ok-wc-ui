/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-18 16:01:20
 * @LastEditors: 付静
 * @LastEditTime: 2021-02-19 18:06:26
 * @FilePath: /packages/ok-button/index.ts
 */
import { Button } from 'ant-design-vue'
import { defineComponent, html, onMounted } from 'ok-lit'
import { createApp, ref } from 'vue'
const CDN_PATH = 'https://ego-fe.oss-cn-beijing.aliyuncs.com/lib/ok-wc-ui/'
defineComponent(
  'ok-button',
  {
    type: {
      type: String,
    },
  },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const type = ref(props.type)

          return {
            type,
          }
        },
        template: `
        <a-button type="primary">Primary</a-button>
        <a-button>Default</a-button>
        <a-button type="dashed">Dashed</a-button>
        <a-button type="danger">Danger</a-button>
        <a-button type="link">Link</a-button>
      `,
      }
      const app = createApp(options)
      app.use(Button)
      app.mount(context.$refs.showButton as HTMLElement)
    })

    return () => html`
      <link rel="stylesheet" .href="${CDN_PATH}antd.min.css" />
      <div ref="showButton" class="ok-ant-button"></div>
    `
  }
)
