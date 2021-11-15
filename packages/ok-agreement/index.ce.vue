<template>
    <component :is="type" v-bind="$attrs" @change="onChange"></component>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AgreeCheck from './agree-check/index.vue'
import ConfirmDialog from './confirm-dialog/index.vue'
import ListLinks from './list-links/index.vue'
export default defineComponent({
    components: {
        'agree-check': AgreeCheck,
        'confirm-dialog': ConfirmDialog,
        'list-links': ListLinks
    },
    props: {
        type: String as PropType<'agree-check' | 'confirm-dialog' | 'list-links'>,
    },
    setup(props, {emit}) {
        const onChange = (val: any) => {
            emit('change', val)
        }
        return {
            onChange
        }
    },
})
</script>

<style lang="less">
@import './list-links/index.less';
@import './confirm-dialog/index.less';
</style>