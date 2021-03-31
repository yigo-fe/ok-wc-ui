/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-23 21:03:47
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-30 20:42:19
 * @FilePath: /packages/ok-department-select/ok-department-input.ts
 */
import { Select } from 'ant-design-vue'
import { defineComponent, html, onMounted } from 'ok-lit'
import { createApp, ref } from 'vue'

import CDN_PATH from '../path.config'
import { propsOptions } from './department-props'
import useDepartmentInput from './hook-input'
import okDepartmentInputCss from './style/ok-department-input.less'
defineComponent(
  'ok-department-input',
  { ...propsOptions },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const {
            testVal,
            value,
            multiple,
            placeholder,
            isDisabled,
            options,
            isOpen,
            searchByKey,
            maxTagCount,
            isMouseenter,
            closeIcon,
            searchIcon,
            setOpen,
            closeOpen,
            maxTagPlaceholder,
            clearSelected,
            handleDelete,
            mouseenter,
            mouseleave,
            dropdownVisibleChange,
          } = useDepartmentInput(props, context)

          const okDepartmentInputRef: any = ref(null)

          // 模拟单选
          const handleSelect = val => {
            if (multiple.value) return
            value.value = [val]
            okDepartmentInputRef.value?.blur()
          }

          return {
            okDepartmentInputRef,
            testVal,
            value,
            multiple,
            placeholder,
            isDisabled,
            options,
            isOpen,
            searchByKey,
            maxTagCount,
            isMouseenter,
            closeIcon,
            searchIcon,
            setOpen,
            closeOpen,
            handleSelect,
            maxTagPlaceholder,
            clearSelected,
            handleDelete,
            mouseenter,
            mouseleave,
            dropdownVisibleChange,
          }
        },
        template: `
        <a-select
          ref="okDepartmentInputRef"	
          show-search
          showArrow
          class="ok-department-select"
          :test="testVal"
          :open="isOpen"
          mode="multiple"
          :placeholder="placeholder"
          :disabled="isDisabled"
          :filter-option="false"
          :default-active-first-option="false"
          v-model:value="value"
          :maxTagCount="maxTagCount"
					:maxTagPlaceholder="maxTagPlaceholder"
          @select="handleSelect"
          @search="searchByKey"
          @click="setOpen"
          @blur="closeOpen"
          @deselect="handleDelete" 
          @mouseenter="mouseenter" 
          @mouseleave="mouseleave" 
          @dropdownVisibleChange="dropdownVisibleChange"
        >

          <template #suffixIcon>
            <img v-if="isMouseenter && !isDisabled && value.length" :src="closeIcon" class="head-clear-icon" @click="clearSelected" />
            <img v-else :src="searchIcon" class="head-search-icon"/>
          </template>

          <template #notFoundContent>
            <span v-if="loading">加载中</span>
            <span v-else>暂无数据</span>
          </template>
          
          <a-select-option
            v-for="item in options"
            :key="item.department_id"
            :value="item.department_id"
            >{{ item.display_value }}</a-select-option
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
  }
)
