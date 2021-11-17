<template>
    <div><ok-person-tippy
          .personInfo="innerPersonInfo"
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
              .personInfo="innerPersonInfo"
              .size="size"
              .width="width"
              .height="height"
              .avatarStyle="avatarStyle"
            ></ok-avatar></slot
        ></ok-person-tippy>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { isWindowsWxchat } from '../ok-person-card/broswer'
// import okPersonAnt from './popover-ant'

import defineProps from './props'
export default defineComponent({
    props: defineProps,
    components: {
    },
    setup(props) {
        const showAntPopover = isWindowsWxchat()
        const innerPersonInfo = computed(() => {
            if (typeof(props.personInfo) === 'string') {
                let info = {}
                try {
                    info = JSON.parse(props.personInfo)
                    return info
                } catch (e) {
                    return {}
                }
            } else {
                return props.personInfo
            }
        })
        // console.log('personInfo:', props.personInfo)
        return {
            showAntPopover,
            innerPersonInfo
        }
    }
})
</script>
