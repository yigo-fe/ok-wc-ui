/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 17:56:38
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-31 15:52:12
 * @FilePath: /packages/ok-employee-select/ok-employee-modal.ts
 */

import { Breadcrumb, Button, Input, Modal } from 'ant-design-vue'
import { defineComponent, html, onMounted, PropType } from 'ok-lit'
import { createApp } from 'vue'

import { i18n } from '../locales'
import { ANTD_VUE_CDN, COMMON_CSS_PATH } from '../path.config'
import useModalHandle from './hook-modal'
defineComponent(
  'ok-employee-modal',
  {
    multiple: {
      type: Boolean as unknown as PropType<boolean>,
      default: false,
    },
    range: {
      type: Array as unknown as PropType<string[]>,
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
          const params = useModalHandle(props)

          const title = i18n.$t('control.employeeSelect.title', '人员选择')
          const placeholder = i18n.$t(
            'placeholder.employeePlaceholder',
            '请输入姓名、邮箱前缀、工号'
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
            wrapClassName="ok-employee-modal-wrap"
            class="ok-tree-modal ok-employee-tree-modal"
            width="824px" 
            height="660px"
            :visible="visible" 
            :title="title"
            :zIndex="modalZIndex"
            :getContainer='getContainerModal'
            :closable="false"
            >
            <template #closeIcon></template>
            <div class="tree-content-wraper employee-tree-content-wraper">

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
                <div class="tree-content" v-show="!queryKey && !secrecy">
                  <a-breadcrumb v-if="remote">
                    <template #separator><span class="breadcrumb-separator"> > </span></template>
                    <a-breadcrumb-item href="" 
                      v-for=" item in breadcrumbList" 
                      :key="item.department_id"
                      @click="setBreadcrumb(item)"
                      >{{item.department_name}}</a-breadcrumb-item>
                  </a-breadcrumb>

                  <div class="list-wraper">
                    <p v-for="dept in deptList" 
                      :key="dept.department_id" 
                      class="item-detail dept" 
                      @click="handleDeptClick(dept)">
                      <img :src="deptIcon" class="dept-icon" />
                      <span>{{dept.department_name}}</span>
                    </p>
                    <p class="item-detail employee" 
                      v-for="employee in employeeList" 
                      :key="employee.employee_id"   
                      @click="handleEmployeeSelect(employee.employee_id)">
                      <ok-person-cell :personInfo="employee"></ok-person-cell>               
                      <span class="employee-name">{{employee.employee_name}}</span>
                      <span class="email ellipsis1">{{employee.email}}</span>   
                      <img v-if="isSelected(employee.employee_id)" :src="checkedIcon" class="checked-icon" /> 
                    </p>
                  </div>
                
                </div>

                
                <!--搜索的列表-->
                <div v-show="queryKey" class="search-list">
                  <p  
                    v-show= "searchResultList.length"
                    class="item-detail employee"                   
                    v-for="employee in searchResultList" 
                    :key="employee.employee_id"                  
                    @click="handleEmployeeSelect(employee.employee_id)">
                    <ok-person-cell :personInfo="employee"></ok-person-cell>               
                    <span class="employee-name">{{employee.employee_name}}</span>
                    <span class="email ellipsis1">{{employee.email}}</span>
                    <img v-if="isSelected(employee.employee_id)" :src="checkedIcon" class="checked-icon" />                 
                  </p>
                  <p v-show="!searchResultList.length" class="empty-text">{{i18n.$t('common.noData', '暂无数据')}}</p>
                </div>               

              </div>

              <div class="selected-wraper">
                <div class="selected-header">
                  <span class="selected-msg">{{i18n.$t('common.selected', '已选')}}：{{selectedList.length}}</span>
                  <span v-show="selectedList.length" class="clear-btn" @click="clearSelected">{{i18n.$t('common.clear', '清除')}}</span>
                </div>
                <div class="selected-list">
                  <p 
                    class="item-detail employee" 
                    v-for="employee in selectedList" 
                    :key="employee.employee_id"  
                    >
                    <ok-person-cell :personInfo="employee"></ok-person-cell>               
                    <span class="employee-name ellipsis1">{{employee.employee_name}}</span>
                    <span class="email ellipsis1">{{employee.email}}</span>    
                    <img @click="cancelSelect(employee.employee_id)" :src="closeIcon" class="close-icon" />               
                  </p>
                </div>            
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
      app.use(Modal)
      app.use(Button)
      app.use(Input)
      app.use(Breadcrumb)
      app.mount(context.$refs.showEmployeeModal as HTMLElement)
    })

    return () => html`
      <link rel="stylesheet" .href="${ANTD_VUE_CDN}" />
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <div ref="showEmployeeModal" class="ok-employee-modal"></div>
    `
  }
)
