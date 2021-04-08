/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-18 16:01:20
 * @LastEditors: 付静
 * @LastEditTime: 2021-04-08 14:45:31
 * @FilePath: /packages/ok-avatar/index.ts
 */

import { defineComponent, html, onMounted } from 'ok-lit'
import { createApp } from 'vue'

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
          const {
            avatarWapperAll,
            avatarClass,
            round,
            avatarStyleAll,
            hasAvatar,
            avatarTextStyle,
            showName,
          } = useAvatarHandler(props)

          return {
            avatarWapperAll,
            avatarClass,
            round,
            avatarStyleAll,
            hasAvatar,
            avatarTextStyle,
            showName,
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
      <style>
        .ok-avatar {
          display: inline-block;
          vertical-align: middle;
          font-size: 0;
        }
      </style>
      <div ref="showUser" class="ok-avatar"></div>
    `
  }
)
