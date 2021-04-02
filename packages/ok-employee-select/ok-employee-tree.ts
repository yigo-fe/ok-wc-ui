/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 17:56:38
 * @LastEditors: 付静
 * @LastEditTime: 2021-04-01 15:08:59
 * @FilePath: /packages/ok-employee-select/ok-employee-tree.ts
 */
import {
  Breadcrumb,
  Button,
  Input,
  Modal,
  Popover,
  Select,
} from 'ant-design-vue'
import { defineComponent, html, onMounted } from 'ok-lit'
import { createApp } from 'vue'

import CDN_PATH from '../path.config'
import { propsOptions } from './employee-props'
import useEmployeeTree from './hook-tree'
// import okEmployeeTreeCss from './style/ok-employee-tree.less'

defineComponent(
  'ok-employee-tree',
  {
    ...propsOptions,
  },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const {
            testVal,
            value,
            options,
            placeholder,
            disabled,
            multiple,
            range,
            secrecy,
            remote,
            deptIcon,
            checkedIcon,
            closeIcon,
            searchIcon,
            borderless,
            visible,
            deptList,
            employeeList,
            searchResultList,
            breadcrumbList,
            selectedList,
            queryKey,
            isMouseenter,
            maxTagCount,
            handleDelete,
            maxTagPlaceholder,
            mouseenter,
            mouseleave,
            handleDeptClick,
            handleEmployeeSelect,
            cancelHandle,
            okHandle,
            handleOpenModal,
            setBreadcrumb,
            handleRootClick,
            cancelSelect,
            clearSelected,
            isSelected,
            searchEmployeeById,
            searchByKey,
          } = useEmployeeTree(props, context)

          return {
            testVal,
            value,
            options,
            placeholder,
            disabled,
            multiple,
            range,
            secrecy,
            remote,
            deptIcon,
            checkedIcon,
            closeIcon,
            searchIcon,
            borderless,
            visible,
            deptList,
            employeeList,
            searchResultList,
            breadcrumbList,
            selectedList,
            queryKey,
            isMouseenter,
            maxTagCount,
            handleDelete,
            maxTagPlaceholder,
            mouseenter,
            mouseleave,
            handleDeptClick,
            handleEmployeeSelect,
            cancelHandle,
            okHandle,
            handleOpenModal,
            setBreadcrumb,
            handleRootClick,
            cancelSelect,
            clearSelected,
            isSelected,
            searchEmployeeById,
            searchByKey,
          }
        },
        template: `
          <a-select
            ref="okEmployeeInput"			
            :value="value"
            :a="testVal"
            mode="multiple"
            showArrow
            showSearch          
            style="width: 100%"
            class="ok-employee-select"
            :class="{'no-border': borderless}"
            :open="false"         
            :placeholder="placeholder"
            :disabled="disabled"
            :maxTagCount="maxTagCount"
            :maxTagPlaceholder="maxTagPlaceholder"
            @click="handleOpenModal"        
            @deselect="handleDelete" 
            @mouseenter="mouseenter" 
            @mouseleave="mouseleave" >

            <template #suffixIcon>
              <img v-if="isMouseenter && !disabled && value.length" :src="closeIcon" class="head-clear-icon" @click="clearSelected" />
              <img v-else :src="searchIcon" class="head-search-icon"/>
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

          <a-modal 
            class="ok-employee-tree-modal"
            :visible="visible" 
            title="人员选择" 
            width="824px" 
            height="660px">
            <template #closeIcon></template>
            <div class="employee-tree-content-wraper">

              <div class="tree-wraper">
                <div class="tree-search">
                  <a-input  
                    placeholder="请输入人员名称"
                    v-model:value="queryKey"
                    @change="searchByKey">
                    <template #prefix>
                      <img :src="searchIcon" class="dept-icon" />  
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
                      <span class="email">{{employee.email}}</span>   
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
                    <span class="email">{{employee.email}}</span>
                    <img v-if="isSelected(employee.employee_id)" :src="checkedIcon" class="checked-icon" />                 
                  </p>
                  <p v-show="!searchResultList.length" class="empty-text">暂无数据</p>
                </div>               

              </div>

              <div class="selected-wraper">
                <div class="selected-header">
                  <span class="selected-msg">已选：{{selectedList.length}}</span>
                  <span v-show="selectedList.length" class="clear-btn" @click="clearSelected">清除</span>
                </div>
                <div class="selected-list">
                  <p 
                    class="item-detail employee" 
                    v-for="employee in selectedList" 
                    :key="employee.employee_id"  
                    @click="cancelSelect(employee.employee_id)">
                    <ok-person-cell :personInfo="employee"></ok-person-cell>               
                    <span class="employee-name">{{employee.employee_name}}</span>
                    <span class="email">{{employee.email}}</span>    
                    <img :src="closeIcon" class="close-icon" />               
                  </p>
                </div>            
              </div>
            </div>

            <template #footer>
              <div>
                <a-button class="btn-cancle" @click="cancelHandle">取消</a-button>
                <a-button class="btn-ok" type="primary" @click="okHandle">确定</a-button>
              </div>
            </template>
          </a-modal>
        `,
      }
      const app = createApp(options)
      app.use(Breadcrumb)
      app.use(Popover)
      app.use(Select)
      app.use(Button)
      app.use(Input)
      app.use(Modal)
      app.mount(context.$refs.showEmployeeTree as HTMLElement)
    })

    return () => html`
      <link rel="stylesheet" .href="${CDN_PATH}antd.min.css" />
      <link rel="stylesheet" .href="${CDN_PATH}common.css" />

      <div ref="showEmployeeTree" class="ok-employee-tree-wraper"></div>
    `
  }
)
