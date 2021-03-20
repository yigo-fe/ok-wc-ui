/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-25 16:18:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-20 17:12:44
 * @FilePath: /packages/ok-accessory/upload-base-hook.ts
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

import { computed, ref } from 'ok-lit'
import { watch } from 'vue'

import type { OkFile, UploadStatus } from './upload.type'

type UpdateFile = {
  percentage?: number
  status?: UploadStatus
  response?: unknown
  url?: string
  raw?: OkFile
}

export default function (props, context, config) {
  const reqs = ref({})
  let fileId = 0
  const fileLists = ref([] as any)
  const maxSize = computed(() => props.maxSize * 1024 + 1)
  const propsValue = computed(() => props.fileList)

  const showPreview = computed(() => props.operation.includes('preview'))
  const showDownload = computed(() => props.operation.includes('download'))
  const showRemove = computed(() => props.operation.includes('remove'))
  const hideUploader = computed(() => props.hideUploader)

  const fileCheck = file => {
    if (props.maxSize) {
      return file.size < maxSize
    } else {
      return true
    }
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
      // 检查文件大小是否符合条件
      if (!fileCheck(file)) return
      file.uid = fileId
      fileId++
      handleFileList(file)
      // props.onStart(rawFile)
      handleOnChange(file)
      // before-upload
      if (
        !props.beforeUpload ||
        (props.beforeUpload && props.beforeUpload(file))
      ) {
        // 开始上传
        if (props.autoUpload) upload(file as OkFile)
      }
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
      action: config.action,
      onProgress: (e: ProgressEvent) => {
        handleProgress(e, rawFile)
      },
      onSuccess: (res: any) => {
        if (res.code === '000000') {
          handleSuccess(res, rawFile)
        } else {
          handleError(res, rawFile)
        }
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
    props.onProgress &&
      props.onProgress({ e, file, fileLists: fileLists.value })
  }

  const handleSuccess = (res, file: OkFile) => {
    // todo 处理返回字段路径问题
    updateStatus({ status: 'success', response: res }, file)
    handleOnChange(file)
    // 处理用户自定义事件
    props.onSuccess &&
      props.onSuccess({ res, file, fileLists: fileLists.value })
    // 更新value
    props.update && props.update({ file, fileLists: fileLists.value })
  }

  const handleError = (err, file: OkFile) => {
    // 更新状态
    updateStatus({ status: 'fail' }, file)
    // 从列表中删除 TODO: 具体交互待产品确认
    fileLists.value = fileLists.value.filter(v => v.uid !== file.uid)
    // 触发onchange
    handleOnChange(file)
    // 处理用户自定义事件
    props.onError && props.onError({ err, file, fileLists: fileLists.value })
  }

  const handleExceed = file => {
    props.onExceed && props.onExceed({ file, fileLists: fileLists.value })
  }

  const handleOnChange = file => {
    props.onChange && props.onChange({ file, fileLists: fileLists.value })
  }
  /**
   * 删除文件
   * @param data emit事件
   */
  const handleDetele = data => {
    let idx = fileLists.value.findIndex(v => v.uid === data.detail.uid)
    if (idx === -1) {
      console.warn('文件不存在')
      return
    }
    let file = fileLists.value[idx]
    // 处理beforeRemove
    if (
      !props.beforeRemove ||
      (props.beforeRemove &&
        props.beforeRemove({ file, fileLists: fileLists.value }))
    ) {
      // 组件内部接口删除
      config.remove({ file, index: idx, fileLists: fileLists.value })
    }
  }
  /**
   * 下载
   * @param data
   */
  const handleDownload = data => {
    let file = fileLists.value.find(v => v.uid === data.detail.uid)
    if (file) {
      // window.open(file.response.data[0].download_url, '_blank')
      // 处理用户自定义事件
      props.onDownload && props.onDownload(file)
    }
  }

  /**
   * 下载
   * @param data
   */
  const handlePreview = data => {
    let file = fileLists.value.find(v => v.uid === data.detail.uid)
    if (file) {
      window.open(file.response.data[0].online_view_url, '_blank')
      // 处理用户自定义事件
      props.onPreview && props.onPreview(file)
    }
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

  // 仅限于fileList 回显
  const displayFileList = (defaultFileList: any) => {
    defaultFileList.forEach(file => {
      fileLists.value.push({
        name: file.file_name,
        percentage: 100,
        status: 'success',
        size: file.size,
        uid: fileId,
        raw: file,
        response: { data: [file] },
      })
      fileId++
    })
  }

  // 获取默认列表
  const handleDefaultlist = async (ids: string) => {
    const result = await config.getDefaultFileList(ids)
    if (result.code === '000000') {
      displayFileList(result.data)
    }
  }

  // 判断propsValue 是否和value一样
  const propsValEqulValue = () => {
    const l1 = propsValue.value?.length || 0
    const l2 = fileLists.value?.length || 0

    let same = false
    if (l1 === l2) {
      const fileIds = fileLists.value
        .map((v: any) => v.response?.data?.[0]?.file_id)
        .filter((v: any) => v)

      same = l1 ? propsValue.value.every(v => fileIds.indexOf(v) > -1) : true
    }
    return same
  }

  watch(
    () => propsValue.value,
    () => {
      const ids = props.fileList
      // 如果propsValue 和fileList 一样， 不做处理
      if (propsValEqulValue()) return

      ids.length ? handleDefaultlist(ids) : (fileLists.value = [])
    },
    {
      immediate: true,
      deep: true,
    }
  )

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
