import {
  defineComponent,
  html,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
} from 'ok-lit'

// defineComponent('ok-person-detail',{
//   msg: {
//     type: String,
//     default: '',
//   },
//   data: {
//     type: Object,
//     default: {},
//   }
// } , (_props, context) => {
//   const state = reactive({ count: 0 })
//   const increase = () => {
//     state.count++
//     context.emit('increase', state.count)
//   }
//   onMounted(() => {
//     console.log('child mounted')
//   })

//   onUpdated(() => {
//     console.log('child updated')
//   })

//   onUnmounted(() => {
//     console.log('html child unmounted')
//   })

//   return (msg: string, data: any) => html`
//     <p>${msg}</p>
//     <p>X: ${data?.text}</p>
//     <p></p>
//     <p>${state.count}</p>
//     <button @click=${increase}>increase</button>
//   `
// })
