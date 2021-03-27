/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-26 16:09:30
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-27 13:46:43
 * @FilePath: /packages/ok-accessory/ok-progress-vue.ts
 */

import {
  computed,
  defineComponent,
  effect,
  html,
  onMounted,
  PropType,
} from 'ok-lit'
import { createApp, ref } from 'vue'

import okProgressCss from './style/progress.less'
import type { UploadStatus } from './upload.type'

defineComponent(
  'ok-progress',
  {
    percentage: {
      type: (Number as unknown) as PropType<number>,
      default: 0,
      required: true,
      validator: (val: number | unknown): boolean =>
        (val as Number) >= 0 && (val as Number) <= 100,
    },
    status: {
      type: (String as unknown) as PropType<UploadStatus>,
    },
  },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const percentage = ref('')
          effect(() => {
            let p = props.percentage || 0
            percentage.value = `${parseInt(p.toFixed(), 10)}%`
          })

          const status = computed(() => props.status)

          // 展示上传进度数值， 暂时不要
          // <span>{{percentage}}</span>

          return {
            percentage,
            status,
          }
        },
        template: `
          <div class="ok-progress-bar__outer" style="width: 100%">
            <div
              class="ok-progress-bar__inner"
              :class="{fail: status ==='fail'}"
              :style="{ width: percentage}"
            ></div>
          </div>
        `,
      }
      const app = createApp(options)
      app.mount(context.$refs.okProcess as HTMLElement)
    })

    return () => html`
      <style>
        ${okProgressCss}
      </style>
      <div ref="okProcess" class="ok-process-warp"></div>
    `
  }
)
