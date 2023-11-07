<template>
  <div class="common-layout">
    <el-container>
      <el-aside width='170px' style="background-color: #545c64; height: 100vh;transition: width 0.3s ease;"  :class="{actionWidth:isAction}">
        <el-scrollbar>
          <MyMenus ref="RefChild"></MyMenus>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header style="">
          <el-icon size="25" @click="isShow_"><Fold /></el-icon>
        </el-header>
        <el-main style="background-color: rgb(94, 166, 194)">
          <router-view></router-view>
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
