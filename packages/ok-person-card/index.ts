// import { Person } from '@c/ok-wc-ui.d'

import { defineComponent, html, onMounted } from 'ok-lit'
import { createApp, ref } from 'vue'

import femaleIcon from '../assets/images/female.svg'
import maleIcon from '../assets/images/male.svg'
import okPersonCardCss from '../assets/ok-person-card.less'
import usePersonCardHandle from './hook'
/**
 * 人员卡片
 * @props person 人员信息
 * @slot footer-button 按钮位置自定义
 */

defineComponent(
  'ok-person-card',
  {
    // tenantKey表示外部租户账号，若传入有值则默认为外部账号
    personInfo: {
      type: Object,
    },
    // 点击按钮的回调
    larkCallback: {
      type: Function,
    },
    // 国际化，支持zh/en/ja
    i18n: {
      type: String,
      // false
      default: 'zh',
    },
    // 卡片出现位置
    placement: {
      type: String,
      // right
      default: 'right',
    },
    // 发起人邮箱前缀
    caller_email: {
      type: String,
    },
    // 是否将弹窗放置到body层
    transfer: {
      type: Boolean,
      // false
      default: false,
    },
    // 是否启用发送消息卡片功能
    enableChatCard: {
      type: Boolean,
      // false
      default: false,
    },
    // 流程实例id
    processInstanceId: {
      type: String,
      //
      default: '',
    },
    // 是否为线上环境
    chatCardOnProduction: {
      type: Boolean,
      // false
      default: false,
    },
    // 是否为pre环境
    chatCardOnPre: {
      type: Boolean,
      // false
      default: false,
    },
    // 单号
    orderNumber: {
      type: String,
      default: '',
    },
    // 是否禁止内部获取信息
    noFetch: {
      type: Boolean,
      // false
      default: false,
    },
    // 点击查看更多的回调
    seeMoreCallback: {
      type: Function,
      // ()=>{ return true }
      default() {
        return () => {
          return true
        }
      },
    },
    // 是否显示上级信息
    showLeader: {
      type: Boolean,
      default: true,
    },
    // 是否显示查看更多按钮
    showMoreInfo: {
      type: Boolean,
      default: true,
    },
    // 是否显示部门
    showTeam: {
      type: Boolean,
      default: true,
    },
    // 是否启用内部省略模式
    innerEllipsis: {
      type: Boolean,
    },
    hideLark: {
      type: Boolean,
      default: false,
    },
    // 平台类型
    msgRelationType: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default() {
        return {
          employee_name: 'name',
          email: 'email',
          department_name: 'org_name',
          avatar_url: 'avatar',
          employee_id: 'id',
          terminated: 'terminated',
          leaderName: 'leaderName',
          gender: 'gender',
          openId: '',
        }
      },
    },
    avatarSize: {
      type: String,
      default: 'small',
    },
    toOpenId: {
      type: String,
    },
    isAwaken: {
      type: Boolean,
    },
  },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const {
            textStyle,
            openApp,
            showTeam,
            langPack,
            personInfoCom,
            showSendBtn,
          } = usePersonCardHandle(props)

          return {
            personInfoCom,
            textStyle,
            openApp,
            maleIcon,
            femaleIcon,
            showTeam,
            msgRelationType: ref(props.msgRelationType),
            langPack,
            showSendBtn,
            i18n: ref(props.i18n),
          }
        },
        template: `
        <div>
          <header class="person-image">
            <div class="headCover"/>
            <ok-avatar
              :round="false"
              size="popCard"
              :personInfo="personInfoCom"
              width="240px"
              height="170px"
              :textStyle="textStyle"
              showMask
            ></ok-avatar>
            <span class="user-name-wraper">
              <span class="person-card-name">{{personInfoCom['name'][i18n]}}</span>
              <img v-if="personInfoCom.gender ==2" :src="femaleIcon" class="gender-icon" />
              <img v-else :src="maleIcon" class="gender-icon" />
            </span>
          </header>

          <footer class="person-detail-footer">
            <div class="content-wraper">
              <div v-if="!personInfoCom.terminated && showTeam" class="item-row">
                  <span class="item-label">{{langPack.team}}：</span>
                  <p class="item-content">{{ personInfoCom.department_name || '--'}}</p>
              </div>
              <div class="item-row">
                  <span class="item-label">{{langPack.email}}：</span>
                  <p class="item-content">{{ personInfoCom.email || '--'}}</p>
              </div>
            </div>
            <slot name="footer-button">
              <div class="btn-wraper" v-if="showSendBtn">
                <div @click="openApp" class="person-detail-button">
                <img :src='langPack.sendIcon' class="btnIcon" />
                {{langPack.sendLark}}
                </div>
              </div>
            </slot>
          </footer>
        </div>
        `,
      }
      const app = createApp(options)
      app.mount(context.$refs.showPersonCard as HTMLElement)
    })

    return () => html`
      <style>
        ${okPersonCardCss}
      </style>

      <div ref="showPersonCard" class="ok-person-detail"></div>
    `
  }
)
