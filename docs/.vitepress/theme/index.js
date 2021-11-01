import { h } from 'vue'
import DefaultTheme from 'vitepress/dist/client/theme-default'
import PersonCell from '../components/person-cell.vue'

export default {
  ...DefaultTheme,
  head: [],
  enhanceApp({ app, router, siteData }) {
    // 任何以“ok-”开头的元素都将被识别为自定义元素
    app.config.isCustomElement = tag => tag.startsWith('ok-')
    app.component('PersonCell', PersonCell)
  },
}
