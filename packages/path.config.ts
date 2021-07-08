/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-20 19:58:14
 * @LastEditors: 付静
 * @LastEditTime: 2021-07-02 16:50:04
 * @FilePath: /packages/path.config.ts
 */

const ANTD_VUE_CDN =
  process.env.NODE_ENV === 'development'
    ? './antd.min.css'
    : `https://fe-resource.baiteda.com/libs/antdv-2.1.6/antd.min.css`

const CDN_PATH =
  process.env.NODE_ENV === 'development'
    ? './'
    : `https://fe-resource.baiteda.com/lib/ok-wc-ui/${process.env.PACKAGE_VERSION}/dist/`
// 注：process.env.PACKAGE_VERSION 会在build时被替换成package.json中的version

const THEME_PATH = window.okuiConfig?.theme
  ? `ok-theme/${window.okuiConfig.theme}`
  : 'common'

const COMMON_CSS_PATH = `${CDN_PATH}${THEME_PATH}.css`

export { ANTD_VUE_CDN, CDN_PATH, COMMON_CSS_PATH }
