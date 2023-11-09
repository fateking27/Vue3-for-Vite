<template>
  <div class="common-layout">
    
    <el-container style="background-color: #545c64;">
      <el-aside width='170px' style="background-color: #545c64; height: 100vh;transition: width 0.3s ease;"  :class="{actionWidth:isAction}">
        <el-scrollbar>
          <MyMenus ref="RefChild"></MyMenus>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header style="position: fixed;background-color: white;width: 100vw;z-index: 9;">
          <el-icon size="25" @click="isShow_"><Fold /></el-icon>
        </el-header>
        <el-main style="background-color: rgb(222, 226, 228);margin-top: 60px;height: 90vh;">
          <router-view></router-view>
          <div style="width: 200px;margin: 0 auto;padding: 30px;">Copyright  2023 admin</div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { Fold } from "@element-plus/icons-vue";


const RefChild = ref()
const isAction = ref<boolean>(false)
const isShow_ = () => {
  //调用子组件方法
  RefChild.value.isShow()
  isAction.value = !isAction.value
}

</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}

.actionWidth{
  width: 65px;
}
</style>
