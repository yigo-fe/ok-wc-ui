import ASelect from 'ant-design-vue/lib/select'
// import ASelectCSS from 'ant-design-vue/lib/select/style'
import { defineComponent, html, onMounted } from 'ok-lit'
// import { PropType } from 'ok-lit/dist/types/props'
import Vue from 'vue'

defineComponent('ok-ant-person-select', (props, context) => {
  onMounted(() => {
    const app = Vue.createApp({
      setup() {},
      template: `
        <div>999</div>
      `,
    })

    app.use(ASelect)
    app.mount(context.$refs.container as HTMLElement)
  })

  return () => html`
    <style></style>
    <div ref="container" class="ok-ant-person-select"></div>
  `
})
