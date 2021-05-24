/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-20 19:58:14
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-24 19:00:42
 * @FilePath: /packages/path.config.ts
 */

const CDN_PATH =
  process.env.NODE_ENV === 'development'
    ? './'
    : 'https://fe-resource.baiteda.com/lib/ok-wc-ui/process.env.PACKAGE_VERSION/dist/'
// 注：process.env.PACKAGE_VERSION 会在build时被替换成package.json中的version

const COMMON_CSS_PATH = `${CDN_PATH}common.css`

export { CDN_PATH, COMMON_CSS_PATH }
