<template>
    <div><ok-person-tippy
          .personInfo="personInfo"
          .i18n="i18n"
          .avatarClass="avatarClass"
          .size="size"
          .width="width"
          .height="height"
          .round="round"
          .background="background"
          .avatarWapper="avatarWapper"
          .avatarStyle="avatarStyle"
          .textStyle="textStyle"
          .hidePopper="hidePopper"
          .propsGetInfoByEmpId="propsGetInfoByEmpId"
          style="line-height: 1"
          ><slot>
            <ok-avatar
              .personInfo="personInfo"
              .size="size"
              .width="width"
              .height="height"
              .avatarStyle="avatarStyle"
            ></ok-avatar></slot
        ></ok-person-tippy>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { isWindowsWxchat } from '../ok-person-card/broswer'
import okAvatar from '../ok-avatar/index.ce.vue'
// import okPersonAnt from './popover-ant'

import defineProps from './props'
export default defineComponent({
    props: defineProps,
    components: {
        "ok-avatar": okAvatar,
    },
    setup(props) {
        const showAntPopover = isWindowsWxchat()
        return {
            showAntPopover
        }
    }
})
</script>
