/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-23 21:01:15
 * @LastEditors: 付静
 * @LastEditTime: 2021-06-22 15:03:58
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
import { classMap } from 'lit-html/directives/class-map.js'
import { defineComponent, html, onMounted } from 'ok-lit'
import { createApp, ref } from 'vue'

import { i18n } from '../locales'
import { ANTD_VUE_CDN, COMMON_CSS_PATH } from '../path.config'
import { propsOptions } from './department-props'
import useDepartmentSelect from './hook'
defineComponent(
  'ok-department-select',
  { ...propsOptions },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const okDepartmentInput: any = ref(null)
          const params = useDepartmentSelect(props, okDepartmentInput)

          // 模拟单选
          const handleSelect = val => {
            if (params.multiple.value) return
            // 单选时处理value
            params.value.value = [val]
            // 单选收起下拉框
            okDepartmentInput.value?.blur()
          }
          return {
            okDepartmentInput,
            handleSelect,
            ...params,
            i18n,
          }
        },
        template: `
        <a-select
          ref="okDepartmentInput"
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
          :bordered="bordered"
          dropdownClassName="ok-dept-select-dropdown"
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
            <img v-if="isMouseenter && !disabled && value.length" :src="closeIcon" style="height:14px; width: 14px;" class="head-clear-icon" @click="clearSelected" />
            <img v-else :src="searchIcon" style="height:14px; width: 14px;" class="head-search-icon"/>
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
      app.mount(context.$refs.showDeptSelect as HTMLElement)
    })
    return () => html`
      <link rel="stylesheet" .href="${ANTD_VUE_CDN}" />
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <style>
        .ant-select {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          color: rgba(0, 0, 0, 0.85);
          font-size: 14px;
          font-variant: tabular-nums;
          line-height: initial;
          list-style: none;
          font-feature-settings: 'tnum';
          position: relative;
          display: inline-block;
          cursor: pointer;
        }
        .ant-select-multiple .ant-select-selector {
          position: relative;
          background-color: #fff;
          border: 1px solid var(--bl-n300-c, #dee0e3);
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding: 1px 4px;
          border-radius: 4px;
          min-height: 28px;
        }
        .ant-select-multiple .ant-select-selection-search {
          position: relative;
          margin-left: 0.5px;
        }
        .ant-select-multiple .ant-select-selection-placeholder {
          position: absolute;
          top: 50%;
          right: 30px;
          left: 11px;
          transform: translateY(-50%);
          transition: all 0.3s;
        }
        .ant-select-selection-placeholder {
          flex: 1;
          overflow: hidden;
          color: #bfbfbf;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .ant-select .ant-select-arrow {
          display: inline-block;
          color: inherit;
          font-style: normal;
          line-height: 0;
          text-transform: none;
          vertical-align: -0.125em;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          position: absolute;
          width: 14px;
          height: 14px;
          margin-top: 0;
          color: rgba(0, 0, 0, 0.25);
          font-size: 12px;
          line-height: 1;
          text-align: center;
          pointer-events: auto;
          top: calc(50% - 7px);
          right: 14px;
        }
        .ant-select-multiple .ant-select-selection-item {
          position: relative;
          display: flex;
          flex: none;
          box-sizing: border-box;
          max-width: 100%;
          height: 24px;
          margin-top: 2px;
          margin-right: 4px;
          margin-bottom: 2px;
          padding: 0 4px 0 8px;
          line-height: 22px;
          background: var(--bl-n200-c, #f5f7f7);
          border: 1px solid var(--bl-n200-c, #f5f7f7);
          border-radius: 2px;
          cursor: default;
          transition: font-size 0.3s, line-height 0.3s, height 0.3s;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .ant-select-multiple .ant-select-selection-item-content {
          display: inline-block;
          margin-right: 4px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          font-weight: 400;
          color: var(--bl-n900-c, #1f2329);
        }
        .ant-select-multiple .ant-select-selection-item-remove {
          color: inherit;
          font-style: normal;
          line-height: 0;
          text-align: center;
          text-transform: none;
          vertical-align: -0.125em;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: rgba(0, 0, 0, 0.45);
          font-weight: 700;
          line-height: inherit;
          cursor: pointer;
          display: inline-block;
          font-size: 12px;
          transform: scale(0.83333333) rotate(0deg);
        }
        .ant-select-disabled .ant-select-selection-item-remove {
          display: none;
        }
        .anticon {
          display: inline-block;
          color: inherit;
          font-style: normal;
          line-height: 0;
          text-align: center;
          text-transform: none;
          vertical-align: -0.125em;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .ant-select-multiple .ant-select-selection-item-remove > .anticon {
          vertical-align: -0.2em;
        }
        .ant-select-multiple .ant-select-selection-item-remove > * {
          line-height: 1;
        }
        .ant-select-disabled.ant-select-multiple .ant-select-selector input {
          cursor: not-allowed;
        }
        .ant-select-multiple
          .ant-select-selector
          .ant-select-selection-search-input {
          margin: 0;
          padding: 0;
          background: transparent;
          border: none;
          outline: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        .ant-select-multiple .ant-select-selection-search-input {
          width: 100%;
          min-width: 4.1px;
        }
        .ant-select-multiple .ant-select-selection-search-mirror {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 999;
          white-space: nowrap;
          visibility: hidden;
        }
      </style>
      <div
        ref="showDeptSelect"
        class=${classMap({
          'ok-department-select-wraper': true,
          'ok-department-select-root': true,
          'no-border-radius': !props.hasBorderRadius,
        })}
      ></div>
    `
  }
)
