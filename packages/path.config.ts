/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-20 19:58:14
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-31 17:41:13
 * @FilePath: /packages/path.config.ts
 */

const ANTD_VUE_CDN =
  process.env.NODE_ENV === 'development'
    ? './antd.min.css'
    : `https://ego-fe.oss-cn-beijing.aliyuncs.com/lib/ok-wc-ui/antd.min.css`

const CDN_PATH =
  process.env.NODE_ENV === 'development'
    ? './'
    : `https://fe-resource.baiteda.com/lib/ok-wc-ui/${process.env.PACKAGE_VERSION}/dist/`
// 注：process.env.PACKAGE_VERSION 会在build时被替换成package.json中的version

const THEME_PATH = window.okuiConfig?.theme
  ? `${window.okuiConfig.theme}`
  : 'common'

const COMMON_CSS_PATH = `${CDN_PATH}${THEME_PATH}.css`

export { ANTD_VUE_CDN, CDN_PATH, COMMON_CSS_PATH }
