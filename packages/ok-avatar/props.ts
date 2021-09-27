/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-04 13:47:46
 * @LastEditors: 付静
 * @LastEditTime: 2021-08-19 15:00:43
 * @FilePath: /packages/ok-avatar/props.ts
 */
import { PropType } from 'vue'

const props = {
  personInfo: {
    // 人员信息
    type: Object as PropType<{
      employee_name: string,
      name: string,
      avatar: string,
      avatar_url: string,
      head_image: string,
      avatar_small: string,
      gender: number
    }>,
    default() {
      return {}
    },
  },
  i18n: {
    type: String as PropType<string>,
    default: 'zh',
  },
  avatarClass: {
    // 人员图像class
    type: String as PropType<string>,
    default: '',
  },
  size: {
    // 默认尺寸
    type: String as PropType<string>,
    default: 'small',
  },
  width: {
    // 自定义宽度
    type: String as PropType<string>,
    default: '',
  },
  height: {
    // 自定义高度
    type: String as PropType<string>,
    default: '',
  },
  round: {
    // 是否为圆形图像，默认圆形
    type: Boolean as PropType<boolean>,
    default: true,
  },
  // 文字图像的背景图：female 女， male 男
  background: {
    type: Object as PropType<{female: string, male: string}>,
    default() {
      return {
        female: 'linear-gradient(180deg, #FD99D5 0%, #E672B7 100%)',
        male: 'linear-gradient(360deg, #387FF5 3.23%, #64A3FF 100%)',
      }
    },
  },
  // 人员图像父元素style
  avatarWapper: {
    type: Object as PropType<object>,
    default() {
      return {}
    },
  },
  // 人员图像style
  avatarStyle: {
    type: Object as PropType<object>,
    default() {
      return {}
    },
  },
  // 人员文字图像(无图片时，展示人员姓名)style
  textStyle: {
    type: Object as PropType<object>,
    default() {
      return {}
    },
  },
  count: {
    type: Number as PropType<number | string>,
  },
  bigPic: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}

export default props
