/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-23 21:03:32
 * @LastEditors: 付静
 * @LastEditTime: 2021-06-18 18:23:45
 * @FilePath: /packages/ok-department-select/ok-department-modal.ts
 */
import { Button, Checkbox, Input, Modal, Tree } from 'ant-design-vue'
import { defineComponent, html, onMounted, PropType } from 'ok-lit'
import { createApp } from 'vue'

import { i18n } from '../locales'
import { ANTD_VUE_CDN, COMMON_CSS_PATH } from '../path.config'
import useDepartmentModal from './hook-modal'
defineComponent(
  'ok-department-modal',
  {
    multiple: {
      type: Boolean as unknown as PropType<boolean>,
      default: false,
    },
    displayLevel: {
      type: String as unknown as PropType<string>,
    },
    secrecy: {
      type: Boolean as unknown as PropType<boolean>,
      default: false,
    },
    visible: {
      type: Boolean as unknown as PropType<boolean>,
      default: false,
    },
    inputValue: {
      type: Array as unknown as PropType<string[]>,
      default: () => {
        return []
      },
    },
    modalZIndex: {
      type: Number as unknown as PropType<number>,
    },
    getContainerModal: {
      type: Function as unknown as PropType<() => void>,
    },
    infoMap: {
      type: Object as unknown as PropType<object>,
      default: () => {
        return {}
      },
    },
    collect: {
      type: Function as unknown as PropType<
        // eslint-disable-next-line no-unused-vars
        (list: []) => void
      >,
    },
    change: {
      type: Function as unknown as PropType<
        // eslint-disable-next-line no-unused-vars
        (ids: string[]) => void
      >,
    },
    close: {
      type: Function as unknown as PropType<() => void>,
    },
  },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const params = useDepartmentModal(props)
          const title = i18n.$t('control.departmentSelect.title', '部门选择')
          const placeholder = i18n.$t(
            'placeholder.deptPlaceholder',
            '请输入部门名称'
          )
          return {
            ...params,
            i18n,
            title,
            placeholder,
          }
        },
        template: `
        <a-modal 
          wrapClassName="ok-dept-modal-wrap"
          class="ok-tree-modal ok-dept-tree-modal"
          :visible="visible" 
          :title="title"
          width="824px" 
          :zIndex="modalZIndex"
          :getContainer='getContainerModal'
          :bodyStyle="{padding: '24px 24px 0 24px'}"
          destroyOnClose>
          <template #closeIcon>
            <svg @click="cancelHandle" t="1624006538612" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1098" width="16" height="16"><path d="M892.8531595 213.99728987L214.1267437 892.8531595c-22.65441975 22.65441975-59.5487605 22.65441975-82.33263407 0-22.65441975-22.65441975-22.65441975-59.5487605 0-82.33263407l678.7264158-678.7264158c22.65441975-22.65441975 59.5487605-22.65441975 82.33263407 0s22.78387358 59.5487605 0 82.20318024z" p-id="1099" fill="#ffffff"></path><path d="M892.8531595 892.8531595c-22.65441975 22.65441975-59.5487605 22.65441975-82.33263407 0L131.79410963 213.99728987c-22.65441975-22.65441975-22.65441975-59.5487605 0-82.33263406s59.5487605-22.65441975 82.33263407 0l678.7264158 678.7264158c22.78387358 22.91332741 22.78387358 59.67821431 0 82.46208789z" p-id="1100" fill="#ffffff"></path></svg>
          </template>
          <div class="tree-content-wraper dept-tree-content-wraper">

            <div class="tree-wraper">
              <div class="tree-search">
                <a-input  
                  :placeholder="placeholder"
                  v-model:value="queryKey"
                  @change="searchByKey">
                  <template #prefix>
                    <img :src="searchIcon" class="tree-search-icon" />  
                  </template>
                </a-input>                    
              </div>
          
             

              <!--人员部门展示-->
              <div class="tree-content department" v-show="!queryKey && !secrecy">          
                <a-tree
                  :selectable="false"
                  :replaceFields="{ key: 'department_id' }"
                  :tree-data="treeData"
                  :load-data="loadData"
                  :expandedKeys="expandedKeys"
                >
                  <template v-slot:title="{ department_name, department_id }">
                    <span
                      @click="handleSelect(department_id)"
                      class="department-tree-item"
                    >
                      <a-checkbox
                        :checked="isSelected(department_id)"
                        class="tree-checkbox"
                      >
                      </a-checkbox>
                      <img
                        class="tree-item-icon"
                        :src="deptIcon"
                        alt=""
                      />
                      <span class="ellipsis1">{{ department_name }}</span>
                    </span>
                  </template>
                </a-tree>
              
              </div>

              
              <!--搜索的列表-->
              <div v-show="queryKey" class="search-list">

                <ul v-show="searchResultList.length">
                  <li
                    class="search-result-item"
                    v-for="item in searchResultList"
                    :key="item.department_id"                  
                  >
                    <a-checkbox
                      :checked="isSelected(item.department_id)"
                      @click="handleSelect(item.department_id)"
                    ></a-checkbox>
                    <img
                      class="tree-item-icon"
                      :src="deptIcon"
                      alt=""
                    />
                    <span class="ellipsis1 mr10">{{
                      item.display_value
                    }}</span>
                  </li>
                </ul>
					
                <p v-show="!searchResultList.length" class="empty-text">{{i18n.$t('common.noData', '暂无数据')}}</p>
              </div>               

            </div>

            <div class="selected-wraper">
              <div class="selected-header">
                <span class="selected-msg">{{i18n.$t('common.selected', '已选')}}：{{selectedList.length}}</span>
                <span v-show="selectedList.length" class="clear-btn" @click="clearSelected">{{i18n.$t('common.clear', '清除')}}</span>
              </div>

              <ul class="selected-list">
                <li
                  class="selected-department-item"
                  v-for="(item, index) in selectedList"
                  :key="index"
                >
                  <a-checkbox
                    :checked="isSelected(item.department_id)"
                    @click="cancelSelect(item.department_id)"
                  ></a-checkbox>
                  <img
                    class="tree-item-icon"
                    :src="deptIcon"
                    alt=""
                  />
                  <span class="ellipsis1 mr10">{{
                    item.display_value
                  }}</span>

                  <span class="close-icon" @click="cancelSelect(item.department_id)">
                    <svg t="1624011089668" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1335" width="14" height="14"><path d="M892.8531595 213.99728987L214.1267437 892.8531595c-22.65441975 22.65441975-59.5487605 22.65441975-82.33263407 0-22.65441975-22.65441975-22.65441975-59.5487605 0-82.33263407l678.7264158-678.7264158c22.65441975-22.65441975 59.5487605-22.65441975 82.33263407 0s22.78387358 59.5487605 0 82.20318024z" p-id="1336" fill="#8F959E"></path><path d="M892.8531595 892.8531595c-22.65441975 22.65441975-59.5487605 22.65441975-82.33263407 0L131.79410963 213.99728987c-22.65441975-22.65441975-22.65441975-59.5487605 0-82.33263406s59.5487605-22.65441975 82.33263407 0l678.7264158 678.7264158c22.78387358 22.91332741 22.78387358 59.67821431 0 82.46208789z" p-id="1337" fill="#8F959E"></path></svg>
                  </span>  

                </li>
              </ul>
           
            </div>
          </div>

          <template #footer>
            <div>
              <a-button class="btn-cancle" @click="cancelHandle">{{i18n.$t('common.cancel', '取消')}}</a-button>
              <a-button class="btn-ok" type="primary" @click="okHandle">{{i18n.$t('common.confirm', '确定')}}</a-button>
            </div>
          </template>
        </a-modal>
      `,
      }

      const app = createApp(options)
      app.use(Checkbox)
      app.use(Button)
      app.use(Input)
      app.use(Modal)
      app.use(Tree)
      app.mount(context.$refs.showDeptTreeModal as HTMLElement)
    })
    return () => html`
      <link rel="stylesheet" .href="${ANTD_VUE_CDN}" />
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <div ref="showDeptTreeModal" class="ok-department-select-wraper"></div>
    `
  }
)
