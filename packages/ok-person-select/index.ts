import {
  createSingleton,
  Instance,
  setMultiplePopover,
  setPopover,
} from '@c/utils'
import { repeat } from 'lit-html/directives/repeat'
import { computed, defineComponent, html, onMounted, ref } from 'ok-lit'
import { PropType } from 'ok-lit/dist/types/props'
import tippyCSS from 'tippy.js/dist/tippy.css'

import selectCSS from '../assets/ok-select.less'

/**
 * @props multiple 是否多选
 * @props selectValue 已选中值
 * @props filter-option 是否根据输入项进行筛选
 */

defineComponent(
  'ok-person-select',
  {
    multiple: {
      type: Boolean,
      default: true,
    },
    filterOption: {
      type: Boolean,
      default: true,
    },
    selectValue: {
      type: (Array as unknown) as PropType<any[]>,
      required: true,
      default: [
        {
          value: '501',
          label: '小辛辛-1',
          department: 'HRBP-产品技术运营-北京',
          email: 'masiwei@kuaishou.com',
        },
        // {
        //   value: '500',
        //   label: '小辛辛-2',
        //   department: 'HRBP-产品技术运营-北京',
        //   email: 'masiwei@kuaishou.com',
        // },
        // {
        //   value: '500',
        //   label: '小辛辛-3',
        //   department: 'HRBP-产品技术运营-北京',
        //   email: 'masiwei@kuaishou.com',
        // },
        // {
        //   value: '500',
        //   label: '小辛辛',
        //   department: 'HRBP-产品技术运营-北京',
        //   email: 'masiwei@kuaishou.com',
        // },
        // {
        //   value: '500',
        //   label: '小辛辛',
        //   department: 'HRBP-产品技术运营-北京',
        //   email: 'masiwei@kuaishou.com',
        // },
        // {
        //   value: '500',
        //   label: '小辛辛',
        //   department: 'HRBP-产品技术运营-北京',
        //   email: 'masiwei@kuaishou.com',
        // },
        // {
        //   value: '500',
        //   label: '小辛辛',
        //   department: 'HRBP-产品技术运营-北京',
        //   email: 'masiwei@kuaishou.com',
        // },
      ],
    },
  },
  (props, context) => {
    let poperInstance: Instance
    // 选项
    const selectOptions = ref([
      {
        value: '501',
        label: '小辛辛-1',
        department: 'HRBP-产品技术运营-北京',
        email: 'masiwei@kuaishou.com',
      },
      {
        value: '502',
        label: '小辛辛-2',
        department: 'HRBP-产品技术运营-北京',
        email: 'masiwei@kuaishou.com',
      },
      {
        value: '503',
        label: '小辛辛-3',
        department: 'HRBP-产品技术运营-北京',
        email: 'masiwei@kuaishou.com',
      },
      {
        value: '504',
        label: '小辛辛',
        department: 'HRBP-产品技术运营-北京',
        email: 'masiwei@kuaishou.com',
      },
      {
        value: '505',
        label: '小辛辛',
        department: 'HRBP-产品技术运营-北京',
        email: 'masiwei@kuaishou.com',
      },
      {
        value: '506',
        label: '小辛辛',
        department: 'HRBP-产品技术运营-北京',
        email: 'masiwei@kuaishou.com',
      },
      {
        value: '507',
        label: '小辛辛',
        department: 'HRBP-产品技术运营-北京',
        email: 'masiwei@kuaishou.com',
      },
    ])

    // 是否有选中
    const isSlect = computed(() => !!props.selectValue.length)
    // 搜索文本
    const searchText = ref('')
    const searchTextChange = (event: any) => {
      searchText.value = event.target.value
      // 计算输入框宽度
      const searchInput = context.$refs.searchInput as HTMLElement
      const inputWidth = context.$refs.inputWidth as HTMLElement
      searchInput.style.width =
        inputWidth.getBoundingClientRect().width + 10 + 'px'

      computedDropdown()
    }

    // 点击select聚焦
    const onClickSelect = () => {
      computedDropdown()
    }

    // 计算下拉选位置
    const computedDropdown = () => {
      const searchInput = context.$refs.searchInput as HTMLElement
      const reference = context.$refs.reference as HTMLElement
      const tooltip = context.$refs.tooltip as HTMLElement
      searchInput.focus()
      requestAnimationFrame(() => {
        const placement =
          tooltip.parentElement?.parentElement?.dataset['placement']

        // 计算偏移量
        const {
          width: referenceWidth,
          left: referenceLeft,
          top: referenceTop,
        } = reference.getBoundingClientRect()
        const {
          width: searchInputWidth,
          left: searchInputLeft,
          top: searchInputTop,
        } = searchInput.getBoundingClientRect()

        let offsetY = 10
        if (placement === 'top') {
          offsetY = searchInputTop - referenceTop + 2
        }

        const offsetX =
          referenceLeft +
          referenceWidth / 2 -
          (searchInputLeft + searchInputWidth / 2)

        poperInstance.setProps({
          offset: [offsetX, offsetY],
        })
      })
    }

    // 失焦
    const onSearchInputBlur = () => {
      // poperInstance.hide()
    }

    // 删除/选中
    const onToggleSelect = (currentVal: any) => {
      const currentIndex = props.selectValue.findIndex(
        (val: any) => val.value === currentVal.value
      )
      currentIndex === -1
        ? context.emit('change', [...props.selectValue, currentVal])
        : context.emit(
            'change',
            props.selectValue.filter(
              (val: any, index) => index !== currentIndex
            )
          )
    }

    onMounted(() => {
      const { reference, tooltip, searchInput } = context.$refs as any
      tooltip.style.width = reference.getBoundingClientRect().width + 'px'
      poperInstance = setPopover(searchInput, tooltip, {
        placement: 'bottom',
        arrow: false,
        hideOnClick: false,
        trigger: 'focus',
        duration: 0,
      })
      poperInstance.show()

      const tippyInstances = setMultiplePopover(
        context.$refs['ok-person'] as HTMLElement[],
        (context.$refs['ok-person-card'] as HTMLElement[])[0] as HTMLElement,
        {
          appendTo: 'parent',
        }
      )
      const singleton = createSingleton(tippyInstances, {
        delay: 100,
        placement: 'left',
      })
      console.log(singleton.show())

      computedDropdown()
    })

    return () => {
      // 输入框内容
      const selectInner = computed(() =>
        isSlect.value
          ? html`
              <ul>
                ${repeat(
                  props.selectValue,
                  (val: any) =>
                    html`<li
                      class="ok-select-selection__choice"
                      value=${val.value}
                    >
                      <div class="ok-select-selection__choice__content">
                        ${val.label}
                      </div>
                      <span
                        @click=${() => onToggleSelect(val)}
                        class="ok-select-selection__choice__remove"
                      >
                        <i>+</i>
                      </span>
                    </li>`
                )}
                <li class="ok-select-search ok-select-search--inline">
                  <div class="ok-select-search__field__wrap">
                    <input
                      ref="searchInput"
                      @input=${searchTextChange}
                      @blur=${onSearchInputBlur}
                      autocomplete="off"
                      class="ok-select-search__field"
                    />
                    <span
                      ref="inputWidth"
                      class="ok-select-search__field__mirror"
                      >${searchText.value}&nbsp;</span
                    >
                  </div>
                </li>
              </ul>
            `
          : html`<div class="ok-select-selection__placeholder">
              Please select
            </div>`
      )

      return html`
        <style>
          ${tippyCSS + selectCSS}
        </style>
        <div
          id="parent"
          ref="reference"
          aria-expanded="false"
          class="ok-select"
          @click=${onClickSelect}
        >
          <div class="ok-select-selection ok-select-selection--multiple">
            <div class="ok-select-selection__rendered">
              ${selectInner.value}
            </div>
          </div>

          <div ref="tooltip">
            <!-- 下拉选 -->
            <ul class="ok-select-dropdown">
              ${repeat(
                selectOptions.value,
                (val: any) =>
                  html`<li
                    class="ok-select-dropdown-item"
                    @click=${() => onToggleSelect(val)}
                    value=${val.value}
                  >
                    <ok-person
                      ref="ok-person"
                      class="ok-person"
                      size="middle"
                      .person=${{ ...val, name: val.label }}
                    ></ok-person>
                    <ok-person-card
                      class="ok-person-card"
                      ref="ok-person-card"
                    ></ok-person-card>
                  </li>`
              )}
            </ul>
          </div>
        </div>
      `
    }
  }
)
