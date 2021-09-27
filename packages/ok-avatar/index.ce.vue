<template>
    <div class="avatar-wapper" :style="avatarWapperAll">
        <div :class="[avatarClass, round && 'round']" class="tagAavtar" :style="avatarStyleAll" >
        <div v-if="count" class="name-text" :style="avatarTextStyle">{{count>9 ? '9+' : count}}</div>
        <div v-else-if="!hasAvatar" class="name-text" :style="avatarTextStyle">{{showName}}</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import useAvatarHandler from './hook'
import defineProps from './props'
export default defineComponent({
    props: defineProps,
    setup(props) {
        const params = useAvatarHandler(props)
        return {
            ...params,
        }
    },
})
</script>