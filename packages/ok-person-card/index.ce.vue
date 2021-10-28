<template>
  <div class="ok-person-detail">
    <header class="person-image">
      <div class="headCover" />
      <ok-avatar
        width="240px"
        height="170px"
        .round="false"
        .personInfo="personInfoCom"
        .textStyle="textStyle"
        .bigPic="true"
        showMask
      ></ok-avatar>
      <span class="user-name-wraper">
        <span
          class="person-card-name ellipsis2"
          :class="{ isTerminated: statusType === '0' }"
          >{{ personInfoCom["name"][i18n] }}</span
        >
        <img
          v-if="personInfoCom.gender == 2"
          :src="femaleIcon"
          style="width: 16px; height: 16px; margin-top: 3px"
        />
        <img
          v-else
          :src="maleIcon"
          style="width: 16px; height: 16px; margin-top: 3px"
        />
        <div
          v-if="statusType === '0'"
          style="margin-left: auto; font-size: 0; margin-top: 2px"
        >
          <div
            class="terminated-text"
            style="
              margin-left: 12px;
              height: 18px;
              line-height: 18px;
              padding: 0 3px;
            "
          >
            {{ langPack.terminated }}
          </div>
        </div>
      </span>
    </header>

    <footer class="person-detail-footer">
      <div class="content-wraper">
        <div class="item-row">
          <span class="item-label">{{ langPack.team }}：</span>
          <p v-if="!deptText || !deptText.length">--</p>
          <a-tooltip v-else :overlayStyle="{ 'z-index': 9999 }">
            <template #title>
              <ul>
                <li
                  style="font-size: 12px; line-height: 18px"
                  v-for="dept in deptText"
                  :key="dept"
                >
                  {{ dept }}
                </li>
              </ul>
            </template>
            <div class="item-content ellipsis1">{{ deptText.join(" ") }}</div>
          </a-tooltip>
        </div>
        <div class="item-row">
          <span class="item-label">{{ langPack.email }}：</span>
          <p v-if="!personInfoCom.email" class="item-content">--</p>
          <a-tooltip v-else :overlayStyle="{ 'z-index': 9999 }">
            <template #title>
              <span style="font-size: 12px; line-height: 18px">{{
                personInfoCom.email
              }}</span>
            </template>
            <div class="item-content ellipsis1">
              {{ personInfoCom.email || "--" }}
            </div>
          </a-tooltip>
        </div>
      </div>
      <slot name="footer-button">
        <div class="btn-wraper" v-if="showSendBtn">
          <div @click="openApp" class="person-detail-button">
            <img :src="langPack.sendIcon" style="width: 14px; height: 14px" />
            {{ langPack.sendLark }}
          </div>
        </div>
      </slot>
    </footer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import usePersonCardHandle from './hook'
import defineProps from './props'
import femaleIcon from '../assets/images/female.svg'
import maleIcon from '../assets/images/male.svg'
import { Tooltip } from 'ant-design-vue'

export default defineComponent({
    props: defineProps,
    components: {'a-tooltip': Tooltip},
    setup(props) {
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

        // const statusType = ref('0')

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
})
</script>
<style lang="less">
  @import '../assets/styles/common.less';
.ok-person-detail{width:240px;overflow:hidden;font-style:normal;cursor:default;background:#fff;border-radius:14px;-webkit-box-shadow:0 2px 8px rgba(0,0,0,.12);box-shadow:0 2px 8px rgba(0,0,0,.12)}
.ok-person-detail .person-image{position:relative;width:100%;height:170px}
.ok-person-detail .person-image .person-name{position:absolute;bottom:24px;left:16px;font-size:16px;font-weight:600;line-height:24px;color:#fff;word-wrap:break-word;white-space:pre-wrap;max-width:calc(100% - 22px);margin-right:6px}
.ok-person-detail .person-detail-footer{-webkit-box-sizing:border-box;box-sizing:border-box}
.ok-person-detail .person-detail-footer .person-detail-info{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-bottom:12px;font-size:12px}
.ok-person-detail .person-detail-footer .person-detail-info .title{width:28px;margin-right:10px;color:#8f959e}
.ok-person-detail .person-detail-footer .person-detail-info .placeholder{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;overflow:hidden;text-align:left;word-break:break-word;white-space:pre-wrap}
.ok-person-detail .person-detail-footer .person-detail-button{-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;height:32px;font-size:12px;line-height:22px;cursor:pointer;border-radius:4px}
.ok-person-detail .person-detail-footer .person-detail-button img{margin-right:6px}
.ok-person-detail .headCover{position:absolute;top:0;width:100%;height:170px;background:-webkit-gradient(linear,left top, left bottom,from(rgba(0,0,0,.0001)),color-stop(99.42%, rgba(0,0,0,.6)));background:linear-gradient(180deg,rgba(0,0,0,.0001),rgba(0,0,0,.6) 99.42%);opacity:.6}
.ok-person-detail .person-card-name{margin-right:6px;max-width:calc(100% - 22px); line-height: 22px;}
.ok-person-detail .person-card-name.isTerminated{max-width:calc(100% - 90px)}
.ok-person-detail .user-name-wraper{position:absolute;bottom:14px;font-size:16px;font-weight:500;color:#fff;-webkit-transition:bottom .1s ease-in-out;transition:bottom .1s ease-in-out;width:calc(100% - 28px);left:14px;display:flex;}
.ok-person-detail .terminated-text{flex-shrink: 0;font-size:12px;line-height:12px;font-weight:400;padding:3px;border-radius:4px;background-color:rgba(14,14,14,.5);margin-left:auto;vertical-align:middle}
.ok-person-detail .person-detail-button{border-radius:4px;border:none;padding:3px 2px}
.ok-person-detail .content-wraper{padding:14px;height:auto;font-size:12px;line-height:22px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}
.ok-person-detail .item-row{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin:0;line-height:18px}
.ok-person-detail .item-row+.item-row{margin-top:12px}
.ok-person-detail .item-row>.item-label{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin-right:6px;color:#8f959e}
.ok-person-detail .item-row>.item-content{display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}p{margin:0;padding:0}
.ok-person-detail .btn-wraper{padding:0 14px 14px}
</style>
