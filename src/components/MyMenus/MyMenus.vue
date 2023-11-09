<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="1"
        mode="vertical"
        :collapse="status"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        style="border: none"
        :router="true"
      >
        <div style="margin-left: 15px; padding-top: 10px">
          <el-image
            class="logo"
            src="http://xawn.x3322.net:8002/distremote/static/img/logo.png"
          ></el-image>
          <span v-if="!status" style="margin-left: 10px" class="mb-2"
            >赤兔养车</span
          >
        </div>

        <template v-for="item in userStoreData.userMenus">
          <el-menu-item v-if="!item.children" :index="item.path">
            <el-icon><location /></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
          <el-sub-menu v-else :index="item.path">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="item2 in item.children" :index="item2.path">{{
              item2.name
            }}</el-menu-item>
          </el-sub-menu>
        </template>
        
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Menu as IconMenu, Location } from "@element-plus/icons-vue";
import { userStore } from "@/store/userStore";
import { getMenus } from "@/apis/userApi";

// const menus = ref([]);
const status = ref<boolean>(false);
const userStoreData = userStore();

//获取侧边栏菜单
const getMenu = async () => {
  // let username = localStorage.username;

  const res = await getMenus(userStoreData.username);
  userStoreData.userMenus = res.data[0].children;
  // menus.value = userStoreData.userMenus;

  console.log(userStoreData.userMenus);
};
getMenu();

const isShow = () => {
  status.value = !status.value;
};

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

//暴露
defineExpose({
  isShow,
});
</script>

<style lang="scss" scoped></style>
