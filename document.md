<!--
 * @Descripttion: 
 * @Author: 付静
 * @Date: 2021-02-25 23:50:52
 * @LastEditors: 付静
 * @LastEditTime: 2021-04-19 20:14:16
 * @FilePath: /document.md
-->
# ok-wc-ui开发手册


> 一个基于lit-html, ok-lit, vue 和 ant-design-vue 的webComponent组件库    

### 入口文件
```
packages/index.ts
```


### 组件文件结构
```
|-ok-attachment
  |-style(样式文件)
  |-index.ts
  |-ok-upload-drag.ts
  |-ok-upload-list.ts
  |-upload-hook.ts
  |-upload.props.ts

```
>注意：   
> 1. 每个组件单独创建文件夹。命名格式统一用'ok-'加组件名
> 2. 相似组件如有逻辑复用的，可抽取公共逻辑放在 .hook 文件中   
> 3. props较多或者有复用的，可单独提出，放在 .props文件中


### 组件开发

  目前提供了两种组件开发形式：
  * 直接使用ok-lit   
      文档详情见 [ok-lit](https://github.com/yigo-fe/ok-lit)   
      示例参考 packages/ok-accessory/ok-progress.ts
      

    > 优点：书写简洁，有模板提示   
    > 缺点：暂时无法使用动态样式；开发复杂功能组件需从零开始，开发成本大
  * 使用ok-lit + vue（推荐使用）
    > 优点：可使用Vue及Vue组件库减少开发成本   
    > 缺点：书写稍繁琐；无法使用插槽

    示例参考 packages/ok-accessory/ok-progress-vue.ts

### 关于样式

  * 公共样式及第三方组件库样式   
    为避免公共样式和第三方组件库样式被重复打包，故使用link方式引入样式文件。   
    公共样式及第三方组件库样式均作为静态资源文件方案public目录下面   
    引用方式如下：

    ```

    import { COMMON_CSS_PATH } from '../path.config'

    import { defineComponent, html, PropType } from 'ok-lit'

    defineComponent(
      'ok-test',
      {
        msg: {
          type: (String as unknown) as PropType<string>,
        }
      },
      props => {
        return () => html`
          <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />

          <div class="test-common">${props.msg}</div>

        `
      }
    )

    ```
  * 组件内部样式   
    组件样式可直接写在组件内部style标签里，也可以分离在样式文件（支持css和less）中
    ```
    import { defineComponent, html, PropType } from 'ok-lit'

    import okTestCss from './style/ok-test.less'

    defineComponent(
      'ok-test',
      {
        msg: {
          type: (String as unknown) as PropType<string>,
        }
      },
      props => {
        return () => html`
          <style>
            .test {
              background-color: #ccc;
            }
          </style>
          <style>
            ${okTestCss}
          </style>
          <div class="test test-common">${props.msg}</div>

        `
      }
    )    
    ```
  

### 项目中引用
  #### 首先需要安装
  ```
  npm install --save ok-wc-ui
  ```

  #### 在项目中引入
  ```
  // main.js

  import 'ok-wc-ui/dist/ok-wc-ui.esm.js'
  ```

  #### 使用组件
  ```
  <ok-upload-drag  />
  ```
  #### 组件传参   
    鉴于vue2和vue3传参方式略有不同，基本数据类型和引用类型也不同的状况，目前统一采用设置组件属性的方式传参
  ```
  <ok-upload-drag ref="okUploadDrag" />


  const okUploadDrag = ref(null)
  onMounted(() => {
    okUploadDrag.value.action = 'xxx'
    okUploadDrag.value.multiple = true
    okUploadDrag.value.data = {}
    okUploadDrag.value.onSuccess = ()=>{}
  })

  ```
