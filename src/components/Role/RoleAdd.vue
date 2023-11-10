<template>
  <el-drawer v-model="drawer2" :direction="direction" size="600">
    <template #header>
      <h4>新增角色</h4>
    </template>
    <template #default>

    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="addUser(ruleFormRef, form)"
          >提交</el-button
        >
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus";
import { getDept, AddUsers, getAllUsers, EditUsers } from "@/apis/userApi";
import { getRoles } from "@/apis/roleApi";

const drawer2 = ref(false);
const userData = ref({ username: "" });
const direction = ref("rtl");
const ruleFormRef = ref<FormInstance>();

let form = reactive({
  username: "vGundam",
  password: "1234qwer",
  roleId: [1],
  status: "1",
  ssex: "2",
  email: "xxx@gmail.com",
  mobile: "13425672348",
  deptId: "1",
});

const getuserMsg = async (user: any) => {
  // if (!user.username) {
  const res = await getAllUsers(user);
  console.log(user);
  form = {
    username: res.data.rows[0].username,
    password: "1234qwer",
    roleId: res.data.rows[0].roleId?.split(",").map((num: any) => Number(num)),
    status: res.data.rows[0].status,
    ssex: res.data.rows[0].ssex,
    email: res.data.rows[0].email,
    mobile: res.data.rows[0].mobile,
    deptId: res.data.rows[0].deptId?.toString(),
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
  // console.log(res);
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
      const res = AddUsers({ ...form, roleId: form.roleId.toString() });
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
      const res = EditUsers({ ...form, roleId: form.roleId.toString() });
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

function cancelClick(formEl: FormInstance | undefined) {
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
}

watchEffect(() => {});

//暴露需要传递方法
defineExpose({
  drawer2,
  userData,
  form,
  getuserMsg,
});
</script>

<style lang="scss" scoped></style>
