<template>
  <div class="common-layout">
    <el-container style="background-color: #545c64">
      <el-aside
        width="170px"
        style="
          background-color: #545c64;
          height: 100vh;
          transition: width 0.3s ease;
        "
        :class="{ actionWidth: isAction }"
      >
        <el-scrollbar>
          <MyMenus ref="RefChild"></MyMenus>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header
          style="
            position: fixed;
            background-color: white;
            width: 100vw;
            z-index: 9;
            display: flex;
            justify-content: space-between;
          "
        >
          <el-icon
            style="
              margin-left: 15px;
              margin-top: 15px;
              color: rgb(174, 176, 177);
            "
            v-if="!isAction"
            size="25"
            @click="isShow_"
            ><Fold
          /></el-icon>
          <el-icon
            style="
              margin-left: 15px;
              margin-top: 15px;
              color: rgb(174, 176, 177);
            "
            v-else
            size="25"
            @click="isShow_"
            ><Expand
          /></el-icon>

          <div
            class="select"
            style="
              margin-right: 200px;
              width: 140px;
              margin-top: 15px;
              display: flex;
              justify-content: space-between;
            "
          >
            <img
              style="width: 35px; height: 35px; border-radius: 50%"
              :src="`http://xawn.x3322.net:8002/distremote/static/avatar/${avatar}`"
              alt=""
            />
            <el-select
              style="width: 90px"
              class="m-2"
              :placeholder="userStoreData.username"
            >
              <el-option @click="outLogin" value=""
                ><span style="padding-left: 15px;">退出登录</span></el-option
              >
            </el-select>
          </div>
        </el-header>
        <el-main
          style="
            background-color: rgb(222, 226, 228);
            margin-top: 60px;
            height: 90vh;
          "
        >
          <!-- router-view渲染当前项目路由 -->
          <router-view v-show="$route.name"></router-view>
          <!-- 加载子应用 -->
          <div v-show="!$route.name" id="container"></div>

          <div style="width: 200px; margin: 0 auto; padding: 30px">
            Copyright 2023 admin
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { Fold, Expand } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { userStore } from "@/store/userStore";

const userStoreData = userStore();

const { avatar } = JSON.parse(localStorage.user);

// const $router = useRouter()
const router = useRouter();

const RefChild = ref();
const isAction = ref<boolean>(false);
const isShow_ = () => {
  //调用子组件方法
  RefChild.value.isShow();
  isAction.value = !isAction.value;
};

const outLogin = () => {
  localStorage.clear();
  router.push("/login");
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}

.actionWidth {
  width: 65px;
}
</style>
