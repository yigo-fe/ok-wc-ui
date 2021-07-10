/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-07-10 11:23:37
 * @LastEditors: 付静
 * @LastEditTime: 2021-07-10 11:55:30
 * @FilePath: /packages/utils/utils.modal.ts
 */
import { Modal } from 'ant-design-vue'
import { createVNode } from 'vue'

import confirmIcon from '../assets/images/confirm.svg'

// confirm Modal
const confirmModal = (options: any) => {
  Modal.confirm({
    content: options.content,
    icon: createVNode('img', {
      src: confirmIcon,
      style: {
        with: '22px',
        height: '22px',
        verticalAlign: 'middle',
        marginRight: '8px',
      },
    }),
    class: 'ok-simple-modal ok-confirm-modal',
    okText: options.okText,
    cancelText: options.cancelText,
    width: 450,
    onOk: () => {
      options.onOk()
    },
    onCancel() {
      Modal.destroyAll()
    },
  })
}

// info Modal
const infoModal = (options: any) => {
  Modal.info({
    content: options.content,
    icon: createVNode('i', { class: 'icon iconfont iconbangzhu icon-first' }),
    class: 'ok-simple-modal ok-info-modal',
    okText: options.okText,
    width: 450,
    onOk: () => {
      options.onOk && options.onOk()
    },
  })
}

// warning Modal
const warningModal = (options: any) => {
  Modal.warning({
    content: options.content,
    icon: createVNode('i', { class: 'icon iconfont iconbangzhu icon-first' }),
    class: 'ok-simple-modal ok-warning-modal',
    width: 450,
  })
}

export { confirmModal, infoModal, warningModal }
