<template>
  <el-card class="box-card">
    <button @click="changeLanguoge">切换英文</button>
    <div class="heard">
      <el-image
        class="logo"
        style="height: 25px"
        src="http://xawn.x3322.net:8002/distremote/static/img/logo.png"
      >
      </el-image>
      <h1>{{$t("login.title")}}</h1>
    </div>

    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      inline
      status-icon
      label-width="70px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('login.name')" prop="name">
        <div></div>
        <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
      </el-form-item>

      <el-form-item :label="$t('login.password')" prop="password">
        <div></div>
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item>
        <el-button class="login" type="primary" @click="login(ruleForm)"
          >{{ $t("login.onlogin") }}</el-button
        >
      </el-form-item>
    </el-form>
    <router-link to="/joinBusiness">{{$t("login.register")}}</router-link>
  </el-card>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import type { FormInstance } from "element-plus";
import {useI18n} from "vue-i18n"
const {t,locale} = useI18n()
const changeLanguoge = ()=>{
  locale.value = "en" 
}

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
