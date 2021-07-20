/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-06-30 10:33:52
 * @LastEditors: 付静
 * @LastEditTime: 2021-07-20 11:01:19
 * @FilePath: /packages/ok-person-cell/popover-ant.ts
 */
import { Popover } from 'ant-design-vue'
import { defineComponent, effect, html, onMounted } from 'ok-lit'
import { computed, createApp, ref } from 'vue'

import { ANTD_VUE_CDN, COMMON_CSS_PATH } from '../path.config'
import { apiInitPersoncard } from '../services/api'
// import { personInfo } from '../mock'
/**
 * person: {Person} 用户信息
 * TODO:
 * 头像形状：circle ｜ square
 * 文字头像：背景色自定义
 */
import props from './props'
defineComponent(
  'ok-person-ant',
  {
    ...props,
  },
  (props, contxt) => {
    let isInit = false
    let isSlot = false
    onMounted(() => {
      const options = {
        setup() {
          const api = apiInitPersoncard()
          const toOpenId: any = ref('')
          const isSelf = ref(false)
          const isAwaken = ref(false)
          const deptList: any = ref([])
          const statusType: any = ref('')
          const contentSlot = ref('')
          const cardDisplay = ref(false)

          const checkLardShow = async (id: string) => {
            let result: any = null
            if (props.propsGetInfoByEmpId) {
              result = await props.propsGetInfoByEmpId(id)
            } else {
              result = await api.default.GetInfoByEmpId({ emp_id: id })
            }

            if (result.code === '000000') {
              // 记录打开的是否为自己的卡片。判断依据：没有to_open_id字段则为自己
              isSelf.value =
                Object.keys(result.data).indexOf('to_open_id') === -1
              const fromOpenId = result.data.from_open_id
              toOpenId.value = result.data.to_open_id
              isAwaken.value = Boolean(fromOpenId && toOpenId.value)
              deptList.value = result.data.dept_resp_vo_list
              statusType.value = result.data.status_type
            }
            cardDisplay.value = true
          }

          const onTrigger = (visible: boolean) => {
            if (!visible || toOpenId.value || isSelf.value) return
            const personInfo: any = props.personInfo
            const id =
              personInfo.employee_id ||
              personInfo.user_id ||
              personInfo.id ||
              personInfo.employee_number
            id && checkLardShow(id)
          }

          const personInfo = computed(() => props.personInfo)
          const size = computed(() => props.size)
          const width = computed(() => props.width)
          const height = computed(() => props.height)
          const avatarStyle = computed(() => props.avatarStyle)

          const avatarSlot = computed(() => {
            const contentSlot: any = contxt.$refs.contentSlot
            return contentSlot?.innerHTML
          })

          const isAvatarSolt = computed(() => {
            return isSlot
          })

          // 企业微信调试使用
          const devtoolsLog = computed(() => {
            return JSON.stringify({
              contextinnerText: contxt.innerText,
              isAvatarSolt: isAvatarSolt.value,
              avatarSlot: avatarSlot.value,
            })
          })

          return {
            personInfo,
            size,
            width,
            height,
            toOpenId,
            isAwaken,
            deptList,
            statusType,
            onTrigger,
            avatarSlot,
            contentSlot,
            isAvatarSolt,
            devtoolsLog,
            cardDisplay,
            avatarStyle,
          }
        },
        template: `
          <div>
            <a-popover placement="left" @visibleChange="onTrigger" :overlayStyle="{'z-index': 9999}"  overlayClassName="ok-person-cell-popover">
              <template #content>
                <ok-person-card
                  v-if="cardDisplay"                 
                  :personInfo="personInfo"
                  :toOpenId="toOpenId"
                  :isAwaken="isAwaken"
                  :deptList="deptList"
                  :statusType="statusType"
                ></ok-person-card>        
              </template>
              <span class="ok-person-cell ok-person-cell-root">
                <p style="display: none" class="dev-log">{{devtoolsLog}}</p>
                <div v-show="isAvatarSolt" v-html="avatarSlot" class="slot-content"></div>
                <ok-avatar
                  v-if="!isAvatarSolt"
                  :personInfo="personInfo"
                  :size="size"
                  :width="width"
                  :height="height"
                  :avatarStyle="avatarStyle"
                ></ok-avatar>
              </span>
            </a-popover>
          </div>
      `,
      }
      effect(() => {
        if (!isInit && props.personInfo) {
          //@ts-ignore
          const slots = contxt.shadowRoot.querySelectorAll('slot') || []
          if (slots.length && slots[0].assignedNodes().length) {
            isSlot = true
          }
          const app = createApp(options)
          app.use(Popover)
          app.mount(contxt.$refs.showPersonCell as HTMLElement)
          isInit = true
        }
      })
    })
    return () => html`
      <link rel="stylesheet" .href="${ANTD_VUE_CDN}" />
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <span ref="showPersonCell"></span>
      <span ref="contentSlot"><slot></slot></span>
    `
  }
)
