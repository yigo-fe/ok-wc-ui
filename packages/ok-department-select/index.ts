/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-23 21:01:15
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-18 13:33:44
 * @FilePath: /packages/ok-department-select/index.ts
 */
import './ok-department-modal'
import './ok-department-more'

import {
  Button,
  Checkbox,
  Input,
  Modal,
  Popover,
  Select,
  Tree,
} from 'ant-design-vue'
import { defineComponent, html, onMounted } from 'ok-lit'
import { createApp, ref } from 'vue'

import { i18n } from '../locales'
import { CDN_PATH, COMMON_CSS_PATH } from '../path.config'
import { propsOptions } from './department-props'
import useDepartmentSelect from './hook'
// import okDepartmentInputCss from './style/ok-department-input.less'
defineComponent(
  'ok-department-select',
  { ...propsOptions },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const params = useDepartmentSelect(props, context)

          const okDepartmentSelect: any = ref(null)
          // 模拟单选
          const handleSelect = val => {
            if (params.multiple.value) return
            // 单选时处理value
            params.value.value = [val]
            // 单选收起下拉框
            okDepartmentSelect.value?.blur()
          }
          return {
            okDepartmentSelect,
            handleSelect,
            ...params,
            i18n,
          }
        },
        template: `
        <a-select
          ref="okDepartmentSelect"
          class="ok-department-select"
          show-search
          showArrow
          mode="multiple"
          style="width: 100%; height: 100%;"    
          :vip="testVal"
          :open="isOpen"          
          :placeholder="placeholder"
          :disabled="disabled"
          :filter-option="false"
          :default-active-first-option="false"
          v-model:value="value"
          :maxTagCount="maxTagCount"
					:maxTagPlaceholder="maxTagPlaceholder"
          :dropdownStyle="dropdownstyle"
          :getPopupContainer="getPopupContainer"
          @select="handleSelect"
          @search="searchByKey"
          @click="handleInputClick"
          @focus="handleFocus"
          @blur="closeOpen"
          @deselect="handleDelete" 
          @mouseenter="mouseenter" 
          @mouseleave="mouseleave" 
          @dropdownVisibleChange="dropdownVisibleChange"
        >

          <template #suffixIcon>
            <img v-if="isMouseenter && !disabled && value.length" :src="closeIcon" style="height:16px; width: 16px;" class="head-clear-icon" @click="clearSelected" />
            <img v-else :src="searchIcon" style="height:16px; width: 16px;" class="head-search-icon"/>
          </template>

          <template #notFoundContent>
            <span v-if="loading">{{i18n.$t('common.loading', '加载中')}}</span>
            <span v-else>{{i18n.$t('common.noData', '暂无数据')}}</span>
          </template>
          
          <a-select-option
            v-for="item in options"
            :key="item.department_id"
            :value="item.department_id"
            >{{ item.display_value }}</a-select-option
          >
        </a-select>
        <ok-department-modal
          v-if="mode==='tree'"
          :visible="visible" 
          :inputValue="value"
          :multiple="multiple"
          :displayLevel="displayLevel"
          :secrecy="secrecy"
          :getContainerModal="getContainerModal"
          :modalZIndex="modalZIndex"
          :infoMap="infoMap"           
          :collect="collectMap"
          :change="handleModalChange"
          :close="handleCloseModal" 
          ></ok-department-modal>
      `,
      }

      const app = createApp(options)
      app.use(Checkbox)
      app.use(Popover)
      app.use(Select)
      app.use(Button)
      app.use(Input)
      app.use(Modal)
      app.use(Tree)
      app.mount(context.$refs.showDepartmentTree as HTMLElement)
    })
    return () => html`
      <link rel="stylesheet" .href="${CDN_PATH}antd.min.css" />
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <div
        ref="showDepartmentTree"
        class="ok-department-select-wraper ok-department-select-root"
      ></div>
    `
  }
)
