<template>
    <div class="ok-agreement-agree-check">
        <a-checkbox @change="onChange">
            我已阅读并同意 
            <template v-for="item in AGREEMENTS">
                《<a :href="item.url">{{ item.name }}</a>》
            </template>
        </a-checkbox>
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
        
    },
    setup(props, { emit }) {
        const onChange = (val: any) => {
            emit('change', val)
        }
        return {
            onChange,
            AGREEMENTS,
        }
    },
})
</script>