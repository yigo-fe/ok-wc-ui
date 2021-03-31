/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-23 21:01:15
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-31 18:09:21
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
    const mode = computed(() => props.mode)
    const value = computed(() => {
      if (!props.value) {
        return []
      } else {
        return Array.isArray(props.value) ? props.value : [props.value]
      }
    })

    const placeholder = computed(() => props.placeholder)
    // disabled
    const disabled = computed(() => props.disabled)
    // multiple
    const multiple = computed(() => props.multiple)
    // 显示层级
    const displayLevel = computed(() => props.level)
    // 组织架构保密
    const secrecy = computed(() => props.secrecy)
    // 不展示边框
    const borderless = computed(() => props.borderless)

    onMounted(() => {
      const options = {
        setup() {
          // 更新组件外部value
          const updateValue = (e: CustomEvent) => {
            props.update && props.update(e.detail.value, e.detail.options)
          }
          return {
            mode,
            value,
            placeholder,
            disabled,
            multiple,
            displayLevel,
            secrecy,
            borderless,
            updateValue,
          }
        },
        template: `
				<ok-department-tree 
					v-if="mode==='tree'"			
					:value="value"
					:placeholder="placeholder"
					:disabled="disabled"
          :multiple="multiple"         
          :level="displayLevel"
          :secrecy="secrecy"
          :borderless="borderless"
					@update="updateValue"
          class="ok-employee-tree"
					></ok-department-tree>
					
					<ok-department-input 
            v-if="mode==='default'"
						:value="value"
            :placeholder="placeholder"
            :disabled="disabled"
            :multiple="multiple"
            :level="displayLevel"
            :borderless="borderless"
						@update="updateValue"
            class="ok-employee-input"
						></ok-department-input>
      	`,
      }

      setTimeout(() => {
        const app = createApp(options)

        app.mount(context.$refs.showEmployeeSelect as HTMLElement)
      })
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
