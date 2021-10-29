import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const gateway = 'https://test.baiteda.com/'
const token =
  'sensorsdata2015jssdkcross=%7B%22%24device_id%22%3A%2217bee937f49530-04ca9f6dea3a4b4-a7d173c-3686400-17bee937f4a68d%22%7D; adminToken=aad2fe95-71dc-4615-89ce-706cb580f28d; designertoken=26782e90-b7aa-4aa8-b88c-a976609d83e3; tenant_id=test; egoToken=6d990752-d20c-42a6-8b62-6ea4162b542d; local=zh-CN; sa_jssdk_2015_test_baiteda_com=%7B%22distinct_id%22%3A%22test_WangYiJie%22%2C%22first_id%22%3A%2217bee937f49530-04ca9f6dea3a4b4-a7d173c-3686400-17bee937f4a68d%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22http%3A%2F%2Flocalhost%3A8081%2F%22%7D%7D; equipment=b4f51a971e9043399bbe50c989522115'

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
        },
        assetFileNames: `[name].[ext]`
      }
    }
  },
  plugins: [vue({
    template: {
      compilerOptions: {
        // 将所有包含短横线的标签作为自定义元素处理
        isCustomElement: tag => tag.includes('ok-')
      }
    }
  })],
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
