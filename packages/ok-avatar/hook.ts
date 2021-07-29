/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-03 15:31:09
 * @LastEditors: 付静
 * @LastEditTime: 2021-07-27 20:21:00
 * @FilePath: /packages/ok-avatar/hook.ts
 */
import { computed, effect, ref } from 'ok-lit'

export default function (props) {
  const hasAvatar = ref(false) // 是否有正常图片
  const showName = ref('') // 人员姓名
  const isEn = ref(false) // 是否为英文姓名
  // 人员图像父元素样式
  const avatarWapperAll = ref({
    width: '32px',
    height: '32px',
    display: 'inline-block',
    'vertical-align': 'middle',
    cursor: 'default',
  })
  // 人员图像样式
  const avatarStyleAll = ref({
    color: '#fff',
    width: '32px',
    height: '32px',
  })
  // 人员图像文字样式
  const avatarTextStyle = ref({
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    width: '100%',
    height: '100%',
    color: '#fff',
    'font-size': '12px',
    'font-weight': '500',
  })
  const round = ref(props.round)
  const avatarClass = ref(props.avatarClass)

  const uName = computed(() => {
    let data = props.personInfo?.employee_name || props.personInfo?.name
    if (!data) return
    return typeof data === 'object' ? data[props.i18n] : data
  })

  const count = computed(() => props.count)

  const mask = ' linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),'

  // 获取用户图像
  const getAvatarStyle = () => {
    // 处理header
    // 如果是原型图像，设置基础大小32*32，缩放处理实际大小
    // 注意需设置父元素（avatarWapper）宽高，避免缩放影响其他元素
    let scale = 1
    switch (props.size) {
      case 'mini':
        scale = 0.625
        avatarWapperAll.value.width = '20px'
        avatarWapperAll.value.height = '20px'
        break
      case 'small':
        scale = 0.75
        avatarWapperAll.value.width = '24px'
        avatarWapperAll.value.height = '24px'
        break
      case 'medium':
        scale = 1
        avatarWapperAll.value.width = '32px'
        avatarWapperAll.value.height = '32px'
        break
      case 'large':
        scale = 1.25
        avatarWapperAll.value.width = '40px'
        avatarWapperAll.value.height = '40px'
        break
    }
    props.width && (avatarWapperAll.value.width = props.width)
    props.height && (avatarWapperAll.value.height = props.height)
    avatarWapperAll.value = { ...avatarWapperAll.value, ...props.avatarWapper }

    if (round.value && props.width) {
      scale = Number(props.width.replace('px', '')) / 32
    }

    if (!round.value) {
      // 默认卡片样式，按实际大小，不缩放
      avatarStyleAll.value.width = props.width || '32px'
      avatarStyleAll.value.height = props.height || '32px'
    } else {
      // 圆形，通过缩放设置宽高
      avatarStyleAll.value['transform'] = `scale(${scale})`
      avatarStyleAll.value['transform-origin'] = '0 0'
      avatarStyleAll.value['border-radius'] = '50%'
    }

    avatarStyleAll.value = { ...avatarStyleAll.value, ...props.avatarStyle }

    // 处理avatar
    let url =
      props.personInfo?.avatar ||
      props.personInfo?.avatar_url ||
      props.personInfo?.head_image
    // let url = ''
    if (!url) {
      handleTextAvatar()
      return
    }
    checkImgURL(url).then(
      () => {
        hasAvatar.value = true
        const bg_url = `url(${url}) no-repeat center center / cover`
        avatarStyleAll.value['background'] = count.value
          ? `${mask}${bg_url}`
          : `${bg_url}`

        if (count.value) {
          // 处理文字样式
          avatarTextStyle.value['font-size'] = '12px'
          avatarTextStyle.value = {
            ...avatarTextStyle.value,
            ...props.textStyle,
          }
        }
      },
      () => {
        handleTextAvatar()
      }
    )
  }
  // 处理文字图像
  const handleTextAvatar = () => {
    hasAvatar.value = false
    showName.value = getShowName()
    // 背景色区分男女
    const bg_url =
      props.personInfo?.gender == 2
        ? props.background?.female
        : props.background?.male
    // persongroup中最后一个人员特殊处理
    avatarStyleAll.value['background'] = count.value
      ? `${mask}${bg_url}`
      : `${bg_url}`
    // 处理文字样式
    avatarTextStyle.value['font-size'] = isEn.value ? '16px' : '12px'
    avatarTextStyle.value = { ...avatarTextStyle.value, ...props.textStyle }
  }

  //检测图片是否存在
  const checkImgURL = imgurl => {
    return new Promise((resolve, reject) => {
      var ImgObj = new Image()
      ImgObj.src = imgurl
      ImgObj.onload = () => {
        let result =
          ImgObj['file-size'] > 0 || (ImgObj.width > 0 && ImgObj.height > 0)
        result ? resolve(true) : reject()
      }
      ImgObj.onerror = () => {
        reject()
      }
    })
  }
  // 处理展示名称
  // 匹配emoji
  const emojiReg =
    /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi

  const getShowName = () => {
    let originName = uName.value || ''

    if (!originName) return ''
    // 过滤emoji
    originName = originName.replace(emojiReg, '')
    // 引文展示大写的首字母
    let firstStr = originName.substr(0, 1)
    if (/^[a-zA-Z]/.test(firstStr)) {
      isEn.value = true
      return firstStr.toLocaleUpperCase()
    }
    // 中文取后两个汉字
    isEn.value = false
    return originName.substr(-2)
  }

  effect(() => {
    if (props.personInfo?.employee_name || props.personInfo?.name)
      getAvatarStyle()
  })

  return {
    avatarWapperAll,
    avatarClass,
    round,
    avatarStyleAll,
    hasAvatar,
    avatarTextStyle,
    showName,
    count,
  }
}
