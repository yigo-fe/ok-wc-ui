/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-07-16 17:01:09
 * @LastEditors: 付静
 * @LastEditTime: 2021-07-16 17:10:09
 * @FilePath: /packages/ok-person-group/ok-avatar-group.ts
 */

import { defineComponent, effect, html, onMounted, PropType } from 'ok-lit'
import { computed, createApp } from 'vue'

import { COMMON_CSS_PATH } from '../path.config'

defineComponent(
  'ok-avatar-group',
  {
    size: {
      // 默认尺寸
      type: String as unknown as PropType<string>,
      default: 'small',
    },
    width: {
      // 自定义宽度
      type: String as unknown as PropType<string>,
      default: '',
    },
    height: {
      // 自定义高度
      type: String as unknown as PropType<string>,
      default: '',
    },
    personList: {
      type: Array as unknown as PropType<any[]>,
      default: () => {
        return []
      },
    },
  },
  (props, contxt) => {
    let app: any = null

    onMounted(() => {
      const options = {
        setup() {
          const size = computed(() => props.size)
          const height = computed(() => props.height)
          const width = computed(() => props.width)

          const count = computed(() => {
            return Array.isArray(props.personList) ? props.personList.length : 0
          })
          const showList = computed(() => {
            return props.personList?.slice(0, 4)
          })

          const avatarStyle = {
            'box-sizing': 'border-box',
            border: '1px solid #fff',
          }

          return {
            showList,
            avatarStyle,
            size,
            height,
            width,
            count,
          }
        },
        template: `
          <ok-avatar
            v-for="(item,index) in showList"
            :key="item.employee_id"
            class="avatar-list"
            style="width: auto; height: auto;"
            :avatarStyle="avatarStyle"
            :personInfo="item"
            :size="size"
            :width="width"
            :height="height"
            :count="index===3 ? count : 0"
          ></ok-avatar>
      `,
      }

      effect(() => {
        if (app) return
        if (props.personList?.length) {
          const app = createApp(options)
          app.mount(contxt.$refs.showAvatarGroup as HTMLElement)
        }
      })
    })

    return () => html`
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <div
        ref="showAvatarGroup"
        class="ok-person-group-wrap"
        style="display: flex; align-items:center; "
      ></div>
    `
  }
)
