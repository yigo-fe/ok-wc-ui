/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-19 01:13:31
 * @LastEditors: 付静
 * @LastEditTime: 2021-04-09 09:58:58
 * @FilePath: /packages/ok-accessory/ok-upload-drag/upload-attachment-hook.ts
 */

import { message } from 'ant-design-vue'

import { apiInit } from '../../services/api'
import useUploadHandler from '../upload-base-hook'
import { getFileType } from '../utils'
const canPreview = [
  'jpg',
  'jpeg',
  'gif',
  'tif',
  'tiff',
  'bmp',
  'png',
  'svg',
  'pdf',
  'doc',
  'docx',
  'xlsx',
  'xls',
  'ppt',
  'pptx',
]
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

      // 更新value
      props.update && props.update({ file, fileLists })
    }
  }

  /**
   * 预览: 文件
   * @param data
   */
  const handlePreview = data => {
    let file = fileLists.value.find(v => v.uid === data.detail.uid)
    if (!file) return
    // 图片、PDF、word、PPT、excel
    const suffix = getFileType(file.response?.data?.[0]?.file_name)
    if (canPreview.includes(suffix)) {
      window.open(file.response.data[0].online_view_url, '_blank')
    } else {
      message.error('当前文件暂不支持预览')
    }
    // 处理用户自定义事件
    props.onPreview && props.onPreview(file)
  }

  // 获取默认值
  const getDefaultFileList = async (ids: string[]) => {
    return await api.default.GetAttachmentListAttachmentPrivateV1POST({
      file_id_list: ids,
    })
  }
  // test:
  // const a = ['ab22a2cfdc310739fff09a08607f5534']
  // getDefaultFileList(a)

  const config = {
    action: '/v1/private/attachment/uploadAttachments',
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
    handleRemoveFileList,
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
    handleRemoveFileList,
  }
}
