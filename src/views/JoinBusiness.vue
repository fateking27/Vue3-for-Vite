<template>
  <div class="content">
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
      label-position="top"
      :model="ruleForm"
      :rules="rules"
      inline="true"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="商铺类型：" prop="resource">
        <el-radio-group v-model="ruleForm.resource" class="ml-4">
          <el-radio label="充电站" size="large">充电站</el-radio>
          <el-radio label="其他" size="large">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商店名：" prop="name">
        <el-input class="input" v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="手机号：" prop="name">
        <el-input class="input" v-model="ruleForm.phone" />
      </el-form-item>
      <el-form-item label="店铺地址：" prop="name">
        <el-input class="input" v-model="ruleForm.phone" />
      </el-form-item>
      <el-form-item label="注册人：" prop="name">
        <el-input class="input" v-model="ruleForm.phone" />
      </el-form-item>
      <el-form-item label="身份证号：" prop="name">
        <el-input class="input" v-model="ruleForm.phone" />
      </el-form-item>
      <el-form-item label="身份证照片：">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="营业执照编号：" prop="name">
        <el-input class="input" v-model="ruleForm.phone" />
      </el-form-item>
      <el-form-item label="营业执照照片：">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          立即申请
        </el-button>
        <router-link style="padding-left: 50px;" to="/login">使用已有账户登录</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules, UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

const imageUrl = ref("");

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  //   response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

interface RuleForm {
  name: string;
  phone: string;
  resource: string;
  region: string;
  count: string;
  date1: string;
  date2: string;
  delivery: boolean;
  type: string[];
  desc: string;
}

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: "",
  phone: "",
  resource: "充电站",
  region: "",
  count: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  desc: "",
});

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  region: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  count: [
    {
      required: true,
      message: "Please select Activity count",
      trigger: "change",
    },
  ],
  date1: [
    {
      type: "date",
      required: true,
      message: "Please pick a date",
      trigger: "change",
    },
  ],
  date2: [
    {
      type: "date",
      required: true,
      message: "Please pick a time",
      trigger: "change",
    },
  ],
  type: [
    {
      type: "array",
      required: true,
      message: "Please select at least one activity type",
      trigger: "change",
    },
  ],
  resource: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: "change",
    },
  ],
  desc: [
    { required: true, message: "Please input activity form", trigger: "blur" },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang="scss" scoped>
.content {
//   background-color: rgb(248, 240, 165);
  .heard {
    // background-color: blueviolet;
    margin: 0 auto;
    margin-top: 50px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .demo-ruleForm {
    width: 300px;
    // background-color: rgb(245, 245, 241);
    display: flex;
    margin: 0 auto;
    margin-top: 40px;
    flex-wrap: wrap;
    .input{
        width: 250px;
    }
  }
}
</style>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
