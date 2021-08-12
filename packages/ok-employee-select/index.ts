/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-11 21:38:02
 * @LastEditors: 付静
 * @LastEditTime: 2021-08-12 10:49:18
 * @FilePath: /packages/ok-employee-select/index.ts
 */

import './ok-employee-more'
import './ok-employee-modal'

import { Select } from 'ant-design-vue'
import { classMap } from 'lit-html/directives/class-map.js'
import { styleMap } from 'lit-html/directives/style-map.js'
import { defineComponent, html, onMounted } from 'ok-lit'
import { createApp, ref } from 'vue'

import { i18n } from '../locales'
import { ANTD_VUE_CDN, COMMON_CSS_PATH } from '../path.config'
import { propsOptions } from './employee-props'
import useEmployeeSelect from './hook'
defineComponent('ok-employee-select', { ...propsOptions }, (props, context) => {
  onMounted(() => {
    const options = {
      setup() {
        const okEmployeeInput: any = ref(null)

        const params = useEmployeeSelect(props, context, okEmployeeInput)

        // 模拟单选
        const handleSelect = val => {
          // 配置了自动收起下拉框
          if (params.hideMenuOnMultiple.value) {
            okEmployeeInput.value?.blur()
          }
          if (params.multiple.value) return
          // 单选时处理value
          params.value.value = [val]
          // 单选收起下拉框
          okEmployeeInput.value?.blur()
        }

        const loadingText = i18n.$t('common.loading', '加载中')
        const noData = i18n.$t('common.noData', '暂无数据')

        // 暴露方法
        context.expose({
          clear: params.clearSelected,
          focus: () => {
            okEmployeeInput.value?.focus()
          },
          blur: () => {
            okEmployeeInput.value?.blur()
          },
        })
        return {
          ...params,
          okEmployeeInput,
          handleSelect,
          loadingText,
          noData,
        }
      },
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
            :dropdownStyle="dropdownstyle"
            style="width: 100%; height: 100%;"
            class="ok-employee-select"
            :getPopupContainer="getPopupContainer"
            :bordered="bordered"
            @search="searchByKey"
            @select="handleSelect"
            @click="handleInputClick"
            @blur="closeOpen"
            @focus="handleFocus"
            @deselect="handleDelete"
            @mouseenter="mouseenter"
            @mouseleave="mouseleave"
            @dropdownVisibleChange="dropdownVisibleChange">

            <template #suffixIcon>
              <img v-if="isMouseenter && !disabled && value.length" :src="closeIcon" style="height:14px; width: 14px;" class="head-clear-icon" @click="clearSelected" />
              <img v-else :src="searchIcon" style="height:14px; width: 14px;" class="head-search-icon"/>
            </template>
            <template #notFoundContent>
              <span v-if="loading">{{loadingText}}</span>
              <span v-else>{{noData}}</span>
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
                      width="20px"
                      :propsGetInfoByEmpId="propsGetInfoByEmpId"
                      height="20px"
                    ></ok-person-cell>
                    <span class="selected-head-name-head ellipsis1">{{ employee.employee_name }}</span>
                  </div>
                  <div class="selected-option">
                    <ok-person-cell
                      :propsGetInfoByEmpId="propsGetInfoByEmpId"
                      class="user-img__avatar"
                      :personInfo="employee"
                      width="40px"
                      height="40px"
                    ></ok-person-cell>

                    <div class="user-img__content">
                      <p style="display: flex;">
                        <span class="user-img__name ellipsis1 ">{{ employee.employee_name }}</span>
                        <span class="user-img__email ellipsis1">{{ employee.email }}</span>
                      </p>
                      <p class="user-img__d ellipsis1">{{ employee.department_name }}</p>
                    </div>
                  </div>
                </div>
              </slot>
            </a-select-option>
          </a-select>
          <ok-employee-modal
            v-if="mode==='tree'"
            :visible="visible"
            :inputValue="value"
            :multiple="multiple"
            :range="range"
            :secrecy="secrecy"
            :getContainerModal="getContainerModal"
            :modalZIndex="modalZIndex"
            :infoMap="infoMap"
            :collect="collectMap"
            :change="handleModalChange"
            :close="handleCloseModal"
            :remoteMethod="remoteMethod"
            :getRootDept="getRootDept"
            :getSubDept="getSubDept"
            :queryDeptUser="queryDeptUser"
            ></ok-employee-modal>
      	`,
    }

    const app = createApp(options)
    app.use(Select)
    app.mount(context.$refs.showEmployeeSelect as HTMLElement)
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
        background: var(--bl-n200-c, #f5f6f7);
        border: 1px solid var(--bl-n200-c, #f5f6f7);
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
      .user-img__name {
        max-width: 35%;
      }
      .user-img__email {
        flex: 1;
      }
      .user-img__d {
        max-width: 100%;
      }
    </style>

    <div
      ref="showEmployeeSelect"
      class=${classMap({
        'ok-employee-select-wraper': true,
        'no-border-radius': !props.hasBorderRadius,
        'border-radius-left': props.borderRadius === 'left',
        'border-radius-right': props.borderRadius === 'right',
        'border-radius-none': props.borderRadius === 'none',
        'is-error': !!props.isError,
      })}
      style=${styleMap({
        height: '100%',
        'line-height': '1',
        width: `${props.width && props.width}`,
      })}
    ></div>
  `
})
