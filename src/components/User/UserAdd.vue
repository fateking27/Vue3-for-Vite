<template>
  <el-drawer v-model="drawer2" :direction="direction" size="600">
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <template #default>
      <el-form
        :model="form"
        label-width="120px"
        ref="ruleFormRef"
        :rules="rules"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="form.password" />
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="手机：" prop="mobile">
          <el-input type="number" v-model="form.mobile" />
        </el-form-item>
        <el-form-item label="角色：" prop="roleId">
          <el-select
            v-model="form.roleId"
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="6"
            style="width: 450px"
          >
            <el-option
              v-for="item in roles_"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门：" prop="deptId">
          <el-select v-model="form.deptId">
            <el-option
              v-for="item in depts_"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="0">锁定</el-radio>
            <el-radio label="1">有效</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="性别：" prop="ssex">
          <el-radio-group v-model="form.ssex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
            <el-radio label="2">保密</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="AddOrEdit(ruleFormRef, form)"
          >提交</el-button
        >
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { getDept, AddUsers, getAllUsers, EditUsers } from "@/apis/userApi";
import { getRoles } from "@/apis/roleApi";

const drawer2 = ref(false);
const userData = ref({ username: "" });
const direction = ref("rtl");
const ruleFormRef = ref<FormInstance>();

const form = ref({
  username: "vGundam",
  password: "1234qwer",
  roleId: [],
  status: "1",
  ssex: "2",
  email: "xxx@gmail.com",
  mobile: "13425672348",
  deptId: "1",
  userId: "",
});

let title = ref("新增用户");

const myEmit = defineEmits(["getUser"]);

const getuserMsg = async (user: any) => {
  // if (!user.username) {
  const res = await getAllUsers(user);
  console.log(res.data.rows[0]);
  form.value = {
    username: res.data.rows[0].username,
    password: "1234qwer",
    roleId: res.data.rows[0].roleId?.split(",").map((num: any) => Number(num)),
    status: res.data.rows[0].status,
    ssex: res.data.rows[0].ssex,
    email: res.data.rows[0].email,
    mobile: res.data.rows[0].mobile,
    deptId: String(res.data.rows[0].deptId),
    userId: res.data.rows[0].userId.toString(),
  };
  // }
};

//表单校验
const rules = reactive<FormRules>({
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 4, max: 20, message: "用户名有效长度4到20个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, max: 14, message: "密码长度须6~14个字符", trigger: "blur" },
  ],
  mobile: [
    { required: true, message: "手机号不能为空", trigger: "blur" },
    { min: 6, max: 14, message: "手机号不合法", trigger: "blur" },
  ],
  status: [{ required: true, message: "状态不能为空", trigger: "change" }],
  roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
  deptId: [{ required: true, message: "请选择部门", trigger: "change" }],
  ssex: [{ required: true, message: "请选择性别", trigger: "change" }],
});

const depts_ = ref([]);
const roles_ = ref([]);

onMounted(() => {
  depts();
  roles();
});

const depts = async () => {
  const res = await getDept();
  console.log(res);
  depts_.value = res.data.rows.children;
  // console.log(depts_.value);
};
const roles = async () => {
  const res = await getRoles();
  // console.log(res);
  roles_.value = res.data.rows;
  // console.log(roles_.value);
};
const addUser = async (formEl: FormInstance | undefined, form: any) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log("submit!", form.roleId.toString());
      const res = AddUsers({
        ...form,
        roleId: form.roleId.toString(),
      });
      console.log(res);

      formEl.clearValidate();
      form = {
        username: "",
        password: "1234qwer",
        roleId: [],
        status: "",
        ssex: "",
        email: "",
        mobile: "",
        deptId: "",
      };
      drawer2.value = false;
    } else {
      console.log("error submit!", fields);
    }
  });
};
const editUser = async (formEl: FormInstance | undefined, form: any) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log("submit!", form.roleId.toString());
      EditUsers({
        ...form,
        roleId: form.roleId.toString(),
      }).then((res) => {
        if (res.status == 200) {
          //调用父组件方法
          myEmit("getUser");

          ElMessage({
            message: "用户修改成功",
            type: "success",
          });
        } else {
          ElMessage({
            message: "用户修改失败",
            type: "warning",
          });
        }

        console.log(res);
      });

      formEl.clearValidate();

      form.value = {
        username: "",
        password: "1234qwer",
        roleId: [],
        status: "",
        ssex: "",
        email: "",
        mobile: "",
        deptId: "",
      };
      drawer2.value = false;
    } else {
      console.log("error submit!", fields);
    }
  });
};

const AddOrEdit = (ruleFormRef: FormInstance | undefined, form: any) => {
  if (title.value == "新增用户") {
    addUser(ruleFormRef, form);
  } else if (title.value == "修改用户") {
    editUser(ruleFormRef, form);
  }
};

function cancelClick(formEl: FormInstance | undefined) {
  formEl.clearValidate();
  form.value = {
    username: "",
    password: "1234qwer",
    roleId: [],
    status: "",
    ssex: "",
    email: "",
    mobile: "",
    deptId: "",
    userId: "",
  };
  drawer2.value = false;
}

watchEffect(() => {});

//暴露需要传递方法
defineExpose({
  drawer2,
  userData,
  form,
  getuserMsg,
  title,
});
</script>

<style lang="scss" scoped></style>
