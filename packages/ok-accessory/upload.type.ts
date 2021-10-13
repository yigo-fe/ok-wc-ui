/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-25 15:50:31
 * @LastEditors: 付静
 * @LastEditTime: 2021-01-27 15:33:48
 * @FilePath: /packages/ok-accessory/upload.type.ts
 */
export type ListType = 'text' | 'picture' | 'picture-card'

export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'

export type UploadFile = {
  name: string
  percentage?: number
  status: UploadStatus
  size: number
  response?: unknown
  uid: number
  url?: string
  raw: OkFile
}

export interface OkFile extends File {
  uid: number
}

export interface OkUploadProgressEvent extends ProgressEvent {
  percent: number
}

export interface OkUploadAjaxError extends Error {
  status: number
  method: string
  url: string
}

export interface OkUploadRequestOptions {
  action: string
  data: Record<string, string | Blob>
  filename: string
  file: File
  headers: Headers
  onError: (e: Error) => void
  onProgress: (e: ProgressEvent) => void
  onSuccess: (response: XMLHttpRequestResponseType) => unknown
  withCredentials: boolean
}

export type FileHandler<T = void> = (
  file: UploadFile,
  uploadFiles: UploadFile[]
) => T
export type FileResultHandler<T = any> = (
  param: T,
  file: UploadFile,
  uploadFiles: UploadFile[]
) => void

export interface IUseHandlersProps {
  listType: ListType
  fileList: UploadFile[]
  beforeUpload?: FileHandler
  beforeRemove?: FileHandler<Promise<any> | boolean>
  onRemove?: FileHandler
  onChange?: FileHandler
  onPreview?: () => void
  onSuccess?: FileResultHandler
  onProgress?: FileResultHandler<ProgressEvent>
  onError?: FileResultHandler<Error>
}

export interface OkUpload extends IUseHandlersProps {
  accept: string
  headers?: Headers
  data?: Record<string, unknown>
  multiple?: boolean
  name?: string
  drag?: boolean
  withCredentials?: boolean
  showFileList?: boolean
  type?: string
  dragOver: boolean
  genUid: () => number
  tempIndex: number
  handleError: () => void
  handleProgress: () => void
  handleRemove: () => void
  handleStart: () => void
  handleSuccess: () => void
  uploadDisabled: boolean
  uploadFiles: UploadFile[]
  submit: () => void
  clearFiles: () => void
}