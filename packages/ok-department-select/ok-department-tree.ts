/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-23 21:03:32
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-31 13:34:48
 * @FilePath: /packages/ok-department-select/ok-department-tree.ts
 */
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
import { createApp } from 'vue'

import CDN_PATH from '../path.config'
import { propsOptions } from './department-props'
import useDepartmentInput from './hook-tree'
import okDepartmentInputCss from './style/ok-department-input.less'
defineComponent('ok-department-tree', { ...propsOptions }, (props, context) => {
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
          queryKey,
          searchByKey,
          maxTagCount,
          visible,
          searchResultList,
          selectedList,
          isMouseenter,
          closeIcon,
          searchIcon,
          deptIcon,
          checkedIcon,
          treeData,
          expandedKeys,
          secrecy,
          handleSelect,
          maxTagPlaceholder,
          handleOpenModal,
          clearSelected,
          handleDelete,
          mouseenter,
          mouseleave,
          cancelHandle,
          okHandle,
          loadData,
          isSelected,
        } = useDepartmentInput(props, context)
        return {
          testVal,
          value,
          multiple,
          placeholder,
          isDisabled,
          options,
          queryKey,
          searchByKey,
          maxTagCount,
          visible,
          searchResultList,
          selectedList,
          isMouseenter,
          closeIcon,
          searchIcon,
          deptIcon,
          checkedIcon,
          treeData,
          expandedKeys,
          secrecy,
          handleSelect,
          maxTagPlaceholder,
          handleOpenModal,
          clearSelected,
          handleDelete,
          mouseenter,
          mouseleave,
          cancelHandle,
          okHandle,
          loadData,
          isSelected,
        }
      },
      template: `
        <a-select
          ref="okDepartmentInputRef"	
          show-search
          showArrow
          class="ok-department-select"
          :test="testVal"
          mode="multiple"
          :placeholder="placeholder"
          :disabled="isDisabled"      
          :value="value"
          :maxTagCount="maxTagCount"
          :maxTagPlaceholder="maxTagPlaceholder"
          :open="false"
          @click="handleOpenModal"
          @deselect="handleDelete" 
          @mouseenter="mouseenter" 
          @mouseleave="mouseleave" 
        >

          <template #suffixIcon>
            <img v-if="isMouseenter && !isDisabled && value.length" :src="closeIcon" class="head-clear-icon" @click="clearSelected" />
            <img v-else :src="searchIcon" class="head-search-icon"/>
          </template>

          <a-select-option
            v-for="item in options"
            :key="item.department_id"
            :value="item.department_id"
            >{{ item.display_value }}</a-select-option
          >
        </a-select>

        <a-modal 
          class="ok-employee-tree-modal"
          :visible="visible" 
          title="部门选择" 
          width="824px" 
          height="660px" 
          destroyOnClose>
          <template #closeIcon></template>
          <div class="employee-tree-content-wraper">

            <div class="tree-wraper">
              <div class="tree-search">
                <a-input  
                  placeholder="请输入部门名称"
                  v-model:value="queryKey"
                  @change="searchByKey">
                  <template #prefix>
                    <img :src="searchIcon" class="dept-icon" />  
                  </template>
                </a-input>                    
              </div>

              <!--人员部门展示-->
              <div class="tree-content" v-show="!queryKey && !secrecy">          
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
                      <span>{{ department_name }}</span>
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
                    <span class="item-display-value">{{
                      item.display_value
                    }}</span>
                  </li>
                </ul>
					
                <p v-show="!searchResultList.length" class="empty-text">暂无数据</p>
              </div>               

            </div>

            <div class="selected-wraper">
              <div class="selected-header">
                <span class="selected-msg">已选：{{selectedList.length}}</span>
                <span v-show="selectedList.length" class="clear-btn" @click="clearSelected">清除</span>
              </div>

              <ul class="selected-list">
                <li
                  class="selected-department-item"
                  v-for="(item, index) in selectedList"
                  :key="index"
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
                  <span class="item-display-value">{{
                    item.display_value
                  }}</span>

                  <img :src="closeIcon" class="close-icon" /> 
                </li>
              </ul>
           
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
    <style>
      ${okDepartmentInputCss}
    </style>

    <div ref="showDepartmentTree" class="ok-department-select-wraper"></div>
  `
})
