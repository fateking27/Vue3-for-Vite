import { withDirectives } from 'vue';
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
        :router='true'
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

        <el-menu-item index="/home">
          <el-icon><location /></el-icon>
          <span>系统主页</span>
        </el-menu-item>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/user">用户管理</el-menu-item>
            <el-menu-item index="4-2">item two</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-menu-item index="3">
          <el-icon><setting /></el-icon>
          <span>系统监控</span>
        </el-menu-item>

        <el-sub-menu index="4">
          <template #title>
            <el-icon><location /></el-icon>
            <span>订单管理</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="4-1">item one</el-menu-item>
            <el-menu-item index="4-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="4-3">item three</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue";
const status = ref<boolean>(false);

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
