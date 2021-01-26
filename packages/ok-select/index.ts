import { Instance, setPopover } from '@c/utils'
import { repeat } from 'lit-html/directives/repeat'
import { computed, defineComponent, html, onMounted, ref } from 'ok-lit'
import { PropType } from 'ok-lit/dist/types/props'
import tippyCSS from 'tippy.js/dist/tippy.css'

import selectCSS from '../assets/ok-select.less'

defineComponent(
  'ok-select',
  {
    multiple: {
      type: Boolean,
      default: true,
    },
    selectValue: {
      type: (Array as unknown) as PropType<any[]>,
      required: true,
      default: [
        {
          label: '一亿元一亿元一亿元一亿元一亿元一亿元一亿元一亿元',
          value: '1',
        },
        {
          label: '二亿元',
          value: '2',
        },
      ],
    },
  },
  (props, context) => {
    let poperInstance: Instance
    // 选项
    const selectOptions = ref([
      {
        label: '一亿元',
        value: '1',
      },
      {
        label: '二亿元',
        value: '2',
      },
      {
        label: '三亿元',
        value: '3',
      },
    ])

    // 是否有选中
    const isSlect = computed(() => !!props.selectValue.length)
    // 搜索文本
    const searchText = ref('')
    const searchTextChange = (event: any) => {
      searchText.value = event.target.value
      // 计算输入框宽度
      const searchInput = context.$refs.searchInput
      const inputWidth = context.$refs.inputWidth
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
      const { searchInput, reference, tooltip } = context.$refs
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
      const { reference, tooltip, searchInput } = context.$refs
      tooltip.style.width = reference.getBoundingClientRect().width + 'px'
      poperInstance = setPopover(searchInput, tooltip, {
        placement: 'bottom',
        arrow: false,
        hideOnClick: false,
        trigger: 'focus',
        duration: 0,
      })
      poperInstance.show()
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
                    ${val.label}
                  </li>`
              )}
            </ul>
          </div>
        </div>
      `
    }
  }
)
