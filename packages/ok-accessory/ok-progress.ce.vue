<template>
  <link rel="stylesheet" href="https://fe-resource.baiteda.com/lib/byteluck/byteluck.theme.blue.ant.css?t=1632896784891%22">
  <div
    ref="okProcess"
    class="ok-process-warp"
    :class="{
      'ok-process-warp': true,
      fail: status === 'fail',
    }"
  >
  <div class="ok-progress-bar__outer" style="width: 100%; height: 2px;">
    <div
      class="ok-progress-bar__inner"
      :style="{ width: percentageParse, height: '100%' }"
    ></div>
  </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, PropType, ref, effect} from 'vue';
import { COMMON_CSS_PATH } from '../path.config';
import type { UploadStatus } from './upload.type';

export default defineComponent({
  props: {
    percentage: {
      type: Number as unknown as PropType<number>,
      default: 0,
      required: true,
      validator: (val: number | unknown): boolean =>
        (val as Number) >= 0 && (val as Number) <= 100,
    },
    status: {
      type: String as unknown as PropType<UploadStatus>,
    },
  },
  setup(props) {
    const percentageParse = ref('')
    effect(() => {
      let p = props.percentage || 0
      percentageParse.value = `${parseInt( typeof p === 'number' ? p.toFixed() : p, 10)}%`
    })
    return {
      percentageParse
    }
  }
})
</script>
<style lang="less">
  @import url("../assets/styles/common.less");
</style>
