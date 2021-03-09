/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-26 16:09:30
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-09 19:56:55
 * @FilePath: /packages/ok-accessory/ok-progress.ts
 */

import { styleMap } from 'lit-html/directives/style-map'
import { computed, defineComponent, html, PropType } from 'ok-lit'

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
  },
  props => {
    const percentageFormate = computed(() => {
      let p = props.percentage || 0
      return parseInt(p.toFixed(), 10)
    })

    const content = computed(() => {
      return `${percentageFormate.value}%`
    })

    const width = computed(() => {
      return `${percentageFormate.value}%`
    })
    return () => html`
      <style>
        .ok-progress-bar__outer {
          height: 6px;
          border-radius: 100px;
          background-color: #ebeef5;
          overflow: hidden;
          position: relative;
          vertical-align: middle;
        }
        .ok-progress-bar__inner {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background-color: #409eff;
          text-align: right;
          border-radius: 100px;
          line-height: 1;
          white-space: nowrap;
          transition: width 0.6s ease;
        }
      </style>
      <div class="ok-progress-bar__outer" style="width: 100%">
        <div
          class="ok-progress-bar__inner"
          style=${styleMap({ width: `${width.value}` })}
        ></div>
      </div>
      <span>${content.value}</span>
    `
  }
)
