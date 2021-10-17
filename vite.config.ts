import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const gateway = 'https://test.baiteda.com/'
const token =
  'sensorsdata2015jssdkcross=%7B%22%24device_id%22%3A%2217bee937f49530-04ca9f6dea3a4b4-a7d173c-3686400-17bee937f4a68d%22%7D; tenant_id=test; local=zh-CN; equipment=7570c3dbf69842d7869b7bf01565befe; egoToken=c881ea3b-85da-4aff-bfa4-7dd7a6354f78; sa_jssdk_2015_test_baiteda_com=%7B%22distinct_id%22%3A%22test_WangYiJie%22%2C%22first_id%22%3A%2217bee937f49530-04ca9f6dea3a4b4-a7d173c-3686400-17bee937f4a68d%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%7D; designertoken=299eecc7-9652-4090-9fde-6575c8348077'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'packages/main.ts'),
      name: 'ok-wc-ui',
      fileName: (format) => `ok-wc-ui.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'ant-design-vue': 'antd'
        }
      }
    }
  },
  plugins: [vue()],
  server: {
    proxy: {
      '/apps/api': {
        target: gateway,
        changeOrigin: true,
        headers: {
          Cookie: token,
        },
      },
      '/ego_base_info': {
        target: gateway,
        changeOrigin: true,
        headers: {
          Cookie: token,
        },
      },
      '/ego_api': {
        changeOrigin: true,
        target: gateway,
        headers: {
          Cookie: token,
        },
      },
    },
  },
})
