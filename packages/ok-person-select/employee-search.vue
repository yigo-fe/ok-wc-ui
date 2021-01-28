<template>
  <div class="employee-search" :class="{ 'hide-tag': !showTag }">
    <a-select
      v-model:value="valueRef"
      v-bind="$attrs"
      mode="multiple"
      style="width: 100%"
      :filter-option="false"
      :default-active-first-option="false"
      :dropdown-class-name="`employee-search-dropdown ${dropdownClassName}`"
      :placeholder="placeholder"
      :not-found-content="isOpen ? undefined : null"
      @focus="handleFocus"
      @search="onFetch"
      @change="handleChange"
      @deselect="handleDeselect"
      @dropdown-visible-change="onDropdownOff"
    >
      <template #notFoundContent>
        <span v-if="loading">加载中</span>
        <span v-else>暂无数据</span>
      </template>
      <a-select-option
        v-for="d in options"
        :key="d[tagValue]"
        :value="d[tagValue]"
        :label="d[tagLabel]"
      >
        <slot :item="d">
          <div class="result-list-item">
            <person-cell class="user-img__avatar" :person="d"></person-cell>
            <div class="user-img__content">
              <p>
                <span class="user-img__name">{{ d.name }}</span>
                <span class="user-img__email">{{ d.email }}</span>
              </p>
              <p class="user-img__d">{{ d.orgName }}</p>
            </div>
          </div>
        </slot>
      </a-select-option>
    </a-select>
  </div>
</template>

<script lang="ts">
/*
	v-model
		value									Array([])													双向绑定的已选中的值, 字符串数组
	props
		tagLabel							String('label')										已选择的显示值的key
		tagValue							String('value')										已选择的后端值的key
		multiple    					Boolean(false) 										是否多选,及最大长度是否为1, 注: antdv中的multiple属性一直为true
		showTag								Boolean(true)											是否显示tag
		rangeList   					Array([])													指定范围列表,为人员id组成的数组,有值时搜索功能为本地搜索,不掉接口
		rangeSearchKeys				Array([])													指定范围时为本地搜索, 此数组为本地搜索的匹配字段,没传则匹配所有字段
		maxLimit							Number(99999)											可多选的最大数量
		placeholder						String('请输入姓名, 邮箱前缀')				placeholder
		dropdownClassName			String('')												下拉弹层className
		fixedList							Array([])													固定数据, 其选项不可删除
		其他属性继承 a-select
	event
		change(value)
			value								Array([])						已选中的值,字符串数组,同v-model
*/
import { defineComponent, ref, watch, computed, nextTick } from 'vue'
import { debounce, cloneDeep, isEqual } from 'lodash'
import { message } from 'ant-design-vue'
import PersonCell from './person-cell.vue'

export default defineComponent({
  name: 'employee-search',
  components: {
    PersonCell,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    tagLabel: {
      type: String,
      default: 'name',
    },
    tagValue: {
      type: String,
      default: 'number',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    showTag: {
      type: Boolean,
      default: true,
    },
    rangeList: {
      type: Array,
      default: () => [],
    },
    rangeSearchKeys: {
      type: Array,
      default: () => [],
    },
    maxLimit: {
      type: Number,
      default: 99999,
    },
    placeholder: {
      type: String,
      default: '请输入姓名, 邮箱前缀',
    },
    dropdownClassName: {
      type: String,
      default: '',
    },
    fixedList: {
      type: Array,
      default: () => [],
    },
    getUser: {
      type: Function,
      required: true,
    },
    getUserList: {
      type: Function,
      required: true,
    },
  },
  emits: ['change', 'update:value'],
  setup(props, context) {
    // 是否指定范围
    const isRange = computed(() => props.rangeList.length > 0)
    // 渲染用 viweRangeList 数据, <userinfo>[]
    const viweRangeList = ref([])
    // 指定范围是否改过, 改过的话, focus需要重新请求数据
    const isChangedRange = ref(true)
    watch(
      () => props.rangeList,
      () => {
        isChangedRange.value = true
        options.value = []
        loading.value = true
      }
    )
    const handleFocus = () => {
      if (isRange.value && isChangedRange.value) {
        isOpen.value = true
        props
          .getUserList(props.rangeList as string[])
          .then((res: any) => {
            options.value = res
            viweRangeList.value = res
            isChangedRange.value = false
          })
          .finally(() => {
            loading.value = false
          })
      }
    }

    // 是否显示下拉框,PS: open属性无效
    let isOpen = ref(false)
    let loading = ref(false)
    // 监听 defaultValue, 并实时更新 label
    watch(
      () => props.value,
      (newValue: any, oldValue: any) => {
        if (isEqual(newValue, valueRef.value)) {
          return
        }
        valueRef.value = newValue
        // 减少请求, 删除用filter
        if (newValue.length >= oldValue.length) {
          props
            .getUserList(valueRef.value as string[])
            .then(async (res: any) => {
              options.value = res
            })
        } else {
          options.value = options.value.filter((v: any) => {
            return newValue.includes(v.number)
          })
        }
      }
    )
    // 初始化赋给valueRef,并同步更新至父级
    let valueRef = ref(cloneDeep(props.value))
    // 删除时使用, 获取之前的值,从而拿到删除的index
    let oldValueRef = ref(cloneDeep(props.value))
    watch(valueRef, async (newValue: any) => {
      oldValueRef.value = newValue
      context.emit('change', newValue)
      context.emit('update:value', newValue)
    })

    /* 下拉框数据初始化
			指定范围 && 有默认值 	-- 取指定范围列表
			指定范围 && 无默认值 	-- 取指定范围列表
			全员范围 && 有默认值 	-- 请求接口回显label姓名
			全员范围 && 无默认值 	-- 赋值[]
		*/
    let options = ref()
    const initData = () => {
      if (isRange.value) {
        props.getUserList(props.rangeList as string[]).then((res: any) => {
          options.value = res
          viweRangeList.value = res
          isChangedRange.value = false
        })
        // 检查默认值是否在指定范围内, 先不做~~~
        // checkValue()
      } else {
        if (valueRef.value.length) {
          props
            .getUserList(valueRef.value as string[])
            .then(async (res: any) => {
              options.value = res
              // 这一步是为了不让远程搜索时输入框聚焦时有下拉框
              await nextTick()
              options.value = []
            })
        } else {
          options.value = []
        }
      }
    }
    initData()

    // 指定范围时 - 前端本地搜索   否则为远程搜索
    const onFetch = debounce((val: string) => {
      options.value = []
      isOpen.value = true
      loading.value = true
      if (val === '') {
        isOpen.value = false
        return
      }
      if (isRange.value) {
        // 本地搜索
        const searchKeys = props.rangeSearchKeys
        options.value = viweRangeList.value.filter((v: any) => {
          // 有指定搜索字段
          if (searchKeys.length) {
            for (let i = 0; i < searchKeys.length; i++) {
              if (String(v[searchKeys[i] as string]).indexOf(val) > -1) {
                return true
              }
            }
            return false
          } else {
            const values = Object.values(v)
            for (let i = 0; i < values.length; i++) {
              if (String(values[i]).indexOf(val) > -1) {
                return true
              }
            }
            return false
          }
        })
        loading.value = false
      } else {
        // 远程搜索
        props
          .getUser(val)
          .then((res: any) => {
            options.value = res
          })
          .finally(() => {
            loading.value = false
          })
      }
    }, 800)

    const onDropdownOff = (open: boolean) => {
      if (!open) {
        if (isRange.value) {
          options.value = cloneDeep(viweRangeList.value)
        } else {
          options.value = []
          isOpen.value = false
        }
      }
    }

    const handleDeselect = (val: string) => {
      // 处理不可删除逻辑
      if (props.fixedList.length > 0 && props.fixedList.includes(val)) {
        const index = oldValueRef.value.indexOf(val)
        valueRef.value.splice(index, 0, val)
        message.warning('此用户不可删除')
      }
    }
    const handleChange = async (val: string[]) => {
      // 可选长度限制
      const maxLimit = props.multiple ? props.maxLimit : 1
      valueRef.value = val.slice(-maxLimit)
      // 等渲染完再清空data, 要不然tag显示为id
      await nextTick()
      // 单选下选择完关闭下拉框
      if (!props.multiple) {
        if (!isRange.value) {
          options.value = []
        }
        isOpen.value = false
      }
    }

    return {
      isOpen,
      isRange,
      valueRef,
      loading,
      options,
      onFetch,
      onDropdownOff,
      handleChange,
      handleFocus,
      handleDeselect,
    }
  },
})
</script>

<style lang="less">
.employee-search {
  line-height: 32px;
  &.hide-tag {
    .ant-select-selection-item {
      display: none;
    }
  }
  .ant-select-selector {
    .ant-select-selection-item {
      padding: 0 4px 0;
    }
    .result-list-item {
      display: flex;
      padding-top: 1px;
      > .user-img__avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      .user-img__name {
        margin-left: 4px;
        color: #646a73;
      }
      .user-img__d,
      .user-img__email {
        display: none;
      }
    }
  }
}
.ant-select-dropdown.employee-search-dropdown {
  .ant-select-item-option-state {
    line-height: 44px;
  }
  .ant-select-item-empty {
    text-align: center;
  }
  .result-list-item {
    display: flex;
    .user-img__avatar {
      flex-shrink: 0;
      display: inline-block;
      width: 44px;
      height: 44px;
      border-radius: 50%;
    }
    .user-img__content {
      flex: 1;
      padding: 0 10px 0;
      font-size: 12px;
      color: #333;
      overflow: hidden;
      > p {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        line-height: 22px;
      }
      .user-img__email {
        margin-left: 10px;
      }
    }
  }
}
</style>
