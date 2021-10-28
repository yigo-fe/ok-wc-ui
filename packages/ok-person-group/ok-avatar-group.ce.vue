<template>
  <div class="ok-person-group-wrap">
    <ok-avatar
      v-for="(item, index) in showList"
      :key="item.employee_id"
      class="avatar-list"
      style="width: auto; height: auto"
      .avatarStyle="avatarStyle"
      .personInfo="item"
      .size="size"
      .width="width"
      .height="height"
      .count="index == 3 ? count : 0"
      .textStyle="index == 3 ? textStyle : {}"
    ></ok-avatar>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue"
import okAvatar from '../ok-avatar/index.ce.vue'
export default defineComponent({
  props: {
    size: {
      // 默认尺寸
      type: String as unknown as PropType<string>,
      default: "small",
    },
    width: {
      // 自定义宽度
      type: String as unknown as PropType<string>,
      default: "",
    },
    height: {
      // 自定义高度
      type: String as unknown as PropType<string>,
      default: "",
    },
    personList: {
      type: Array as unknown as PropType<any[]>,
      default: () => {
        return [];
      },
    },
  },
  components: {
    "ok-avatar": okAvatar,
  },
  setup(props) {
    const size = computed(() => props.size);
    const height = computed(() => props.height);
    const width = computed(() => props.width);

    const count = computed(() => {
      return Array.isArray(props.personList) ? props.personList.length : 0;
    });
    const showList = computed(() => {
      return props.personList?.slice(0, 4);
    });

    const avatarStyle = {
      "box-sizing": "border-box",
      border: "1px solid #fff",
    };
    const textStyle = {
      color: "var(--bl-n900-c, #1F2329)",
      "font-family": "PingFang SC",
      "font-size": "16px",
    };

    return {
      showList,
      avatarStyle,
      size,
      height,
      width,
      count,
      textStyle,
    };
  },
});
</script>
<style lang="less">
  @import '../assets/styles/common.less';
</style>
