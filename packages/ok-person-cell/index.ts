import { defineComponent, html, onMounted } from 'ok-lit'

import { apiInitPersoncard } from '../services/api'
import { Popover } from 'ant-design-vue'
// import { personInfo } from '../mock'
/**
 * person: {Person} 用户信息
 * TODO:
 * 头像形状：circle ｜ square
 * 文字头像：背景色自定义
 */
import props from './props'
import { CDN_PATH, COMMON_CSS_PATH } from '../path.config'
import { createApp, computed, ref } from 'vue'
defineComponent(
  'ok-person-cell',
  {
    ...props,
  },
  (props, contxt) => {
    onMounted(() => {
      const options = {
        setup() {
          const api = apiInitPersoncard()
          const toOpenId: any = ref('')
          const isAwaken = ref(false)
          const deptList: any = ref([])
          const statusType: any = ref('')

          const checkLardShow = async (id: string) => {
            let result: any = null
            if (props.propsGetInfoByEmpId) {
              result = await props.propsGetInfoByEmpId(id)
            } else {
              result = await api.default.GetInfoByEmpId({ emp_id: id })
            }

            if (result.code === '000000') {
              const fromOpenId = result.data.from_open_id
              toOpenId.value = result.data.to_open_id
              isAwaken.value = Boolean(fromOpenId && toOpenId.value)
              deptList.value = result.data.dept_resp_vo_list
              statusType.value = result.data.status_type
            }
          }

          const onTrigger = () => {
            if (toOpenId.value) return
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

          console.log(contxt.innerHTML)
          const avatarSlot = ref(contxt.innerHTML)

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
          }
        },
        template: `
          <div>
            <a-popover placement="left" @visibleChange="onTrigger" overlayClassName="ok-person-cell-popover">
              <template #content>
                <ok-person-card
                  :personInfo="personInfo"
                  :toOpenId="toOpenId"
                  :isAwaken="isAwaken"
                  :deptList="deptList"
                  :statusType="statusType"
                ></ok-person-card>
              </template>
              <div v-if="avatarSlot" v-html="avatarSlot"></div>
              <span v-else class="ok-person-cell ok-person-cell-root">
                <ok-avatar
                  :personInfo="personInfo"
                  :size="size"
                  :width="width"
                  :height="height"
                ></ok-avatar>
              </span>

            </a-popover>
          </div>
      `,
      }
      const app = createApp(options)
      app.use(Popover)

      app.mount(contxt.$refs.showPersonCell as HTMLElement)
    })
    return () => html`
      <link rel="stylesheet" .href="${CDN_PATH}antd.min.css" />
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <span ref="showPersonCell"></span>
    `
  }
)
