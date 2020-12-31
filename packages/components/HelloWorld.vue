<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script lang="ts">
import { ref } from 'vue-demi'
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  setup() {
    const count = ref(0)

    return {
      count,
    }
  },
}
</script>

<style lang="less">
.hello {
  color: #000;
}
</style>
