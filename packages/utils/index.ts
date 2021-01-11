/**
 * 处理图片,兜底默认值
 */
import defaultImage from '../assets/defaultAvatar.png'
const handleImage = (imageSrc?: string) => {
  // console.log(imageSrc, defaultImage)
  return imageSrc ? imageSrc : defaultImage
}

export { handleImage }
