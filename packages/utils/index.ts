/**
 * 处理图片,兜底默认值
 * person: {人员信息}
 * definition: 清晰度，默认不开起
 */
import { Person } from '@c/ok-person/person.utils'
import defaultImage from '../assets/defaultAvatar.png'

const handleImage = (person: Person | undefined, definition = false) => {
  if (!person) return defaultImage
  const resultImg = definition ? person.avatar_big : person.avatar
  return resultImg || person.avatar || defaultImage
}

export { handleImage }
