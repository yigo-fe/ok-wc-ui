/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-20 19:58:14
 * @LastEditors: 付静
 * @LastEditTime: 2021-02-25 10:44:18
 * @FilePath: /packages/path.config.ts
 */
const CDN_PATH =
  process.env.NODE_ENV === 'development'
    ? './'
    : 'https://ego-fe.oss-cn-beijing.aliyuncs.com/lib/ok-wc-ui/'

export default CDN_PATH
