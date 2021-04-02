/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-11 21:38:02
 * @LastEditors: 付静
 * @LastEditTime: 2021-04-01 15:49:30
 * @FilePath: /packages/ok-employee-select/ok-employee-input.ts
 */
import './ok-employee-more'

import { Select } from 'ant-design-vue'
import { defineComponent, html, onMounted } from 'ok-lit'
import { createApp, ref } from 'vue'

import CDN_PATH from '../path.config'
import { propsOptions } from './employee-props'
import useEmployeeSelect from './hook-input'
// import okEmployeeSelectCss from './style/ok-employee-select.less'
defineComponent(
  'ok-employee-input',
  {
    ...propsOptions,
  },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const {
            testVal,
            disabled,
            placeholder,
            multiple,
            isOpen,
            loading,
            options,
            maxTagCount,
            value,
            closeIcon,
            searchIcon,
            borderless,
            isMouseenter,
            searchByKey,
            remote,
            setOpen,
            closeOpen,
            clearSelected,
            handleDelete,
            mouseenter,
            mouseleave,
            filterOption,
            dropdownVisibleChange,
            maxTagPlaceholder,
          } = useEmployeeSelect(props, context)

          const okEmployeeInput: any = ref(null)

          // 模拟单选
          const handleSelect = val => {
            if (multiple.value) return
            value.value = [val]
            okEmployeeInput.value?.blur()
          }

          return {
            okEmployeeInput,
            disabled,
            multiple,
            placeholder,
            isOpen,
            loading,
            options,
            maxTagCount,
            value,
            searchByKey,
            closeIcon,
            searchIcon,
            borderless,
            isMouseenter,
            remote,
            testVal,
            maxTagPlaceholder,
            setOpen,
            closeOpen,
            clearSelected,
            handleDelete,
            mouseenter,
            mouseleave,
            handleSelect,
            filterOption,
            dropdownVisibleChange,
          }
        },
        // (此处全部设置多选，用多选模拟单选):mode="multiple ? 'multiple': 'default'"
        template: `
				<a-select
          ref="okEmployeeInput"			
					v-model:value="value"
          :a="testVal"
					mode="multiple"
          :open="isOpen"
					:filter-option="!remote ? filterOption : false"
					:default-active-first-option="false"
					:placeholder="placeholder"
					:disabled="disabled"
					:maxTagCount="maxTagCount"
					:maxTagPlaceholder="maxTagPlaceholder"
          showArrow
          showSearch
					dropdownClassName="userSelectDropdown"
					style="width: 100%"
					class="ok-employee-select"
          :class="{'no-border': borderless}"
					@search="searchByKey"
          @select="handleSelect"
          @click="setOpen"
          @blur="closeOpen" 
          @deselect="handleDelete" 
          @mouseenter="mouseenter" 
          @mouseleave="mouseleave" 
          @dropdownVisibleChange="dropdownVisibleChange">

          <template #suffixIcon>
            <img v-if="isMouseenter && !disabled && value.length" :src="closeIcon" class="head-clear-icon" @click="clearSelected" />
            <img v-else :src="searchIcon" class="head-search-icon"/>
          </template>

          <template #notFoundContent>
          	<span v-if="loading">加载中</span>
          	<span v-else>暂无数据</span>
          </template>

					<a-select-option
						v-for="employee in options"
						:key="employee.employee_id"
						:value="employee.employee_id"
					>
						<slot :item="employee">
              <div class="option-list-item" :class="{'isDropdown': open}">
                <div class="selected-head">
                  <ok-person-cell
                    class="user-img__avatar__head"
                    :personInfo="employee"
                    width="20"
                    height="20"
                  ></ok-person-cell>
                  <span class="selected-head-name-head">{{ employee.employee_name }}</span>
                </div>
                <div class="selected-option">
                  <ok-person-cell
                    class="user-img__avatar"
                    :personInfo="employee"
                    width="40"
                    height="40"
                  ></ok-person-cell>

                  <div class="user-img__content">
                    <p>
                      <span class="user-img__name">{{ employee.employee_name }}</span>
                      <span class="user-img__email">{{ employee.email }}</span>
                    </p>
                    <p class="user-img__d">{{ employee.department_name }}</p>
                  </div>
                </div>
              </div>
						</slot>
					</a-select-option>
				</a-select>
      `,
      }

      const app = createApp(options)

      app.use(Select)
      app.mount(context.$refs.showEmployeeSelectInput as HTMLElement)
    })

    return () => html`
      <link rel="stylesheet" .href="${CDN_PATH}antd.min.css" />
      <link rel="stylesheet" .href="${CDN_PATH}common.css" />
      <div ref="showEmployeeSelectInput" class="ok-employee-tree-wraper"></div>
    `
  }
)
