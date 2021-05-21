import { defineComponent, html, onMounted, PropType } from 'ok-lit'

import { Popover } from 'ant-design-vue'

import { CDN_PATH, COMMON_CSS_PATH } from '../path.config'
import { createApp, computed } from 'vue'
defineComponent(
  'ok-person-group-more',
  {
    popperList: {
      type: Array as unknown as PropType<[]>,
    },
    detailSize: {
      type: String as unknown as PropType<string>,
      default: 'mini',
    },
    detailWidth: {
      type: String as unknown as PropType<string>,
    },
    detailHeight: {
      type: String as unknown as PropType<string>,
    },
    contentStyle: {
      type: Object as unknown as PropType<{}>,
    },
    itemStyle: {
      type: Object as unknown as PropType<{}>,
    },
    // 审批组件传入，卡片请求数据方法
    propsGetInfoByEmpId: {
      type: Function,
    },
  },
  (props, contxt) => {
    onMounted(() => {
      const options = {
        setup() {
          const popperList = computed(() => props.popperList)
          const detailSize = computed(() => props.detailSize)
          const detailWidth = computed(() => props.detailWidth)
          const detailHeight = computed(() => props.detailHeight)
          const itemStyle = computed(() => props.itemStyle)
          const contentStyle = computed(() => props.contentStyle)
          const propsGetInfoByEmpId = computed(() => props.propsGetInfoByEmpId)

          return {
            popperList,
            detailSize,
            detailWidth,
            detailHeight,
            itemStyle,
            contentStyle,
            propsGetInfoByEmpId,
          }
        },
        template: `
          <div>
            <a-popover placement="top" overlayClassName="ok-person-group-more">
              <template #content>
                <ul
                    class="ok-person-group-popper popper-wraper"
                    :style="contentStyle"
                  >
                  <li v-for="item in popperList" :key="item.employee_id" :style="itemStyle" class="popper-item">
                    <ok-person-cell
                      class="popper-item-avatar"
                      :personInfo="item"
                      :size="detailSize"
                      :width="detailWidth"
                      :height="detailHeight"
                      :hidePopper=false
                      :propsGetInfoByEmpId="propsGetInfoByEmpId"
                    ></ok-person-cell>
                    <span class="popper-item-name">{{item.employee_name}}</span>
                  </li>
                </ul>
              </template>
              <span class="more">
                ...{{popperList.length}}
              </span>
            </a-popover>
          </div>
      `,
      }
      const app = createApp(options)
      app.use(Popover)

      app.mount(contxt.$refs.showPersonGroupMore as HTMLElement)
    })
    return () => html`
      <link rel="stylesheet" .href="${CDN_PATH}antd.min.css" />
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <span ref="showPersonGroupMore"></span>
    `
  }
)
