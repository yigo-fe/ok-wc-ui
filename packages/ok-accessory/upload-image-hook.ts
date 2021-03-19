/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-19 01:13:31
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-19 19:20:39
 * @FilePath: /packages/ok-accessory/upload-image-hook.ts
 */
import { watch } from 'vue'

import { sourceHost } from '../services/api'
import { apiInit } from '../services/api'
import useUploadHandler from './upload-base-hook'
export default function (props, context) {
  const api = apiInit()
  // 删除文件
  const remove = async (file, fileLists, idx) => {
    const fileId = file.response?.data[0].file_id
    const result = await api.default.DelAttachmentPrivateV1GET({
      query: { fileId },
    })
    if (result.code === '000000') {
      // 删除显示的上传列表
      fileLists.splice(idx, 1)
      // 处理用户自定义事件
      props.onRemove && props.onRemove(file, fileLists)
    }
  }

  // 获取默认值
  const getDefaultFileList = async (ids: string[]) => {
    const result: any = await api.default.GetImageListAttachmentPublicV1POST({
      query: { fileIdList: ids, sourceHost: sourceHost },
    })
    if (result.code === '000000') {
      // fileLists.value = result.data
      // 处理路径
      displayFileList(result.data)
    }
  }

  const config = {
    action: '/v1/private/attachment/uploadImages',
    remove: remove,
    getDefaultFileList: getDefaultFileList,
  }

  watch(
    () => props.fileList,
    () => {
      const ids = props.fileList
      // todo清除时 fileList为空
      ids.length ? getDefaultFileList(ids) : (fileLists.value = [])
    }
  )

  const {
    showPreview,
    showDownload,
    showRemove,
    fileLists,
    hideUploader,
    displayFileList,
    uploadFiles,
    handlePreview,
    handleDetele,
    handleDownload,
  } = useUploadHandler(props, context, config)

  return {
    showPreview,
    showDownload,
    showRemove,
    fileLists,
    hideUploader,
    displayFileList,
    uploadFiles,
    handlePreview,
    handleDetele,
    handleDownload,
  }
}
