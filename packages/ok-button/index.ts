/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-18 16:01:20
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-31 15:50:54
 * @FilePath: /packages/ok-button/index.ts
 */
import { Button } from 'ant-design-vue'
import { defineComponent, html, onMounted } from 'ok-lit'
import tippy from 'tippy.js'
import { createApp, nextTick, ref } from 'vue'

// const CDN_PATH = 'https://ego-fe.oss-cn-beijing.aliyuncs.com/lib/ok-wc-ui/'
import { ANTD_VUE_CDN } from '../path.config'
defineComponent(
  'ok-button',
  {
    type: {
      type: String,
    },
  },
  (props, context) => {
    // onMounted(() => {
    //   const options = {
    //     setup() {
    //       const type = ref(props.type)

    //       return {
    //         type,
    //       }
    //     },
    //     template: `
    //     <a-button type="primary">Primary</a-button>
    //     <a-button>Default</a-button>
    //     <a-button type="dashed">Dashed</a-button>
    //     <a-button type="danger">Danger</a-button>
    //     <a-button type="link">Link</a-button>
    //   `,
    //   }
    //   const app = createApp(options)
    //   app.use(Button)
    //   app.mount(context.$refs.showButton as HTMLElement)
    // })

    nextTick(() => {
      setTimeout(() => {
        console.log(123, document.getElementById('myButton'))
        tippy(context.$refs.showButton as HTMLElement, {
          // default [skidding, distance]
          content: "I'm a Tippy tooltip!",
          offset: [0, 20],
          // trigger: 'click',
        })
      }, 3000)
    })

    return () => html`
      <link rel="stylesheet" .href="${ANTD_VUE_CDN}" />
      <style>
        .ok-ant-button {
          width: 50px;
          height: 30px;
          border: 1px solid #ccc;
        }
      </style>
      <div ref="showButton" id="myButton" class="ok-ant-button">trigger</div>
      <div ref="showPopper">这里是prrenderOperations</div>
    `
  }
)
