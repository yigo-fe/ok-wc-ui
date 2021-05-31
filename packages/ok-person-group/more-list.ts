import { Popover } from 'ant-design-vue'
import { defineComponent, html, onMounted, PropType } from 'ok-lit'
import { computed, createApp } from 'vue'

import close from '../assets/images/closed.svg'
import { ANTD_VUE_CDN, COMMON_CSS_PATH } from '../path.config'
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
    showDelete: {
      type: Boolean as unknown as PropType<boolean>,
      default: false,
    },
    placement: {
      type: String as unknown as PropType<string>,
      default: 'top',
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
          const showDelete = computed(() => props.showDelete)
          const placement = computed(() => props.placement)
          const propsGetInfoByEmpId = computed(() => props.propsGetInfoByEmpId)
          const closeIcon = close

          const deleteItem = (item: any) => {
            contxt.emit('delete-item', item)
          }

          return {
            popperList,
            detailSize,
            detailWidth,
            detailHeight,
            itemStyle,
            contentStyle,
            propsGetInfoByEmpId,
            closeIcon,
            showDelete,
            placement,
            deleteItem,
          }
        },
        template: `
          <div>
            <a-popover :placement="placement" overlayClassName="ok-person-group-more">
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
                    <span class="popper-item-name ellipsis1">{{item.employee_name}}</span>
                    <img v-if="showDelete" :src="closeIcon" class="person-item-close-icon" @click="deleteItem(item)" />
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
      <link rel="stylesheet" .href="${ANTD_VUE_CDN}" />
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <span ref="showPersonGroupMore"></span>
    `
  }
)
