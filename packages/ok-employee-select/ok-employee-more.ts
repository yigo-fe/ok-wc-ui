/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-12 12:05:40
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-31 15:52:24
 * @FilePath: /packages/ok-employee-select/ok-employee-more.ts
 */
import { Popover } from 'ant-design-vue'
import { computed, defineComponent, html, onMounted, PropType } from 'ok-lit'
import { createApp, ref } from 'vue'

import close from '../assets/images/closed.svg'
import { ANTD_VUE_CDN } from '../path.config'
defineComponent(
  'ok-employee-more',
  {
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
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const exceedList = computed(() => props.exceedList)
          const disabled = computed(() => props.disabled)

          const closeIcon = close

          // 手动控制popover 是否展示
          const visible = ref(false)

          const deleteSelected = (employee_id: string) => {
            context.emit('delete', employee_id)
            // 全部删除了的时候， 关闭popover
            let len: any = exceedList.value?.length ?? 0
            if (len === 1) {
              visible.value = false
            }
          }

          return {
            exceedList,
            disabled,
            closeIcon,
            visible,
            deleteSelected,
          }
        },
        template: `
          <a-popover overlayClassName="ok-employee-more" v-model:visible="visible">
            <template #content>
              <div class="more-content">
                <p class="more-item" v-for="employee in exceedList" :key="employee.employee_id">
                  <ok-person-cell class="employee-avatar" size="mini" :personInfo="employee"></ok-person-cell>               
                  <span class="employee-name ellipsis1">{{employee.employee_name}}</span>
                  <img v-if="!disabled" :src="closeIcon" class="head-close-icon" @click="deleteSelected(employee.employee_id)" />
                </p>
              </div>
            </template>
            <span class="selected-head-item more">+{{exceedList.length < 99 ? exceedList.length : 99}}</span>
          </a-popover>
        `,
      }
      const app = createApp(options)
      app.use(Popover)
      app.mount(context.$refs.showEmployeeMore as HTMLElement)
    })

    return () => html`
      <link rel="stylesheet" .href="${ANTD_VUE_CDN}" />

      <div ref="showEmployeeMore" class="ok-ant-button"></div>
    `
  }
)
