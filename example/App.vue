<template>
  <ok-person-cell :persons="personsInfo.persons" name="123"></ok-person-cell>
</template>

<script>
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    const personsInfo = reactive({
      persons: [
        { name: 'zhangsan', id: 1 },
        { name: 'wangwu', id: 2 },
      ],
    })

    return {
      personsInfo,
    }
  },
})
</script>

<style lang="less">
.ok-person-cell {
  background-color: #279;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
