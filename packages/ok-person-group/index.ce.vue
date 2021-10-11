<template>
  <div v-if="personList.length === 1" class="person-group-single-wrap">
    <ok-person-cell
      .personInfo="personList[0]"
      .size="size"
      .width="width"
      .height="height"
      .propsGetInfoByEmpId="propsGetInfoByEmpId"
      .avatarStyle="avatarStyle"
      style="display: inline-block; vertical-align: middle"
    ></ok-person-cell>
    <span class="single-user-name ellipsis1">{{
      personList[0].employee_name
    }}</span>
  </div>
  <a-popover
    v-else
    :placement="placement"
    overlayClassName="ok-person-group-more"
  >
    <template #content>
      <div class="ok-person-group-list-box">
        <ul class="ok-person-group-popper popper-wraper" :style="contentStyle">
          <li
            v-for="item in personList"
            :key="item.employee_id"
            :style="itemStyle"
            class="popper-item"
          >
            <ok-person-cell
              class="popper-item-avatar"
              .personInfo="item"
              .size="detailSize"
              .width="detailWidth"
              .height="detailHeight"
              .hidePopper="false"
              .avatarStyle="avatarStyleDetail"
              .propsGetInfoByEmpId="propsGetInfoByEmpId"
            ></ok-person-cell>
            <span class="popper-item-name ellipsis1">{{
              item.employee_name
            }}</span>
            <img
              v-if="showDelete"
              :src="closeIcon"
              class="person-item-close-icon"
              @click="deleteItem(item)"
            />
          </li>
        </ul>
      </div>
    </template>

    <ok-avatar-group
      style="display: inline-block; font-size: 0; vertical-align: middle"
      :size="size"
      :width="width"
      :height="height"
      :personList="personList"
    ></ok-avatar-group>
  </a-popover>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { Popover } from "ant-design-vue";
import defineProps from "./props";
import okAvatarGroup from "./ok-avatar-group.ce.vue";
import close from '../assets/images/closed.svg'
export default defineComponent({
  props: defineProps,
  components: {
    "ok-avatar-group": okAvatarGroup,
    "a-popover": Popover,
  },
  setup(props) {
    const detailSize = computed(() => props.detailSize);
    const size = computed(() => props.size);
    const height = computed(() => props.height);
    const width = computed(() => props.width);
    const detailWidth = computed(() => props.detailWidth);
    const detailHeight = computed(() => props.detailHeight);
    const itemStyle = computed(() => props.itemStyle);
    const contentStyle = computed(() => props.contentStyle);
    const showDelete = computed(() => props.showDelete);
    const singleBordered = computed(() => props.singleBordered);
    const propsGetInfoByEmpId = computed(() => props.propsGetInfoByEmpId);
    const closeIcon = close;

    const personList = computed(() => {
      return props.personList || [];
    });
    const count = computed(() => {
      return Array.isArray(props.personList) ? props.personList.length : 0;
    });
    const placement = computed(() => {
      return props.placement;
    });

    const avatarStyle = singleBordered.value
      ? {
          "box-sizing": "border-box",
          border: "1px solid #FAFAFA",
        }
      : {};

    const avatarStyleDetail = {
      "box-sizing": "border-box",
      border: "1px solid #EFF0F1",
    };

    const deleteItem = (item: CustomEvent) => {
      props.deleteItem && props.deleteItem(item.detail);
    };

    return {
      placement,
      avatarStyle,
      size,
      height,
      width,
      detailSize,
      detailWidth,
      detailHeight,
      itemStyle,
      contentStyle,
      propsGetInfoByEmpId,
      closeIcon,
      showDelete,
      deleteItem,
      count,
      personList,
      avatarStyleDetail,
    };
  },
});
</script>
<style lang="less">
  .ok-person-group-wrap {
    display: flex;
    align-items: center;
    overflow: hidden;
    font-size: 14px;
  }
  .ok-person-group-wrap .avatar-list {
    float: left;
  }
  .ok-person-group-wrap .avatar-list + .avatar-list {
    margin-left: -8px;
  }
</style>