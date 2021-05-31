// import { Person } from '@c/ok-wc-ui.d'

import { Tooltip } from 'ant-design-vue'
import { defineComponent, html, onMounted } from 'ok-lit'
import { createApp, ref } from 'vue'

import femaleIcon from '../assets/images/female.svg'
import maleIcon from '../assets/images/male.svg'
import { COMMON_CSS_PATH } from '../path.config'
import usePersonCardHandle from './hook'
/**
 * 人员卡片
 * @props person 人员信息
 * @slot footer-button 按钮位置自定义
 */
import props from './props'
defineComponent('ok-person-card', { ...props }, (props, context) => {
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
          deptText,
          statusType,
        } = usePersonCardHandle(props)

        return {
          statusType,
          deptText,
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
              width="240px"
              height="170px"
              :round="false"
              :personInfo="JSON.stringify(personInfoCom)"
              :textStyle="JSON.stringify(textStyle)"
              showMask
            ></ok-avatar>
            <span class="user-name-wraper">
              <span class="person-card-name" :class="{'isTerminated': statusType === '0'}">{{personInfoCom['name'][i18n]}}</span>
              <img v-if="personInfoCom.gender ==2" :src="femaleIcon" class="gender-icon" />
              <img v-else :src="maleIcon" class="gender-icon" />
              <div v-if="statusType === '0'" class="terminated-text">{{langPack.terminated}}</div>
            </span>
          </header>

          <footer class="person-detail-footer">
            <div class="content-wraper">
              <div v-if="!personInfoCom.terminated && showTeam" class="item-row">
                  <span class="item-label">{{langPack.team}}：</span>
                  <p v-if="!deptText || !deptText.length"> -- </p>
                  <a-tooltip v-else :overlayStyle="{'z-index': 9999}">
                    <template #title>
                      <ul>
                        <li style='font-size: 12px; line-height:18px;' v-for="dept in deptText" :key="dept"> {{dept}}</li>
                      </ul>
                    </template>
                    <!-- 添加空div 解决Safari自动添加title的问题 -->
                    <div class="item-content"><div></div>{{deptText.join(' ')}}</div>
                  </a-tooltip>
              </div>
              <div class="item-row">
                  <span class="item-label">{{langPack.email}}：</span>
                  <p v-if="!personInfoCom.email" class="item-content"> -- </p>
                  <a-tooltip v-else :overlayStyle="{'z-index': 9999}">
                    <template #title>
                      <span style='font-size: 12px; line-height:18px;'>{{personInfoCom.email}}</span>
                    </template>
                    <!-- 添加空div 解决Safari自动添加title的问题 -->
                    <div class="item-content"><div></div>{{ personInfoCom.email || '--'}}</div>
                  </a-tooltip>
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
    app.use(Tooltip)
    app.mount(context.$refs.showPersonCard as HTMLElement)
  })

  return () =>
    html`<link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <div ref="showPersonCard" class="ok-person-detail"></div> `
})
