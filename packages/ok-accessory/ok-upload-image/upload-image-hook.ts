/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-19 01:13:31
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-25 10:38:07
 * @FilePath: /packages/ok-accessory/ok-upload-image/upload-image-hook.ts
 */

import { apiInit, sourceHost } from '../../services/api'
import useUploadHandler from '../upload-base-hook'
export default function (props, context) {
  const api = apiInit()
  // 删除文件
  const remove = async ({ file, fileLists, index }) => {
    const fileId = file.response?.data[0].file_id
    const result = await api.default.DelAttachmentPrivateV1GET({
      query: { fileId },
    })
    if (result.code === '000000') {
      // 删除显示的上传列表
      fileLists.splice(index, 1)
      // 处理用户自定义事件
      props.onRemove && props.onRemove({ file, fileLists })
      // update value
      props.update && props.update({ file, fileLists })
    }
  }

  /**
   * 预览：图片
   * @param data
   */
  const handlePreview = data => {
    let file = fileLists.value.find(v => v.uid === data.detail.uid)
    if (file) {
      const path = file?.response?.data?.[0].file_path
      // const url = path ? `${sourceHost}${path}` : ''

      window.open(path, '_blank')
      // 处理用户自定义事件
      props.onPreview && props.onPreview(file)
    }
  }

  // 获取默认值
  const getDefaultFileList = async (ids: string[]) => {
    return await api.default.GetImageListAttachmentPrivateV1POST({
      file_id_list: ids,
    })

    // const result: any = await api.default.GetImageListAttachmentPrivateV1POST({
    //   file_id_list: ids,
    // })
    // if (result.code === '000000') {
    //   displayFileList(result.data)
    // }
  }

  // test:
  // const a = ['2aa316572e8cc31f8602a442b7e383b8']
  // getDefaultFileList(a)

  const config = {
    action: '/v1/private/attachment/uploadImages',
    remove: remove,
    getDefaultFileList: getDefaultFileList,
  }

  const {
    showPreview,
    showDownload,
    showRemove,
    fileLists,
    hideUploader,
    disabled,
    displayFileList,
    uploadFiles,
    handleDetele,
    handleDownload,
    handleAbort,
  } = useUploadHandler(props, context, config)

  return {
    showPreview,
    showDownload,
    showRemove,
    fileLists,
    hideUploader,
    disabled,
    displayFileList,
    uploadFiles,
    handlePreview,
    handleDetele,
    handleDownload,
    handleAbort,
  }
}
