/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-11 21:38:02
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-20 15:01:19
 * @FilePath: /packages/ok-employee-select/ok-employee-input.ts
 */
import './ok-employee-more'

import { Button, Select } from 'ant-design-vue'
import { defineComponent, html, onMounted } from 'ok-lit'
import { createApp, h, ref } from 'vue'

import CDN_PATH from '../path.config'
import { propsOptions } from './employee-props'
import useEmployeeSelect from './hook-input'
import okEmployeeSelectCss from './style/ok-employee-select.less'
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
            isDisabled,
            multiple,
            placeholder,
            isOpen,
            isRange,
            loading,
            options,
            maxTagCount,
            value,
            searchByKey,
            exceedList,
            closeIcon,
            searchIcon,
            isMouseenter,
            noRemote,
            propsValue,
            setOpen,
            closeOpen,
            clearSelected,
            handleDelete,
            mouseenter,
            mouseleave,
          } = useEmployeeSelect(props, context)

          const exceedDelete = (e: CustomEvent) => {
            handleDelete(e.detail)
          }

          const maxTagPlaceholder = () => {
            return h('ok-employee-more', {
              exceedList: exceedList.value,
              onDelete: exceedDelete,
            })
          }

          const okEmployeeInput: any = ref(null)

          // 模拟单选
          const handleSelect = val => {
            if (multiple.value) return
            value.value = [val]
            okEmployeeInput.value?.blur()
          }

          return {
            okEmployeeInput,
            isDisabled,
            multiple,
            placeholder,
            isOpen,
            isRange,
            loading,
            options,
            maxTagCount,
            value,
            searchByKey,
            closeIcon,
            searchIcon,
            isMouseenter,
            noRemote,
            propsValue,
            maxTagPlaceholder,
            setOpen,
            closeOpen,
            clearSelected,
            handleDelete,
            mouseenter,
            mouseleave,
            handleSelect,
          }
        },
        // (此处全部设置多选，用多选模拟单选):mode="multiple ? 'multiple': 'default'"
        template: `
				<a-select
          ref="okEmployeeInput"			
					v-model:value="value"
          :a="propsValue"
					mode="multiple"
          :open="isOpen"
					:filter-option="noRemote ? true : false"
					:default-active-first-option="false"
					:placeholder="placeholder"
					:disabled="isDisabled"
					:maxTagCount="maxTagCount"
					:maxTagPlaceholder="maxTagPlaceholder"
          showArrow
          showSearch
					dropdownClassName="userSelectDropdown"
					style="width: 100%"
					class="ok-employee-select"
					@search="searchByKey"
          @select="handleSelect"
          @click="setOpen"
          @blur="closeOpen" 
          @deselect="handleDelete" 
          @mouseenter="mouseenter" 
          @mouseleave="mouseleave" >

          <template #suffixIcon>
            <img v-if="isMouseenter" :src="closeIcon" class="head-clear-icon" @click="clearSelected" />
            <img v-else :src="searchIcon" class="head-search-icon"/>
          </template>

          <template #notFoundContent>
          	<span v-if="loading">加载中</span>
          	<span v-else>暂无数据</span>
          </template>

					<a-select-option
						v-for="d in options"
						:key="d.employee_id"
						:value="d.employee_id"
					>
						<slot :item="d">
							<div class="option-list-item">
								<div class="selected-head">
									<ok-person-cell
										class="user-img__avatar__head"
										:personInfo="d"
										width="20"
										height="20"
									></ok-person-cell>
									<span class="selected-head-name-head">{{ d.employee_name }}</span>
								</div>
								<div class="selected-option">
									<ok-person-cell
										class="user-img__avatar"
										:personInfo="d"
										width="40"
										height="40"
									></ok-person-cell>

									<div class="user-img__content">
										<p>
											<span class="user-img__name">{{ d.employee_name }}</span>
											<span class="user-img__email">{{ d.email }}</span>
										</p>
										<p class="user-img__d">{{ d.department_name }}</p>
									</div>
								</div>
							</div>
						</slot>
					</a-select-option>
				</a-select>
      `,
      }

      const app = createApp(options)

      app.use(Button)
      app.use(Select)

      app.mount(context.$refs.showEmployeeSelectInput as HTMLElement)
    })

    return () => html`
      <link rel="stylesheet" .href="${CDN_PATH}antd.min.css" />
      <style>
        ${okEmployeeSelectCss}
      </style>
      <div ref="showEmployeeSelectInput" class="ok-employee-tree-wraper"></div>
    `
  }
)
