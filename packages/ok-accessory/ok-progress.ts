/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-26 16:09:30
 * @LastEditors: 付静
 * @LastEditTime: 2021-06-22 14:45:39
 * @FilePath: /packages/ok-accessory/ok-progress.ts
 */

import { classMap } from 'lit-html/directives/class-map.js'
import { styleMap } from 'lit-html/directives/style-map'
import { defineComponent, effect, html, PropType } from 'ok-lit'
import { ref } from 'vue'

import { COMMON_CSS_PATH } from '../path.config'
import type { UploadStatus } from './upload.type'

defineComponent(
  'ok-progress',
  {
    percentage: {
      type: Number as unknown as PropType<number>,
      default: 0,
      required: true,
      validator: (val: number | unknown): boolean =>
        (val as Number) >= 0 && (val as Number) <= 100,
    },
    status: {
      type: String as unknown as PropType<UploadStatus>,
    },
  },
  props => {
    // onMounted(() => {
    //   const options = {
    //     setup() {
    //       const percentage = ref('')
    //       effect(() => {
    //         let p = props.percentage || 0
    //         percentage.value = `${parseInt(p.toFixed(), 10)}%`
    //       })

    //       const status = computed(() => props.status)

    //       // 展示上传进度数值， 暂时不要
    //       // <span>{{percentage}}</span>

    //       return {
    //         percentage,
    //         status,
    //       }
    //     },
    //     template: `
    //       <div class="ok-progress-bar__outer" style="width: 100%">
    //         <div
    //           class="ok-progress-bar__inner"
    //           :class="{fail: status ==='fail'}"
    //           :style="{ width: percentage}"
    //         ></div>
    //       </div>
    //     `,
    //   }
    //   const app = createApp(options)
    //   app.mount(context.$refs.okProcess as HTMLElement)
    // })

    const percentage = ref('')
    effect(() => {
      let p = props.percentage || 0
      percentage.value = `${parseInt(p.toFixed(), 10)}%`
    })

    return () => html`
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <div
        ref="okProcess"
        class="ok-process-warp"
        class=${classMap({
          'ok-process-warp': true,
          fail: props.status === 'fail',
        })}
      >
        <div class="ok-progress-bar__outer" style="width: 100%; height: 2px;">
          <div
            class="ok-progress-bar__inner"
            style=${styleMap({ width: percentage.value, height: '100%' })}
          ></div>
        </div>
      </div>
    `
  }
)
