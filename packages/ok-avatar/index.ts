/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-18 16:01:20
 * @LastEditors: 付静
 * @LastEditTime: 2021-04-16 18:56:13
 * @FilePath: /packages/ok-avatar/index.ts
 */

import { defineComponent, html, onMounted } from 'ok-lit'
import { createApp } from 'vue'

import CDN_PATH from '../path.config'
import useAvatarHandler from './hook'
import props from './props'
defineComponent(
  'ok-avatar',
  {
    ...props,
  },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const params = useAvatarHandler(props)

          return {
            ...params,
          }
        },
        template: `
        <div class="avatar-wapper" :style="avatarWapperAll">
          <div :class="[avatarClass, round && 'round']" class="tagAavtar" :style="avatarStyleAll" >
            <div v-if="!hasAvatar" class="name-text" :style="avatarTextStyle">{{showName}}</div>
          </div>
        </div>
      `,
      }
      // console.log('context.$refs.showUser', Vue)
      const app = createApp(options)

      app.mount(context.$refs.showUser as HTMLElement)
    })

    return () => html`
      <link rel="stylesheet" .href="${CDN_PATH}common.css" />
      <div ref="showUser" class="ok-avatar ok-avatar-root"></div>
    `
  }
)
