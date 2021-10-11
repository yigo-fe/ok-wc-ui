/*
 * @Description: eslint配置
 * @Author: seadon
 * @LastEditors: seadon
 * @Date: 2021-08-23 22:45:04
 * @LastEditTime: 2021-09-09 18:44:05
 */
module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'@vue/prettier',
		'@vue/prettier/@typescript-eslint',
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
	},
}
