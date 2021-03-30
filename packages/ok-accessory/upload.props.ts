/* eslint-disable no-unused-vars */
/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-05 19:42:22
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-30 10:21:39
 * @FilePath: /packages/ok-accessory/upload.props.ts
 */

import { PropType } from 'ok-lit'

import ajax from './ajax'
import type { FileHandler, ListType, OkFile } from './upload.type'

type AjaxEventListener = (
  e: ProgressEvent,
  file: OkFile,
  FileList?: []
) => unknown
type Nullable<T> = T | null
type PFileHandler<T> = PropType<FileHandler<T>>

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
  },
  action: {
    type: (String as unknown) as PropType<string>,
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
    default: '#5283F7',
  },
  btnColor: {
    type: (String as unknown) as PropType<string>,
    default: '#5283F7',
  },
  operation: {
    type: (Array as unknown) as PropType<string[]>,
    default: () => ['preview', 'download', 'remove'],
  },
  hideUploader: {
    type: (Boolean as unknown) as PropType<boolean>,
    default: false,
  },
  thumbStyle: {
    type: (Object as unknown) as PropType<object>,
  },
  subtable: {
    type: (Boolean as unknown) as PropType<boolean>,
    default: false,
  },
  update: {
    type: (Function as unknown) as PropType<
      // eslint-disable-next-line no-unused-vars
      (ids: string[], lists: []) => void
    >,
  },
}

export { UploadProps }
