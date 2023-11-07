<template>
  <el-card class="box-card">
    <div class="heard">
      <el-image
        class="logo"
        style="height: 25px"
        src="http://xawn.x3322.net:8002/distremote/static/img/logo.png"
      >
      </el-image>
      <h1>赤兔养车</h1>
    </div>

    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      inline
      status-icon
      label-width="70px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名：" prop="name">
        <div></div>
        <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码：" prop="password">
        <div></div>
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item>
        <el-button class="login" type="primary" @click="login(ruleForm)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
    <router-link to="/joinBusiness">商家入驻</router-link>
  </el-card>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import type { FormInstance } from "element-plus";

const $router = useRouter();


const ruleFormRef = ref<FormInstance>();

const ruleForm: any = reactive({
  name: "",
  password: "",
});

const login = (form: any) => {
  if (!form) return;
  
  $router.push("/home");
  console.log(form.name,form.password);
};
</script>

<style scoped>
.box-card {
  width: 480px;
  height: 300px;
  margin: 0 auto;
  margin-top: 150px;
  display: flex;
  justify-content: center;
  .heard {
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .demo-ruleForm {
    /* background-color: aqua; */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .login {
      width: 265px;
    }
  }
}
</style>
