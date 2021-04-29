/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-30 16:02:36
 * @LastEditors: 付静
 * @LastEditTime: 2021-04-29 17:01:47
 * @FilePath: /packages/ok-department-select/ok-department-more.ts
 */
import { Popover } from 'ant-design-vue'
import { computed, defineComponent, html, onMounted, PropType } from 'ok-lit'
import { createApp, ref } from 'vue'

import close from '../assets/images/closed.svg'
import { CDN_PATH } from '../path.config'
defineComponent(
  'ok-department-more',
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

          // 手动控制popover 是否展示
          const visible = ref(false)

          const deleteSelected = (id: string) => {
            context.emit('delete', id)
            // 全部删除了的时候， 关闭popover
            let len: any = exceedList.value?.length ?? 0
            if (len === 1) {
              visible.value = false
            }
          }

          return {
            exceedList,
            closeIcon,
            visible,
            deleteSelected,
          }
        },
        template: `
          <a-popover overlayClassName="ok-employee-more" v-model:visible="visible">
            <template #content>
              <div class="more-content">
                <p class="more-item" v-for="item in exceedList" :key="item.department_id">
                  <span class="item-name">{{item.department_name}}</span>
                  <img :src="closeIcon" class="head-close-icon" @click="deleteSelected(item.department_id)" />
                </p>
              </div>
            </template>
            <span class="selected-head-item more">+{{exceedList.length < 99 ? exceedList.length : 99}}</span>
          </a-popover>
        `,
      }
      const app = createApp(options)
      app.use(Popover)
      app.mount(context.$refs.showDeptMore as HTMLElement)
    })

    return () => html`
      <link rel="stylesheet" .href="${CDN_PATH}antd.min.css" />
      <div ref="showDeptMore" class="ok-dept-more"></div>
    `
  }
)
