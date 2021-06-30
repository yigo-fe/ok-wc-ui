import './more-list'

import { SIZE_TYPE } from '@c/enum'
import { computed, defineComponent, html, PropType } from 'ok-lit'

import { COMMON_CSS_PATH } from '../path.config'
/**
 * @props persons: {Array<Person>} 用户信息组
 */

defineComponent(
  'ok-person-group',
  {
    personList: {
      type: Array as unknown as PropType<any[]>,
      default: () => {
        return []
      },
    },
    size: {
      type: String as unknown as PropType<SIZE_TYPE>,
      default: SIZE_TYPE.SMALL,
    },
    width: {
      type: String as unknown as PropType<string>,
    },
    height: {
      type: String as unknown as PropType<string>,
    },
    showDelete: {
      type: Boolean as unknown as PropType<boolean>,
      default: false,
    },
    showAll: {
      type: Boolean as unknown as PropType<boolean>,
      default: false,
    },
    detailSize: {
      type: String as unknown as PropType<string>,
      default: 'mini',
    },
    detailWidth: {
      type: String as unknown as PropType<string>,
    },
    detailHeight: {
      type: String as unknown as PropType<string>,
    },
    contentStyle: {
      type: Object as unknown as PropType<{}>,
    },
    itemStyle: {
      type: Object as unknown as PropType<{}>,
    },
    placement: {
      type: String as unknown as PropType<string>,
    },
    deleteItem: {
      // eslint-disable-next-line no-unused-vars
      type: Function as unknown as PropType<(item: any) => void>,
    },
    subtitleRender: {
      // eslint-disable-next-line no-unused-vars
      type: Function as unknown as PropType<(item: any) => void>,
    },
    // 审批组件传入，卡片请求数据方法
    propsGetInfoByEmpId: {
      type: Function,
    },
  },
  props => {
    const placement = computed(() => {
      return props.placement
    })
    const showList = computed(() => {
      return props.personList?.slice(0, 3)
    })

    const popperList = computed(() => {
      return props.showAll ? props.personList : props.personList?.slice(3)
    })

    const deleteItem = (item: CustomEvent) => {
      props.deleteItem && props.deleteItem(item.detail)
    }

    const avatarRender = () => {
      if (!showList.value?.length) return ''
      return html`
        ${showList.value.map(
          item => html`<ok-person-cell
            class="avatar-list"
            style="width: auto; height: auto;"
            .personInfo=${item}
            .size=${props.size}
            .width=${props.width}
            .height=${props.height}
            .propsGetInfoByEmpId=${props.propsGetInfoByEmpId}
          ></ok-person-cell>`
        )}
        ${showList.value.length === 1
          ? html`<span class="single-user-name"
              >${showList.value[0].employee_name}</span
            >`
          : html`
              <span ref="showMore" class="more"
                >${popperList.value.length
                  ? html`<ok-person-group-more
                      .popperList=${popperList.value}
                      .detailSize=${props.detailSize}
                      .detailWidth=${props.detailWidth}
                      .detailHeight=${props.detailHeight}
                      .itemStyle=${props.itemStyle}
                      .contentStyle=${props.contentStyle}
                      .showDelete=${props.showDelete}
                      .placement=${placement.value}
                      .propsGetInfoByEmpId=${props.propsGetInfoByEmpId}
                      @deleteItem=${deleteItem}
                    ></ok-person-group-more>`
                  : ''}</span
              >
            `}
      `
    }

    // ${avatarRender()} ${props.personList.length > 1 ? popperRender() : ''}

    return () => html`
      <link rel="stylesheet" .href="${COMMON_CSS_PATH}" />
      <div class="ok-person-group ok-person-group-root">
        <div
          class="ok-person-group-wrap"
          style="display: flex; align-items:center; "
        >
          ${avatarRender()}
        </div>
      </div>
    `
  }
)
