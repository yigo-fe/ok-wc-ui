// import './ok-person-cell.module.css's

import { defineComponent, html, onMounted, onUpdated, reactive } from 'ok-lit'
import { classMap } from 'lit-html/directives/class-map'

defineComponent(
  'ok-person-cell',
  {
    persons: {
      type: Array,
      default: [],
      required: true,
    },
  },
  (props, context) => {
    const state = reactive({
      text: 'hello',
      show: true,
      childData: {
        text: 'hola',
      },
    })
    const toggle = () => {
      state.show = !state.show
    }

    const onInput = (e: { target: { value: string } }) => {
      state.text = e.target.value
    }

    const onIncrease = (e: { detail: any }) => {
      console.log('child increase', e.detail)
    }

    onMounted(() => {
      console.log(context.$refs)
      console.log(props, 'props')
    })

    onUpdated(() => {
      console.log(context.$refs)
    })

    const mountedCallback = () => {
      console.log('child mounted in parent', '此时并拿不到$refs.myChild')
    }

    const okPersonCellClass = { okpersoncell: true }

    return () =>
      html`
        <div class="${classMap(okPersonCellClass)}"></div>
        <button @click=${toggle}>toggle child</button>
        <p>${state.text} <input value=${state.text} @input=${onInput} /></p>
        <p v-show="${state.show}">style display v-show</p>
        <p ref="p">A: ${state.childData.text}</p>
        ${state.show
          ? html`<ok-person-detail
              @hook:mounted="${mountedCallback}"
              ref="myChild"
              msg=${state.text}
              .data=${state.childData}
              @increase="${onIncrease}"
            ></ok-person-detail>`
          : ``}
      `

    // 在defineComponent里边使用子组件传参时，使用.可以直接传入对象
  }
)
