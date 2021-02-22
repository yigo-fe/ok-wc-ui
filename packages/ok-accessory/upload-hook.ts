/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-25 16:18:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-02-08 13:54:19
 * @FilePath: /packages/ok-accessory/upload-hook.ts
 */

/**
 * drag
 * listType: text / picture
 * disabled
 * accept
 * limit
 * filelist
 * multiple
 * action
 * data
 *
 * on-exceed
 * before-upload
 * on-change
 * on-success
 *
 * file-list 相关操作：
 * download： show ?
 * preview
 * delete：showdelete(目前默认readonly状态不能delete) ？ before-delete ？
 *
 * readonly ? (涉及file-list操作通用功能)
 *
 * 上传成功之后展示filelist的数据格式
 *
 */

import { ref } from 'ok-lit'

import type { OkFile, UploadStatus } from './upload.type'

type UpdateFile = {
  percentage?: number
  status?: UploadStatus
  response?: unknown
  url?: string
  raw?: OkFile
}

export default function (props, context) {
  const reqs = ref({})
  let fileId = 0
  const fileLists = ref([] as any)

  const displayFileList = () => {
    props.fileList.forEach(file => {
      fileLists.push({
        name: file.name,
        percentage: 100,
        status: 'success',
        size: file.size,
        uid: fileId,
        raw: file,
      })
      fileId++
    })
  }

  /**
   *  文件上传前数据处理：判断limit, multiple; 添加UID; beforeUpload 钩子处理
   * @param files 本次要上传的文件
   */
  const uploadFiles = (files: FileList) => {
    if (
      props.limit &&
      Number(fileLists.value.length + files.length) > Number(props.limit)
    ) {
      // props.onExceed(files, props.fileList)
      console.warn('exceed')
      handleExceed(files)
      return
    }
    let postFiles = Array.from(files)
    if (!props.multiple) {
      postFiles = postFiles.slice(0, 1)
    }
    if (postFiles.length === 0) {
      return
    }
    postFiles.forEach(rawFile => {
      let file = rawFile as OkFile
      file.uid = fileId
      fileId++
      handleFileList(file)
      // props.onStart(rawFile)
      handleOnChange(file)
      // todo before-upload
      // 开始上传
      if (props.autoUpload) upload(file as OkFile)
    })
  }

  /**
   * 选择文件后添加文件到传输列表
   * @param file 要添加到传输列表的文件
   */
  const handleFileList = file => {
    fileLists.value.push({
      name: file.name,
      percentage: 0,
      status: 'ready',
      size: file.size,
      uid: file.uid,
      raw: file,
    })
  }

  /**
   * 上传文件：post; 清空上次选择的value，避免下次选择不触发change
   * @param rawFile 上传的单个文件
   */
  const upload = (rawFile: OkFile) => {
    let inputRef = context.$refs.inputRef as HTMLInputElement
    inputRef.value = ''

    post(rawFile)
  }

  const post = (rawFile: OkFile) => {
    const { uid } = rawFile
    const options = {
      headers: props.headers,
      withCredentials: props.withCredentials,
      file: rawFile,
      data: props.data,
      filename: props.name,
      action: props.action,
      onProgress: (e: ProgressEvent) => {
        handleProgress(e, rawFile)
      },
      onSuccess: (res: any) => {
        handleSuccess(res, rawFile)
        delete reqs.value[uid]
      },
      onError: (err: any) => {
        handleError(err, rawFile)
        delete reqs.value[uid]
      },
    }
    const req = props.httpRequest(options)
    reqs.value[uid] = req
    if (req instanceof Promise) {
      req.then(options.onSuccess, options.onError)
    }
  }

  const handleProgress = (e: any, file: OkFile) => {
    updateStatus({ status: 'uploading', percentage: e.percent }, file)
    // 处理用户自定义事件
    props.onProgress && props.onProgress(e, file, fileLists)
  }

  const handleSuccess = (res, file: OkFile) => {
    // todo 处理返回字段路径问题
    // res.data[0].online_view_url = 'http:' + res.data[0].online_view_url
    updateStatus({ status: 'success', response: res }, file)
    handleOnChange(file)
    // 处理用户自定义事件
    props.onSuccess && props.onSuccess(res, file, fileLists)
  }

  const handleError = (err, file: OkFile) => {
    updateStatus({ status: 'fail' }, file)
    handleOnChange(file)
    // 处理用户自定义事件
    props.onSuccess && props.onSuccess(err, file, fileLists)
  }

  const handleExceed = file => {
    console.log('handleExceed, props.onExceed', props.onExceed)
    props.onExceed && props.onExceed(file, fileLists)
  }

  const handleOnChange = file => {
    props.onChange && props.onChange(file, fileLists)
  }
  const handleOnPreview = file => {
    props.onPreview ? props.onPreview(file) : handlePreview(file)
  }
  /**
   * 删除文件
   * @param data emit事件
   */
  const handleDetele = data => {
    let idx = fileLists.value.findIndex(v => v.uid !== data.detail.uid)
    if (idx === -1) {
      console.warn('文件不存在')
      return
    }
    let file = fileLists.value[idx]
    // 处理beforeRemove
    if (
      !props.beforeRemove ||
      (props.beforeRemove && props.beforeRemove(file, fileLists))
    ) {
      fileLists.value.splice(idx, 1)
      // 处理用户自定义事件
      props.onRemove && props.onRemove(file, fileLists)
    }
  }
  /**
   * 下载
   * @param data
   */
  const handleDownload = data => {
    let url = data.detail.response.data[0].online_view_url
    window.open(url, '_blank')
  }

  /**
   * 下载
   * @param data
   */
  const handlePreview = data => {
    let url = data.detail.response.data[0].online_view_url
    window.open(url, '_blank')
  }

  /**
   *  更新输出列表文件状态
   * @param data 待更新的字段
   * @param file 待更新的文件
   */
  const updateStatus = (data: UpdateFile, file) => {
    let curFile = fileLists.value.find(v => v.uid === file.uid)
    if (!curFile) return
    Object.keys(data).forEach(key => {
      curFile[key] = data[key]
    })
  }

  return {
    fileLists,
    displayFileList,
    uploadFiles,
    handleOnPreview,
    handleDetele,
    handleDownload,
  }
}
