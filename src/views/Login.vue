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
      <h1>{{ $t("login.title") }}</h1>
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
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
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
        <el-button class="login" type="primary" @click="login">{{
          $t("login.onlogin")
        }}</el-button>
      </el-form-item>
    </el-form>
    <router-link to="/joinBusiness">{{ $t("login.register") }}</router-link>
  </el-card>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { useI18n } from "vue-i18n";
import { findAllUser } from "@/apis/userApi";
// import {userStore} from "@/store/userStore"
// const userStoreData = userStore()



const { locale } = useI18n();
const changeLanguoge = () => {
  locale.value = "en";
};

const router = useRouter();

const ruleFormRef = ref<FormInstance>();

const ruleForm: any = reactive({
  username: "bobo",
  password: "1234qwer",
});

//登录
const login = async () => {
  const res = await findAllUser(ruleForm);
  // localStorage.user = JSON.stringify(res.data.user)
  // localStorage.permissions = JSON.stringify(res.data.permissions)
  if (res.status == 200) {
    localStorage.setItem("token", res.data.data.token);
    ElMessage({
      message: res.data.message,
      type: "success",
    });
    localStorage.setItem ('username', res.data.data.user.username)
    router.push("/home");
    console.log(res);
  } else {
    ElMessage({
      message: "认证失败！",
      type: "warning",
    });
  }
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
