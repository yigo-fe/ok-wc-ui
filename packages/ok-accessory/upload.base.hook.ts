/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-25 16:18:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-07-10 17:23:34
 * @FilePath: /packages/ok-accessory/upload.base.hook.ts
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

import { message } from 'ant-design-vue'
import { computed } from 'vue'
import { reactive, ref, watch } from 'vue'

import { i18n } from '../locales'
import { baseURL } from '../services/api'
import { isSameArray } from '../utils/index'
import { confirmModal } from '../utils/utils.modal'
import type { OkFile, UploadStatus } from './upload.type'
import { download } from './utils'
import {CheckFileResult} from "./upload.props";
type UpdateFile = {
  percentage?: number
  status?: UploadStatus
  response?: unknown
  url?: string
  raw?: OkFile
}

export default function (props: any, context: any, config: any) {
  const reqs = ref({})
  let fileId = 0
  const fileLists = ref([] as any)
  // const propsValue = computed(() => props.fileList)
  // 兼容字符串和数组类型数据
  const propsValue = computed(() => {
    if (!props.fileList) {
      return []
    } else {
      return Array.isArray(props.fileList)
        ? props.fileList
        : props.fileList.split(',')
    }
  })

  const showPreview = computed(() => props.operation.includes('preview'))
  const showDownload = computed(() => props.operation.includes('download'))
  const showRemove = computed(() => props.operation.includes('remove'))
  const hideUploader = computed(() => props.hideUploader)
  const disabled = computed(() => props.disabled)

  const isUploading = ref(false)

  // 所有已上传文件 file_id 和 file 的map
  const fileMap = reactive<any>({})

  /**
   *  文件上传前数据处理：判断limit, multiple; 添加UID; beforeUpload 钩子处理
   * @param files 本次要上传的文件
   */
  const uploadFiles = (files: FileList) => {
    // 特殊处理：预览时不调上传接口
    if (window.okuiConfig?.options?.preview) {
      // message.error('预览状态下无法上传')
      message.error(
        i18n.$t('control.attachmentUpload.unpreviewMsg', '预览状态不支持上传')
      )
      return
    }
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
	  const uploadFileList = handlerCheckFileList(postFiles)
	  uploadFileList.forEach(rawFile => {
      let file = rawFile as OkFile
      // 文件格式及大小都在组件外部判断
      if (
        !props.beforeUpload ||
        (props.beforeUpload && props.beforeUpload(file, uploadFileList))
      ) {
        file.uid = fileId
        fileId++
        handleFileList(file)
        // props.onStart(rawFile)
        handleOnChange(file)
        // before-upload
        // 开始上传
        if (props.autoUpload) upload(file as OkFile)
      }
    })
  }

	const getFileType = (filePath: string) => {
		const startIndex = filePath.lastIndexOf('.')
		if (startIndex != -1)
			return filePath.substring(startIndex + 1, filePath.length).toLowerCase()
		else return ''
	}

	/**
	 * 内置校验附件
	 * */
	const handlerCheckFileList = (fileList: File[]): File[] => {
		const canUploadFileList = fileList.slice()
		const checkResult: CheckFileResult = {
			filename: [],
			filesize: [],
			filetype: []
		}
		for (let i = 0; i < canUploadFileList.length; i++) {
			const file = canUploadFileList[i]
			let success = true
			// 按照 类型 => 大小 => 名称长度 的顺序进行校验
			if (props.checkFileType !== undefined) {
				const checkFileType = props.checkFileType.map((item: string) => item.toLowerCase())
				if (!checkFileType.includes(getFileType(file.name))) {
					checkResult.filetype.push(file)
					success = false
				}
			}
			if (props.checkFileSize !== undefined) {
				if (file.size > props.checkFileSize) {
					checkResult.filesize.push(file)
					success = false
				}
			}
			if (props.checkFileName !== undefined) {
				if (file.name.length > props.checkFileName) {
					checkResult.filename.push(file)
					success = false
				}
			}
			if (!success) {
				canUploadFileList.splice(i, 1)
				i--
			}
		}
		if (canUploadFileList.length !== fileList.length) {
			props.onCheckFileError?.(checkResult)
		}
		return canUploadFileList
	}

  /**
   * 选择文件后添加文件到传输列表
   * @param file 要添加到传输列表的文件
   */
  const handleFileList = (file: any) => {
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
    let inputRef = context.refs.inputRef as HTMLInputElement
    inputRef.value = ''
    // 更新上传状态
    updateStatus({ status: 'uploading' }, rawFile)
    // 调接口， 上传
    post(rawFile)
  }

  const reupload = (rawFile: OkFile) => {
    // 更新上传状态
    updateStatus({ status: 'uploading' }, rawFile)
    // 调接口， 上传
    post(rawFile)
  }

  const post = (rawFile: OkFile) => {
    isUploading.value = true
    const { uid } = rawFile
    const options = {
      headers: props.headers,
      withCredentials: props.withCredentials,
      file: rawFile,
      data: props.data,
      filename: props.name,
      action: props.action || `${baseURL}${config.action}`,
      onProgress: (e: ProgressEvent) => {
        handleProgress(e, rawFile)
      },
      onSuccess: (res: any) => {
        if (res.code === '000000') {
          // 处理自定义接口上传后的数据
          props.formatUploadData && props.formatUploadData(res)
          // 处理上传成功数据
          handleSuccess(res, rawFile)
          delete (reqs.value as any)[uid]
        } else {
          handleError(res, rawFile)
        }
        // delete reqs.value[uid]
      },
      onError: (err: any) => {
        handleError(err, rawFile)
        // delete reqs.value[uid]
      },
    }
    const req: any = props.httpRequest(options);
    (reqs.value as any)[uid] = req
    if (req instanceof Promise) {
      req.then(options.onSuccess, options.onError)
    }
  }

  // 从上传列表中删除文件
  const removeFileList = (file: any) => {
    const uid = Array.isArray(file) ? file[0].uid : file.uid
    let idx = fileLists.value.findIndex((v: any) => v.uid === uid)
    if (idx === -1) {
      // console.warn('文件不存在')
      return
    }
    fileLists.value.splice(idx, 1)
    // 通知变化
    handleOnChange(file)
  }
  // 终止上传
  const handleAbort = (data: any) => {
    const file = data.detail
    const _reqs: any = reqs.value
    if (file) {
      const uid = file.uid
      if (_reqs[uid]) {
        ;(_reqs[uid] as XMLHttpRequest).abort()
        removeFileList(file)
      }
    } else {
      Object.keys(_reqs).forEach(uid => {
        if (_reqs[uid]) (_reqs[uid] as XMLHttpRequest).abort()
        delete _reqs[uid]
        removeFileList(file)
      })
    }
  }

  const handleProgress = (e: any, file: OkFile) => {
    updateStatus({ percentage: e.percent }, file)
    // 处理用户自定义事件
    props.onProgress &&
      props.onProgress({ e, file, fileLists: fileLists.value })
  }

  const handleSuccess = (res: any, file: OkFile) => {
    // 收集已上传文件
    const uploadedFile = res?.data?.[0]
    const file_id = uploadedFile?.file_id
    fileMap[file_id] = uploadedFile
    // 更新传输列表状态
    updateStatus({ status: 'success', response: res }, file)
    handleOnChange(file)
    // 处理用户自定义事件
    props.onSuccess &&
      props.onSuccess({ response: res, file, fileLists: fileLists.value })
    // 更新value
    props.update && props.update({ file, fileLists: fileLists.value })

    // 判断是否全部上传完毕
    const idx = fileLists.value.findIndex(
      (v: any) => v.status !== 'success' && v.status !== 'fail'
    )
    isUploading.value = idx > -1
  }

  const handleError = (err: any, file: OkFile) => {
    // 更新状态
    updateStatus({ status: 'fail' }, file)
    // 从列表中删除 TODO: 具体交互待产品确认
    // fileLists.value = fileLists.value.filter(v => v.uid !== file.uid)
    // 触发onchange
    handleOnChange(file)
    // 处理用户自定义事件
    props.onError &&
      props.onError({ error: err, file, fileLists: fileLists.value })
  }

  const handleExceed = (file: FileList) => {
    props.onExceed && props.onExceed({ file, fileLists: fileLists.value })
  }

  const handleOnChange = (file: File) => {
    props.onChange && props.onChange({ file, fileLists: fileLists.value })
  }

  const confirmMsg = () => {
    return config.type === 'image'
      ? i18n.$t('control.imageUpload.deleteTip', '确认删除该图片?')
      : i18n.$t('control.attachmentUpload.deleteTip', '确认删除该文件?')
  }
  /**
   * 删除文件
   * @param data emit事件
   */
  const handleDetele = (data: any) => {
    let idx = fileLists.value.findIndex((v: any) => v.uid === data.detail?.[0]?.uid)
    if (idx === -1) {
      // console.warn('文件不存在')
      return
    }
    let file = fileLists.value[idx]

    // 二次确认弹窗
    const options = {
      content: confirmMsg(),
      okText: i18n.$t('common.confirm', '确定'),
      cancelText: i18n.$t('common.cancel', '取消'),
      onOk: () => {
        // 处理beforeRemove
        if (
          !props.beforeRemove ||
          (props.beforeRemove &&
            props.beforeRemove({ file, fileLists: fileLists.value }))
        ) {
          // 组件内部接口删除
          config.remove({ file, index: idx, fileLists: fileLists.value })
        }
      },
    }

    confirmModal(options)
  }
  /**
   * 下载
   * @param data
   */
  const handleDownload = (data: any) => {
    let file = fileLists.value.find((v: any) => v.uid === data.detail?.[0]?.uid)
    // 自定义下载
    if (props.customDownload) {
      props.customDownload(file)
      return
    }
    if (file) {
      download(file.response?.data?.[0]?.download_url)
      // 处理用户自定义事件
      props.onDownload && props.onDownload(file)
    }
  }

  // 上传失败， 从传输列表中移除
  const handleRemoveFileList = (e: CustomEvent) => {
    removeFileList(e.detail)
  }

  /**
   *  更新输出列表文件状态
   * @param data 待更新的字段
   * @param file 待更新的文件
   */
  const updateStatus = (data: any, file: any) => {
    const uid = Array.isArray(file) ? file[0].uid : file.uid
    let curFile = fileLists.value.find((v: any) => v.uid === uid)
    if (!curFile) return
    Object.keys(data).forEach((key: any) => {
      curFile[key] = data[key]
    })
  }

  // 仅限于fileList 回显
  const displayFileList = (defaultFileList: any) => {
	  fileLists.value = []
    defaultFileList.forEach((file: any) => {
      const file_id = file.file_id
      // 更新fileList展示
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

      // 存储文件信息
      fileMap[file_id] = file
    })
  }

	let rejectGetDefaultFileList: Function | null = null
  // 获取默认列表
  const handleDefaultlist = async (ids: string[]) => {
		// 如果有上一次的请求，就把上一次的终止掉
		if (rejectGetDefaultFileList) {
			rejectGetDefaultFileList()
		}
    const result = await Promise.race([config.getDefaultFileList(ids), new Promise((resolve, reject) => {
	    rejectGetDefaultFileList = reject
    })])
	  rejectGetDefaultFileList = null
    if (result && result.code === '000000') {
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

      same = l1 ? propsValue.value.every((v: any) => fileIds.indexOf(v) > -1) : true
    }
    return same
  }

  watch(
    () => propsValue.value,
    (val, oldVal) => {
      // 如果正在上传，不处理
      if (isUploading.value) return
      // 有时val和oldValue一样也会触发，具体原因待排查
      if (isSameArray(val, oldVal)) return

      // 如果propsValue 和fileList 一样， 不做处理
      if (propsValEqulValue()) return
      // 清空之前的数据
      fileLists.value = []
      // 判断是否需要有id, 如果有， 请求详细信息
      propsValue.value.length && handleDefaultlist(propsValue.value)
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
    disabled,
    displayFileList,
    uploadFiles,
    handleDetele,
    handleDownload,
    handleAbort,
    handleRemoveFileList,
    reupload,
  }
}
