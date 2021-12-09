/*
 * @Description: file content
 * @Author: seadon
 * @LastEditors: seadon
 * @Date: 2021-11-26 14:52:46
 * @LastEditTime: 2021-12-08 17:44:30
 */
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const gateway = 'https://test.baiteda.com/'
const token =
	'sensorsdata2015jssdkcross=%7B%22%24device_id%22%3A%2217c6cdedd6da9-01dbc279c8cbf51-123b6650-1296000-17c6cdedd6e858%22%2C%22distinct_id%22%3A%2217c7c8c6f95437-018d4668920ea9-123b6650-1296000-17c7c8c6f969cf%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%7D; Hm_lvt_6aa3bb5bcd9f8bea50e5944c4a3eb80c=1638167174; cna=NWwvGttPXjECAf////9+1nZC; __wpkreporterwid_=98848758-e104-4df9-bc25-4ef25a81c118; tenant_id=test; local=zh-CN; equipment=27c0a1b50a584b4999174f0372f9baa1; egoToken=3d5c3fdd-4583-4c18-9145-58c904a1d574; designertoken=8e8c3711-c35a-4340-9a1b-b8383a935f31; sa_jssdk_2015_test_baiteda_com=%7B%22distinct_id%22%3A%22test_SongHaoMing%22%2C%22first_id%22%3A%2217c6cdedd6da9-01dbc279c8cbf51-123b6650-1296000-17c6cdedd6e858%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fwww.tapd.cn%2F%22%7D%7D'
// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'packages/main.ts'),
			name: 'ok-wc-ui',
			fileName: format => `ok-wc-ui.${format}.js`,
		},
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
					'ant-design-vue': 'antd',
				},
				assetFileNames: `[name].[ext]`,
			},
		},
	},
	plugins: [
		vue({
			template: {
				compilerOptions: {
					// 将所有包含短横线的标签作为自定义元素处理
					isCustomElement: tag => tag.includes('ok-'),
				},
			},
		}),
	],
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
