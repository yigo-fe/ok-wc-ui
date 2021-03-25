/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-23 21:03:47
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-23 22:03:03
 * @FilePath: /packages/ok-department-select/ok-department-input.ts
 */
import { Select } from 'ant-design-vue'
import { defineComponent, html, onMounted } from 'ok-lit'
import { createApp } from 'vue'

import CDN_PATH from '../path.config'
import useDepartmentInput from './hook-input'
import okDepartmentInputCss from './style/ok-department-input.less'
defineComponent('ok-department-input', {}, (props, context) => {
  onMounted(() => {
    const options = {
      setup() {
        const {
          value,
          multiple,
          placeholder,
          isDisabled,
          options,
          isOpen,
          searchByKey,
          setOpen,
          closeOpen,
        } = useDepartmentInput(props, context)
        return {
          value,
          multiple,
          placeholder,
          isDisabled,
          options,
          isOpen,
          searchByKey,
          setOpen,
          closeOpen,
        }
      },
      template: `
        <a-select
        show-search
        allowClear
        showArrow
        class="ok-department-select"
        :open="isOpen"
        mode="multiple"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :filter-option="false"
        :default-active-first-option="false"
        v-model:value="value"
        @search="searchByKey"
        @click="setOpen"
        @blur="closeOpen"
      >
        <a-select-option
          v-for="item in options"
          :key="item.departmentId"
          :value="item.departmentId"
          >{{ item.displayValue }}</a-select-option
        >
      </a-select>
      `,
    }

    const app = createApp(options)
    app.use(Select)

    app.mount(context.$refs.showDepartmentInput as HTMLElement)
  })
  return () => html`
    <link rel="stylesheet" .href="${CDN_PATH}antd.min.css" />
    <style>
      ${okDepartmentInputCss}
    </style>

    <div ref="showDepartmentInput" class="ok-department-select-wraper"></div>
  `
})
