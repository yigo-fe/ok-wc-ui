<template>
    <div class="ok-agreement-agree-check">
        <a-checkbox @change="onChange" v-model:checked="isChecked">
            我已阅读并同意 
            <template v-for="item in AGREEMENTS">
                《<a :href="item.url" target="_blank">{{ item.name }}</a>》
            </template>
        </a-checkbox>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Checkbox } from 'ant-design-vue'
import { AGREEMENTS } from '../const'
export default defineComponent({
    components: {
        'a-checkbox': Checkbox
    },
    props: {
        
    },
    emits:['change'],
    setup(props, { emit }) {
        const isChecked = ref(false)
        const onChange = () => {
            let result = 'escape'
            if (isChecked.value === true) {
                result = 'agree'
            }
            emit('change', result)
        }
        return {
            onChange,
            AGREEMENTS,
            isChecked,
        }
    },
})
</script>