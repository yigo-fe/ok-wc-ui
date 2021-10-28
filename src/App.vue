
<template>
  <h3>ok-avatar</h3>
  <!-- <ok-avatar .person-info="personList2[1]"></ok-avatar> -->
  <h3>ok-person-cell</h3>
  <ok-person-cell .person-info="personList2[1]"></ok-person-cell>
  <h3>ok-person-group</h3>
<!--  <ok-person-group .personList="personList2.slice(0, 1)" inline-style="div {color: red}"></ok-person-group>-->
  <h3>ok-employee-select</h3>
  <ok-employee-select multiple="true" mode="tree"></ok-employee-select>
  <h3>ok-department-select</h3>
  <ok-department-select multiple="true" mode="tree"></ok-department-select>
  <h3>ok-tooltip</h3>
  <div style="width: 20px; display: inline-block">
    <ok-tooltip .title="'就难分难舍防溺水你发你水电费那棵树的南方可能是的分开那棵树的烦恼可能是的反馈'">
      <span>复制</span>
    </ok-tooltip>
  </div>
  <div class="item">
    <h3>ok-upload-drag</h3>
    <ok-upload-drag></ok-upload-drag>
  </div>
 <div class="item">
   <h3>ok-file-icon</h3>
   <ok-file-icon></ok-file-icon>
 </div>
  <div class="item">
    <h3>ok-upload-subtable-file</h3>
    <ok-upload-subtable-file></ok-upload-subtable-file>
  </div>
  <div class="item">
    <h3>ok-upload-table</h3>
    <ok-upload-table></ok-upload-table>
  </div>
  <div class="item">
    <h3>ok-upload-subtable-image</h3>
    <ok-upload-subtable-image></ok-upload-subtable-image>
  </div>
  <div class="item">
    <h3>ok-upload-image</h3>
    <ok-upload-image></ok-upload-image>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  const personList2:any = [
    {
      avatar_url: "https://wework.qpic.cn/bizmail/cMLFZrYGchIibX5icVTGibh7b2oELMc9MsJYDiaCNNmTYREjGVRjlsq3mA/0",
      department_id: "30",
      department_name: "前端部",
      email: "fujing@byteluck.com",
      employee_card: "工号",
      employee_en_name: "付静",
      employee_id: "FuJing",
      employee_name: "付静",
      gender: 2,
      msg_relation_type: "WX",
      tenant_id: "test"
    },
    {
      avatar_url: "https://wework.qpic.cn/bizmail/sM006UpbJWqyf5UJrcZ8FibaLTBEPpmn6U2bKFXMOTal6vXDR8cypCQ/0",
      department_id: "30",
      department_name: "前端部",
      email: "chengxudong@byteluck.com",
      employee_card: null,
      employee_en_name: "程旭东",
      employee_id: "ChengXuDong",
      employee_name: "程旭东",
      external_user: false,
      gender: 1,
      msg_relation_type: "WX",
    },
    {
      avatar_url: "https://wework.qpic.cn/bizmail/sM006UpbJWqyf5UJrcZ8FibaLTBEPpmn6U2bKFXMOTal6vXDR8cypCQ/0",
      department_id: "30",
      department_name: "前端部",
      email: "chengxudong@byteluck.com",
      employee_card: null,
      employee_en_name: "程旭东",
      employee_id: "ChengXuDong",
      employee_name: "程旭东",
      external_user: false,
      gender: 1,
      msg_relation_type: "WX",
    },
    {
      avatar_url: "https://wework.qpic.cn/bizmail/sM006UpbJWqyf5UJrcZ8FibaLTBEPpmn6U2bKFXMOTal6vXDR8cypCQ/0",
      department_id: "30",
      department_name: "前端部",
      email: "chengxudong@byteluck.com",
      employee_card: null,
      employee_en_name: "程旭东",
      employee_id: "ChengXuDong",
      employee_name: "程旭东",
      external_user: false,
      gender: 1,
      msg_relation_type: "WX",
    },
  ]
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  .item {
    margin-bottom: 15px;
    margin-top: 15px;
  }
</style>
