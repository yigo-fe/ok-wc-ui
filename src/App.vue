
<template>
  <h3>ok-avatar</h3>
  <ok-avatar .person-info="personList2[1]"></ok-avatar>
  <h3>ok-person-cell</h3>
  <ok-person-cell .person-info="personList2[1]"></ok-person-cell>
  <h3>ok-person-group</h3>
  <ok-person-group .personList="personList2"></ok-person-group>
</template>
<script setup lang="ts">
  const personList2 = [
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
</style>
