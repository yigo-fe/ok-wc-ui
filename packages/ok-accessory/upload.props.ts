/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-05 19:42:22
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-09 18:33:16
 * @FilePath: /packages/ok-accessory/upload.props.ts
 */

import { PropType } from 'ok-lit'

import ajax from './ajax'
import type { FileHandler, ListType, OkFile, UploadStatus } from './upload.type'

type AjaxEventListener = (
  e: ProgressEvent,
  file: OkFile,
  FileList?: []
) => unknown
type Nullable<T> = T | null
type PFileHandler<T> = PropType<FileHandler<T>>

type UpdateFile = {
  percentage?: number
  status?: UploadStatus
  response?: unknown
  url?: string
  raw?: OkFile
}

const UploadProps = {
  type: {
    type: (String as unknown) as PropType<string>,
    default: '',
  },
  name: {
    type: (String as unknown) as PropType<string>,
    default: 'file',
  },

  multiple: {
    type: (Boolean as unknown) as PropType<boolean>,
    default: false,
  },
  accept: {
    type: (String as unknown) as PropType<string>,
    default: '',
  },

  disabled: {
    type: (Boolean as unknown) as PropType<boolean>,
  },
  listType: {
    type: (String as unknown) as PropType<ListType>,
    default: 'text',
  },
  drag: {
    type: (Boolean as unknown) as PropType<boolean>,
    default: false,
  },
  limit: {
    type: (Number as unknown) as PropType<Nullable<number>>,
    default: '',
  },
  fileList: {
    type: (Array as unknown) as PropType<[]>,
    default: () => [],
  },
  autoUpload: {
    type: (Boolean as unknown) as PropType<boolean>,
    default: true,
  },
  beforeUpload: {
    type: (Function as unknown) as PropType<
      (file: File) => Promise<File | Blob> | boolean | unknown
    >,
  },
  headers: {
    type: (Object as unknown) as PropType<Headers>,
  },
  withCredentials: {
    type: (Boolean as unknown) as PropType<boolean>,
    default: false,
  },
  data: {
    type: (Object as unknown) as PropType<Record<string, any>>,
    default: () => null,
  },
  action: {
    type: (String as unknown) as PropType<string>,
    required: true,
  },
  onProgress: {
    type: (Function as unknown) as PropType<AjaxEventListener>,
  },
  onSuccess: {
    type: (Function as unknown) as PropType<AjaxEventListener>,
  },
  onError: {
    type: (Function as unknown) as PropType<AjaxEventListener>,
  },
  httpRequest: {
    type: (Function as unknown) as
      | PropType<typeof ajax>
      | PropType<(...args: unknown[]) => Promise<unknown>>,
    default: ajax,
  },
  onChange: {
    type: (Function as unknown) as PFileHandler<void>,
  },
  beforeRemove: {
    type: (Function as unknown) as PFileHandler<boolean>,
  },
  onRemove: {
    type: (Function as unknown) as PFileHandler<void>,
  },
  onExceed: {
    type: Function,
  },
  onPreview: {
    type: (Function as unknown) as PropType<(file: File) => void>,
  },
  onDownload: {
    type: (Function as unknown) as PropType<(file: File) => void>,
  },
  iconColor: {
    type: (String as unknown) as PropType<string>,
    default: '#6B66DC',
  },
  btnColor: {
    type: (String as unknown) as PropType<string>,
    default: '#6B66DC',
  },
}

export { UploadProps }
