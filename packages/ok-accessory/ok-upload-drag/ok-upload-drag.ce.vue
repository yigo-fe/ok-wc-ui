<template>
	<div
		v-if="!hideUploader"
		:class="{
			'ok-upload': true,
			'ok-upload--drag': true,
			'ok-upload--drag1': true,
			'has-slot': hasSlot,
		}"
		@drop="onDrop"
		@dragover="onDragover"
		@dragleave="onDragleave"
		@click="handleClick"
	>
		<slot>
			<div
				:class="{
					'upload-inner': true,
					disabled: disabled,
					dragover: dragover,
					'has-file': fileLists && fileLists.length,
				}"
			>
				<svg
					t="1622689766057"
					class="icon"
					viewBox="0 0 1024 1024"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					p-id="53224"
					width="44"
					height="44"
				>
					<path
						d="M768 810.705455a42.682182 42.682182 0 1 1 0-85.41091c94.114909 0 170.705455-76.590545 170.705455-170.682181 0-89.6-70.097455-164.305455-159.511273-170.123637l-25.204364-1.489454-10.705454-22.690909C701.114182 271.010909 610.327273 213.294545 512 213.294545s-189.090909 57.716364-231.307636 147.013819l-10.705455 22.690909-25.088 1.605818c-89.506909 5.794909-159.488 80.500364-159.488 170.100364 0 94.091636 76.590545 170.682182 170.682182 170.682181a42.682182 42.682182 0 1 1 0 85.410909c-141.195636 0-256-114.804364-256-256 0-126.091636 92.509091-232.494545 214.714182-252.392727C274.804364 195.700364 388.887273 128 512 128c123.112727 0 237.195636 67.700364 297.309091 174.196364 122.181818 19.898182 214.690909 126.394182 214.690909 252.509091 0 141.102545-114.804364 256-256 256z"
						p-id="53225"
					></path>
					<path
						d="M640 789.294545c-10.891636 0-21.806545-4.189091-30.208-12.497454L512 679.005091l-97.792 97.792a42.542545 42.542545 0 0 1-60.299636 0 42.542545 42.542545 0 0 1 0-60.276364l128-128a42.542545 42.542545 0 0 1 60.276363 0l128 128a42.542545 42.542545 0 0 1 0 60.276364c-8.378182 8.401455-19.293091 12.497455-30.184727 12.497454z"
						p-id="53226"
					></path>
					<path
						d="M512 960a42.682182 42.682182 0 0 1-42.705455-42.705455v-298.58909a42.682182 42.682182 0 1 1 85.41091 0v298.682181c0 23.505455-19.106909 42.612364-42.705455 42.612364z"
						p-id="53227"
					></path>
				</svg>

				<p class="upload-inner-text">
					{{ i18n.$t('control.attachmentUpload.dragTip', '将文件拖到此处或') }}
					<span
						class="upload-btn"
						:class="{
							'upload-btn': true,
							disabled: disabled,
						}"
					>
						{{
							i18n.$t('control.attachmentUpload.uploadBtndDrag', '点击上传')
						}}</span
					>
				</p>
			</div>
		</slot>

		<input
			v-if="!hideUploader"
			style="display: none"
			ref="inputRef"
			class="ok-upload__input"
			type="file"
			:name="name"
			:multiple="multiple"
			:accept="accept"
			@change="handleChange"
		/>
	</div>
	<ok-file-list
		@preview="handlePreview"
		@delete="handleDetele"
		@download="handleDownload"
		@abort="handleAbort"
		@remove="handleRemoveFileList"
		@reupload="handleReupload"
		.fileList="fileLists"
		.listType="listType"
		.showPreview="showPreview"
		.showDownload="showDownload"
		.showRemove="showRemove"
		.vertical="vertical"
	></ok-file-list>
</template>

<script lang="ts">
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

import {defineComponent, defineExpose, getCurrentInstance, onMounted, ref,} from 'vue'

import {i18n} from '../../locales'
import useAttachmentHandle from '../attachment.common.hook'
import {UploadProps} from '../upload.props'
import {customDefineExpose, getHostNode} from '../../utils/index'

export default defineComponent({
	props: {
		...UploadProps,
	},
	setup(props) {
		const instance: any = getCurrentInstance()
		const {
			showPreview,
			showDownload,
			showRemove,
			fileLists,
			hideUploader,
			disabled,
			displayFileLists,
			uploadFiles,
			handlePreview,
			handleDetele,
			handleDownload,
			handleAbort,
			handleRemoveFileList,
			handleReupload,
		} = useAttachmentHandle(props, instance)

		/**
		 * 列表上传，点击选择文件
		 */
		const handleClick = () => {
			if (!disabled.value) {
				let inputRef = instance.refs.inputRef as HTMLInputElement
				inputRef.value = ''
				inputRef.click()
			}
		}

		/**
		 * 清空附件列表
		 */
		const handleRemoveAllFileList = () => {
			fileLists.value = []
		}

		const exposeMap: Record<any, any> = {
			displayFileLists,
			handleClick,
			handleRemoveAllFileList,
			uploadFiles,
		}
		defineExpose(exposeMap)
		const hasSlot = ref(false)
		onMounted(() => {
			// 暴露组件的方法
			setTimeout(() => {
				const dom = getHostNode(instance.refs.inputRef)
				customDefineExpose(exposeMap, dom)
				hasSlot.value = dom.children.length > 0
			}, 1000)
		})

		/**
		 * 点击上传选中文件
		 * @param e 选中的文件
		 */
		const handleChange = (e: any) => {
			const files = (e.target as HTMLInputElement).files
			if (!files) return
			uploadFiles(files)
		}

		/**
		 * 拖拽上传选择文件
		 *
		 */
		const dragover = ref(false)
		const onDrop = (e: any) => {
			e.preventDefault()
			if (disabled.value) return
			let files = (e.dataTransfer as DataTransfer).files
			// 更改拖拽中状态
			dragover.value = false

			// 格式验证统一在beforeUpload中处理
			uploadFiles(files)
		}

		const onDragover = (e: any) => {
			e.preventDefault()
			if (!disabled.value) dragover.value = true
		}

		const onDragleave = (e: any) => {
			e.preventDefault()
			dragover.value = false
		}

		return {
			i18n,
			hasSlot,
			onDrop,
			onDragover,
			handleClick,
			onDragleave,
			dragover,
			fileLists,
			handleChange,
			handlePreview,
			handleDetele,
			handleDownload,
			handleAbort,
			handleRemoveFileList,
			handleReupload,
			showPreview,
			showDownload,
			showRemove,
			hideUploader,
		}
	},
})
</script>
<style lang="less">
@import '../../assets/styles/common.less';
</style>
