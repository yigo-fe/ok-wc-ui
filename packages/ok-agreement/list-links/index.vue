<template>
    <div class="ok-agreement-list-link" :class="[layout]" >
        <div class="link-item" v-for="item in AGREEMENTS">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Checkbox } from 'ant-design-vue'
import { AGREEMENTS } from '../const'
export default defineComponent({
    components: {
        'a-checkbox': Checkbox
    },
    props: {
        layout: {
            type: String as PropType<'horizontal' | 'vertical'>
        }
    },
    setup(props, { emit }) {
        const onChange = (val: any) => {
            emit('change', val)
        }
        return {
            onChange,
            AGREEMENTS
        }
    },
})
</script>