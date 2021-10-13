<template>
  <div ref="showDeptMore" class="ok-dept-more">
    <a-popover :overlayStyle="{'z-index': 9998}" overlayClassName="ok-employee-more" v-model:visible="visible">
      <template #content>
        <div class="more-content">
          <p class="more-item" v-for="item in exceedList" :key="item.department_id">
            <span class="item-name">{{item.display_value}}</span>
            <img v-if="!disabled" :src="closeIcon" class="head-close-icon" @click="deleteSelected(item.department_id)" />
          </p>
        </div>
      </template>
      <span class="selected-head-item more" v-if="exceedList">+{{exceedList.length < 99 ? exceedList.length : 99}}</span>
    </a-popover>
  </div>
</template>

<script lang="ts">

import { Popover } from 'ant-design-vue'
import { defineComponent, ref, computed, PropType } from 'vue'

import close from '../assets/images/closed.svg'
import { ANTD_VUE_CDN } from '../path.config'


export default defineComponent({
  props: {
      exceedList: {
        type: Array as unknown as PropType<[]>,
      },
      disabled: {
        type: Boolean as unknown as PropType<boolean>,
      },
      test: {
        type: String,
      },
    },
    components: {
      'a-popover': Popover
    },
    emits: ['delete'],
    setup(props, {emit}) {
      const disabled = computed(() => props.disabled)

      const closeIcon = close

      // 手动控制popover 是否展示
      const visible = ref(false)

      const deleteSelected = (id: string) => {
        emit('delete', id)
        // 全部删除了的时候， 关闭popover
        let len: any = props.exceedList?.length ?? 0
        if (len === 1) {
          visible.value = false
        }
      }

      return {
        disabled,
        closeIcon,
        visible,
        deleteSelected,
      }
    }
  })
</script>
