/* eslint-disable no-unused-vars */
/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-05 19:42:22
 * @LastEditors: 付静
 * @LastEditTime: 2021-08-19 15:50:13
 * @FilePath: /packages/ok-accessory/upload.props.ts
 */

import { PropType } from 'ok-lit'

import ajax from './ajax'
import type { ListType, OkFile } from './upload.type'

type AjaxEventListener = (
  e: ProgressEvent,
  file: OkFile,
  FileList?: []
) => unknown
type Nullable<T> = T | null

interface CallBackParam {
  file: File
  fileLists: Array<any>
}
interface CallBackParamSuccess {
  response: any
  file: File
  fileLists: Array<any>
}
interface CallBackParamError {
  error: any
  file: File
  fileLists: Array<any>
}

const UploadProps = {
  type: {
    type: String as unknown as PropType<string>,
    default: '',
  },
  name: {
    type: String as unknown as PropType<string>,
    default: 'file',
  },

  multiple: {
    type: Boolean as unknown as PropType<boolean>,
    default: false,
  },
  accept: {
    type: String as unknown as PropType<string>,
    default: '',
  },
  disabled: {
    type: Boolean as unknown as PropType<boolean>,
  },
  listType: {
    type: String as unknown as PropType<ListType>,
    default: 'text',
  },
  drag: {
    type: Boolean as unknown as PropType<boolean>,
    default: false,
  },
  limit: {
    type: Number as unknown as PropType<Nullable<number>>,
  },
  fileList: {
    type: Array as unknown as PropType<[]>,
    default: () => [],
  },
  autoUpload: {
    type: Boolean as unknown as PropType<boolean>,
    default: true,
  },
  beforeUpload: {
    type: Function as unknown as PropType<
      (
        file: File,
        postFiles: File[]
      ) => Promise<File | Blob> | boolean | unknown
    >,
  },
  headers: {
    type: Object as unknown as PropType<Headers>,
  },
  withCredentials: {
    type: Boolean as unknown as PropType<boolean>,
    default: false,
  },
  data: {
    type: Object as unknown as PropType<Record<string, any>>,
  },
  action: {
    type: String as unknown as PropType<string>,
  },
  onProgress: {
    type: Function as unknown as PropType<AjaxEventListener>,
  },
  onSuccess: {
    type: Function as unknown as PropType<
      (param: CallBackParamSuccess) => void
    >,
  },
  onError: {
    type: Function as unknown as PropType<(param: CallBackParamError) => void>,
  },
  httpRequest: {
    type: Function as unknown as
      | PropType<typeof ajax>
      | PropType<(...args: unknown[]) => Promise<unknown>>,
    default: ajax,
  },
  onChange: {
    type: Function as unknown as PropType<(param: CallBackParam) => void>,
  },
  beforeRemove: {
    type: Function as unknown as PropType<(param: CallBackParam) => void>,
  },
  onExceed: {
    type: Function as unknown as PropType<(param: CallBackParam) => void>,
  },
  onPreview: {
    type: Function as unknown as PropType<(file: File) => void>,
  },
  onDownload: {
    type: Function as unknown as PropType<(file: File) => void>,
  },
  operation: {
    type: Array as unknown as PropType<string[]>,
    default: () => ['preview', 'download', 'remove'],
  },
  hideUploader: {
    type: Boolean as unknown as PropType<boolean>,
    default: false,
  },
  thumbStyle: {
    type: Object as unknown as PropType<object>,
  },
  subtable: {
    type: Boolean as unknown as PropType<boolean>,
    default: false,
  },
  update: {
    type: Function as unknown as PropType<(param: CallBackParam) => void>,
  },
  // 自定义回显
  customDisplayList: {
    type: Function as unknown as PropType<
      (file_ids: string[]) => Promise<unknown>
    >,
  },
  // 自定义删除
  customRemovePromise: {
    type: Function as unknown as PropType<(file: File) => Promise<unknown>>,
  },
  // 自定义预览
  customPreview: {
    type: Function as unknown as PropType<AjaxEventListener>,
  },
  // 自定义下载
  customDownload: {
    type: Function as unknown as PropType<AjaxEventListener>,
  },
  // 处理上传成功后的数据（字段映射）
  formatUploadData: {
    type: Function as unknown as PropType<(res: any) => void>,
  },
  vertical: {
    type: Boolean as unknown as PropType<boolean>,
  },
}

export { UploadProps }
