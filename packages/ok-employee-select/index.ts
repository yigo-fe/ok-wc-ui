/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-11 21:38:02
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-19 14:12:52
 * @FilePath: /packages/ok-employee-select/index.ts
 */

import { defineComponent, html, onMounted, PropType } from 'ok-lit'
import { computed, createApp } from 'vue'

import CDN_PATH from '../path.config'

const propsOptions = {
  value: {
    type: (Array as unknown) as PropType<[]>,
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
    default: false,
  },
  secrecy: {
    type: (Boolean as unknown) as PropType<boolean>,
    default: false,
  },
  mode: {
    type: (String as unknown) as PropType<string>,
  },
  update: {
    // eslint-disable-next-line no-unused-vars
    type: (Function as unknown) as PropType<
      (ids: string[], options: []) => void
    >,
  },
}

defineComponent('ok-employee-select', { ...propsOptions }, (props, context) => {
  onMounted(() => {
    const options = {
      setup() {
        const mode = computed(() => props.mode)
        const value = computed(() => {
          if (!props.value) {
            return []
          } else {
            return typeof props.value === 'string' ? [props.value] : props.value
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
				<ok-employee-tree 
					v-show="mode==='tree'"			
					:value="value"
					:placeholder="placeholder"
					:range="range"
					:disabled="disabled"
          :multiple="multiple"
          :secrecy="secrecy"
					@update="updateValue"
          class="ok-employee-tree"
					></ok-employee-tree>
					
					<ok-employee-input 
						v-show="mode!=='tree'"
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
})
