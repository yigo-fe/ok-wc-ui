/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-04 13:47:46
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-04 13:48:30
 * @FilePath: /packages/ok-user/props.ts
 */
const props = {
  personInfo: {
    // 人员信息
    type: Object,
    default() {
      return {}
    },
  },
  i18n: {
    type: String,
    default: 'zh',
  },
  avatarClass: {
    // 人员图像class
    type: String,
    default: '',
  },
  size: {
    // 默认尺寸
    type: String,
    default: 'small',
  },
  width: {
    // 自定义宽度
    type: String,
    default: '',
  },
  height: {
    // 自定义高度
    type: String,
    default: '',
  },
  round: {
    // 是否为圆形图像，默认圆形
    type: Boolean,
    default: true,
  },
  // 文字图像的背景图：female 女， male 男
  background: {
    type: Object,
    default() {
      return {
        female: 'linear-gradient(180deg, #FD99D5 0%, #E672B7 100%)',
        male: 'linear-gradient(360deg, #387FF5 3.23%, #64A3FF 100%)',
      }
    },
  },
  // 人员图像父元素style
  avatarWapper: {
    type: Object,
    default() {
      return {}
    },
  },
  // 人员图像style
  avatarStyle: {
    type: Object,
    default() {
      return {}
    },
  },
  // 人员文字图像(无图片时，展示人员姓名)style
  textStyle: {
    type: Object,
    default() {
      return {}
    },
  },
}

export default props
