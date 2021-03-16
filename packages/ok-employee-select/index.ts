/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-11 21:38:02
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-16 11:12:54
 * @FilePath: /packages/ok-employee-select/index.ts
 */

import { defineComponent, html, onMounted, PropType } from 'ok-lit'
import { computed, createApp } from 'vue'

import CDN_PATH from '../path.config'

defineComponent(
  'ok-employee-select',
  {
    value: {
      type: (Array as unknown) as PropType<string[]>,
    },
    range: {
      type: (Array as unknown) as PropType<string[]>,
    },
    placeholder: {
      type: (String as unknown) as PropType<string>,
    },
    disabled: {
      type: (Boolean as unknown) as PropType<boolean>,
      default: false,
    },
    multiple: {
      type: (Boolean as unknown) as PropType<boolean>,
      default: true,
    },
    mode: {
      type: (String as unknown) as PropType<string>,
    },
    update: {
      // eslint-disable-next-line no-unused-vars
      type: (Function as unknown) as PropType<(ids: string[]) => void>,
    },
  },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const mode = computed(() => props.mode)
          const value = computed(() => props.value)
          const disabled = computed(() => props.disabled)
          const placeholder = computed(() => props.placeholder)
          const multiple = computed(() => props.multiple)
          const range = computed(() => props.range)

          // 更新组件外部value
          const updateValue = (e: CustomEvent) => {
            props.update && props.update(e.detail)
          }

          return {
            mode,
            value,
            disabled,
            placeholder,
            multiple,
            range,
            updateValue,
          }
        },
        template: `
				<ok-employee-tree 
					v-if="mode==='tree'"			
					:value="value"
					:placeholder="placeholder"
					:range="range"
					:disabled="disabled"
          :multiple="multiple"
					@update="updateValue"
          class="ok-employee-tree"
					></ok-employee-tree>
					
					<ok-employee-input 
						v-else
						:value="value"
            :placeholder="placeholder"
            :range="range"
            :disabled="disabled"
            :multiple="multiple"
						@update="updateValue"
            class="ok-employee-input"
						></ok-employee-input>
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
