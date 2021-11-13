<template>
    <div>
        <div class="ok-agreement-confirm-dialog-mask"></div>
        <div class="ok-agreement-confirm-dialog">
            <div class="header">
                <img :src="logo" alt="logo">
            </div>
            <div class="body">
                <slot name="body">
                    {{companyName}}非常注重您的隐私保护，为切实保障您的隐私权，优化您的体验，{{companyName}}根据现行法规及政策，制定本《隐私条款》，本条款旨在详细阐述{{companyName}}将如何处理您的个人信息和隐私信息，并申明了{{companyName}}对保护隐私的承诺，了解这些内容，对于您行使个人权利及保护您的个人信息至关重要，{{companyName}}也将按照业界成熟的安全标准，采取相应的安全保护措施来保障您的个人信息。请您在使用{{companyName}}产品或服务前务必认真阅读、了解并同意本条款
                </slot>
            </div>
            <div class="footer">
                <div class="getout button">不同意并退出</div>
                <div class="agree button">同意</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
    props: {
        device: {
            type: String as PropType<'desktop' | 'mobile'>,
        },
        width: {
            type: String as PropType<string>,
        },
        height: {
            type: String as PropType<string>,
        },
        logo: {
            type: String as PropType<string>,
        },
        companyName: {
            type: String as PropType<string>,
            default: '百特搭',
        },
    },
    setup(props) {
        
    },
})
</script>