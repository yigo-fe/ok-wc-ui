<template>
  <span ref="okPersonTrigger" class="ok-person-cell ok-person-cell-root">
    <slot>
      <ok-avatar
        .personInfo="personInfo"
        .size="size"
        .width="width"
        .height="height"
        .avatarStyle="avatarStyle"
      ></ok-avatar>
    </slot>
  </span>
  <div
    ref="personCard"
  >
    <ok-person-card
      .personInfo="personInfo"
      .toOpenId="toOpenId"
      .isAwaken="isAwaken"
      .deptList="deptList"
      .statusType="statusType"
    ></ok-person-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, ref, onMounted, onUnmounted } from "vue";
// import okAvatar from "../ok-avatar/index.ce.vue";
// import okPersonCard from "../ok-person-card/index.vue"
import defineProps from './props'
import { apiInitPersoncard } from '../services/api'
import { hideAll } from 'tippy.js'
import { setPopover } from '../utils'
import okAvatar from '../ok-avatar/index.ce.vue'
export default defineComponent({
  props: defineProps,
  components: {
    "ok-avatar": okAvatar,
    // "ok-person-card": okPersonCard,
    //     // 'ok-person-ant': okPersonAnt,
  },
  setup(props, contxt) {
    const api = apiInitPersoncard();
    const toOpenId: any = ref("");
    const isAwaken = ref(false);
    const deptList: any = ref([]);
    const statusType: any = ref("");
    const isSelf = ref(false);
    const isMounted = ref(false);
    const okPersonTrigger = ref()
    const personCard = ref()

    watch(
      () => props.personInfo,
      () => {
        toOpenId.value = "";
        isAwaken.value = false;
        deptList.value = [];
        statusType.value = "";
        isSelf.value = false;
      },
      {
        deep: true,
        immediate: true,
      }
    );

    const checkLardShow = async (id: string) => {
      let result: any = null;
      if (props.propsGetInfoByEmpId) {
        result = await props.propsGetInfoByEmpId(id);
      } else {
        result = await api.default.GetInfoByEmpIdUserPrivateV1POST({
          payload: { emp_id: id },
        });
      }

      if (result.code === "000000") {
        // 记录打开的是否为自己的卡片。判断依据：没有to_open_id字段则为自己
        isSelf.value = Object.keys(result.data).indexOf("to_open_id") === -1;
        const fromOpenId = result.data.from_open_id;
        toOpenId.value = result.data.to_open_id;
        isAwaken.value = Boolean(fromOpenId && toOpenId.value);
        deptList.value = result.data.dept_resp_vo_list;
        statusType.value = result.data.status_type;
      }
    };

    const onTrigger = () => {
      if (toOpenId.value || isSelf.value) return;
      const personInfo: any = props.personInfo;
      const id =
        personInfo.employee_id ||
        personInfo.user_id ||
        personInfo.id ||
        personInfo.employee_number;

      id && checkLardShow(id);
    };

    // SHOW 之前的钩子
    const onShow = () => {
      // 解决popover没有渲染完成，组件已被卸载，造成定位到左上角的问题
      if (!isMounted.value) return false;
      // 隐藏之前的Popper，解决person-group中可能同时出现两个Popper的问题
      props.hidePopper &&
        hideAll({
          exclude: okPersonTrigger.value as HTMLElement,
          duration: 0,
        });
    };

    onUnmounted(() => {
      isMounted.value = false;
      // 关闭所有卡片
      hideAll();
    });

    onMounted(() => {
      isMounted.value = true;
      setPopover(
        okPersonTrigger.value as HTMLElement,
        personCard.value as HTMLElement,
        {
          appendTo: document.body,
          popperOptions: {
            strategy: "fixed",
            modifiers: [
              {
                name: "preventOverflow",
                options: {
                  mainAxis: false, // true by default
                },
              },
            ],
          },
          onTrigger: onTrigger,
          onShow: onShow,
          delay: [300, 0],
        }
      );
    });

    return {
        okPersonTrigger,
        personCard,
        toOpenId,
        isAwaken,
        deptList,
        statusType,
    }
  },
});
</script>
