/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-18 16:01:20
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-04 15:08:41
 * @FilePath: /packages/ok-user/index.ts
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
      const app = createApp(options)
      app.mount(context.$refs.showUser as HTMLElement)
    })

    return () => html` <div ref="showUser" class="ok-user"></div> `
  }
)
