/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-12 12:05:40
 * @LastEditors: 付静
 * @LastEditTime: 2021-04-19 20:10:21
 * @FilePath: /packages/ok-employee-select/ok-employee-more.ts
 */
import { Popover } from 'ant-design-vue'
import { computed, defineComponent, html, onMounted, PropType } from 'ok-lit'
import { createApp } from 'vue'

import close from '../assets/images/closed.svg'
import { CDN_PATH } from '../path.config'
defineComponent(
  'ok-employee-more',
  {
    exceedList: {
      type: (Array as unknown) as PropType<[]>,
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

          const closeIcon = close

          const deleteSelected = (employee_id: string) => {
            context.emit('delete', employee_id)
          }

          return {
            exceedList,
            closeIcon,
            deleteSelected,
          }
        },
        template: `
          <a-popover overlayClassName="ok-employee-more">
            <template #content>
              <div class="more-content">
                <p class="more-item" v-for="employee in exceedList" :key="employee.employee_id">
                  <ok-person-cell class="employee-avatar" size="mini" :personInfo="employee"></ok-person-cell>               
                  <span class="employee-name">{{employee.employee_name}}</span>
                  <img :src="closeIcon" class="head-close-icon" @click="deleteSelected(employee.employee_id)" />
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
      <link rel="stylesheet" .href="${CDN_PATH}antd.min.css" />

      <div ref="showEmployeeMore" class="ok-ant-button"></div>
    `
  }
)
