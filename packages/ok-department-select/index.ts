/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-23 21:01:15
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-23 21:30:28
 * @FilePath: /packages/ok-department-select/index.ts
 */
import { defineComponent, html, onMounted } from 'ok-lit'
import { computed, createApp } from 'vue'

import CDN_PATH from '../path.config'
import { propsOptions } from './department-props'

defineComponent(
  'ok-department-select',
  { ...propsOptions },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const mode = computed(() => props.mode)
          const value = computed(() => {
            if (!props.value) {
              return []
            } else {
              return typeof props.value === 'string'
                ? [props.value]
                : props.value
            }
          })
          const disabled = computed(() => props.disabled)
          const placeholder = computed(() => props.placeholder)
          const multiple = computed(() => props.multiple)
          const range = computed(() => props.range)
          // 组织架构是否开始保密
          const secrecy = computed(() => props.secrecy)

          // 更新组件外部value
          const updateValue = (e: CustomEvent) => {
            props.update && props.update(e.detail.value, e.detail.options)
          }

          return {
            mode,
            value,
            disabled,
            placeholder,
            multiple,
            range,
            secrecy,
            updateValue,
          }
        },
        template: `
				<ok-department-tree 
					v-show="mode==='tree'"			
					:value="value"
					:placeholder="placeholder"
					:range="range"
					:disabled="disabled"
          :multiple="multiple"
          :secrecy="secrecy"
					@update="updateValue"
          class="ok-employee-tree"
					></ok-department-tree>
					
					<ok-department-input 
						v-show="mode!=='tree'"
						:value="value"
            :placeholder="placeholder"
            :range="range"
            :disabled="disabled"
            :multiple="multiple"
						@update="updateValue"
            class="ok-employee-input"
						></ok-department-input>
      	`,
      }

      const app = createApp(options)

      app.mount(context.$refs.showEmployeeSelect as HTMLElement)
    })

    return () => html`
      <link rel="stylesheet" .href="${CDN_PATH}antd.min.css" />
      <style>
        .ok-employee-tree,
        .ok-employee-input {
          display: block;
        }
        .ok-employee-select-wraper {
          width: 100%;
        }
      </style>

      <div ref="showEmployeeSelect" class="ok-employee-select-wraper"></div>
    `
  }
)
