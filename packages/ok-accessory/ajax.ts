/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-25 15:49:29
 * @LastEditors: 付静
 * @LastEditTime: 2021-01-27 15:34:24
 * @FilePath: /packages/ok-accessory/ajax.ts
 */
import type {
  OkUploadAjaxError,
  OkUploadProgressEvent,
  OkUploadRequestOptions,
} from './upload.type'

type XMLHttpRequestResponseType =
  | ''
  | 'text'
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
function getError(
  action: string,
  option: OkUploadRequestOptions,
  xhr: XMLHttpRequest
) {
  let msg: string
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`
  } else {
    msg = `fail to post ${action} ${xhr.status}`
  }

  const err = new Error(msg) as OkUploadAjaxError
  err.status = xhr.status
  err.method = 'post'
  err.url = action
  return err
}

function getBody(xhr: XMLHttpRequest): XMLHttpRequestResponseType {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

export default function upload(option: OkUploadRequestOptions) {
  if (typeof XMLHttpRequest === 'undefined') {
    return
  }

  const xhr = new XMLHttpRequest()
  const action = option.action

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        ;(e as OkUploadProgressEvent).percent = (e.loaded / e.total) * 100
      }
      option.onProgress(e)
    }
  }

  const formData = new FormData()

  if (option.data) {
    Object.keys(option.data).forEach(key => {
      formData.append(key, option.data[key])
    })
  }

  formData.append(option.filename, option.file, option.file.name)

  xhr.onerror = function error() {
    option.onError(getError(action, option, xhr))
  }

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr))
    }

    option.onSuccess(getBody(xhr))
  }

  xhr.open('post', action, true)

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  // const headers = option.headers || {}

  // for (const item in headers) {
  //   if (headers.hasOwnProperty(item) && headers[item] !== null) {
  //     xhr.setRequestHeader(item, headers[item])
  //   }
  // }
  xhr.send(formData)
  return xhr
}
