import { defineComponent, html, PropType, reactive } from 'ok-lit'
import { repeat } from 'lit-html/directives/repeat'
import { styleMap } from 'lit-html/directives/style-map'
import { Person } from '@c/ok-wc-ui.d'
import { SIZE_TYPE } from '@c/enum'

import okPersonGroupCss from '../assets/ok-person-group.less'

/**
 * persons: {Array<Person>} 用户信息组
 *
 * 插槽：
 *  persons-detail
 */

defineComponent(
  'ok-person-group',
  {
    persons: {
      type: (Object as unknown) as PropType<Array<Person>>,
      default: [
        {
          id: '500',
          name: '小辛辛',
          department: 'HRBP-产品技术运营-北京',
          email: 'masiwei@kuaishou.com',
        },
        {
          id: '500',
          name: '小辛辛',
          department: 'HRBP-产品技术运营-北京',
          email: 'masiwei@kuaishou.com',
        },
        {
          id: '500',
          name: '小辛辛',
          department: 'HRBP-产品技术运营-北京',
          email: 'masiwei@kuaishou.com',
        },
        {
          id: '500',
          name: '小辛辛',
          department: 'HRBP-产品技术运营-北京',
          email: 'masiwei@kuaishou.com',
        },
        {
          id: '500',
          name: '小辛辛',
          department: 'HRBP-产品技术运营-北京',
          email: 'masiwei@kuaishou.com',
        },
        {
          id: '500',
          name: '小辛辛',
          department: 'HRBP-产品技术运营-北京',
          email: 'masiwei@kuaishou.com',
        },
        {
          id: '500',
          name: '小辛辛',
          department: 'HRBP-产品技术运营-北京',
          email: 'masiwei@kuaishou.com',
        },
      ],
      required: true,
    },
    size: {
      type: (String as unknown) as SIZE_TYPE,
      default: SIZE_TYPE.MIDDLE,
      required: true,
    },
  },
  props => {
    const data = reactive({
      len: props.persons.length,
    })

    const isShowDetailText = (index: number): boolean => {
      let len = data.len > 5 ? 5 : data.len
      return len === index + 1
    }
    const personsRender = (person: Person, index: number) => html`
      <!-- 最多展示5个 -->
      ${index < 5
        ? html`
            <div class="person-item">
              <ok-avatar .person=${person}></ok-avatar>
              ${isShowDetailText(index)
                ? html`
                    <span class="detail-text">
                      ${data.len > 1 ? `...${data.len}` : person.name}
                    </span>
                  `
                : ''}
            </div>
          `
        : ''}
    `

    return () => html`
      <style>
        ${okPersonGroupCss}
      </style>
      <div class="ok-person-group ok-person-group-${props.size}">
        ${data.len ? repeat(props.persons, personsRender) : ''}
      </div>
    `
  }
)
