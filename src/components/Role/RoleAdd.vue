<template>
  <el-drawer v-model="drawer2" :direction="direction" size="600">
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <template #default>
      <el-form :model="form">
        <el-form-item label="角色名称：" prop="rolename">
          <el-input v-model="form.roleName" />
        </el-form-item>
        <el-form-item label="权限：">
          <el-tree
            ref="treeRef"
            :data="data"
            :default-checked-keys="form.menuId"
            :default-expanded-keys="form.menuId"
            node-key="key"
            :props="defaultProps"
            show-checkbox
            highlight-current
            @check="handleCheckChange"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="AddOrEdit">提交</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
const drawer2 = ref(false);
const direction = ref("rtl");
import { ElTree } from 'element-plus'
import { getMenu } from "@/apis/menuApi";
import { addRole, getRoleById, updataRole } from "@/apis/roleApi";
const myEmit = defineEmits(["getRole"]);
onMounted(() => {
  getMenus();
});

let title = ref("新增角色");
const form = ref({
  roleName: "",
  menuId: [],
  roleId: "",
});

const treeRef = ref()

const addrole = async () => {
  const res = await addRole({
    roleName: form.value.roleName,
    remark:"2333",
    menuId: form.value.menuId.toString(),
  });
  if (res.status == 200) {
    drawer2.value = false;
    myEmit("getRole");
  }
  console.log(res);
};

const upDataRole = async () => {
  const res = await updataRole({
    roleName: form.value.roleName,
    menuId: form.value.menuId.toString(),
    roleId: form.value.roleId.toString(),
  });
  console.log(res);
  if (res.status == 200) {
    myEmit("getRole");
    drawer2.value = false;
    form.value = {
      roleName: "",
      menuId: [],
      roleId: "",
    };
  }
};

const AddOrEdit = () => {
  if (title.value == "新增角色") {
    addrole();
  } else if (title.value == "修改角色") {
    upDataRole();
  }
};

const setCheckedKeys = (data:any) => {
  // treeRef.value.setCheckedKeys(data, false)
  console.log(treeRef.value)
}

const getRoleMsg = async (role: any) => {
  // if (!user.username) {
  console.log(role);
  const res = await getRoleById(role.roleId);
  console.log(res);

  setCheckedKeys(res.data)

  form.value = {
    roleName: role.roleName,
    menuId: res.data,
    roleId: role.roleId,
  };
};

const handleCheckChange = (data: Tree, checked: boolean) => {
  console.log(data, checked.checkedKeys.toString());
  form.value.menuId = checked.checkedKeys;
  console.log(form.value.menuId.toString());
};

interface Tree {
  title: string;
  children?: Tree[];
}

const data: Tree[] = ref([]);
const getMenus = async () => {
  const res = await getMenu();
  console.log(res.data.rows.children);
  data.value = res.data.rows.children;
};
const defaultProps = {
  children: "children",
  label: "title",
};

function cancelClick() {
  drawer2.value = false;
  form.value = {
    roleName: "",
    menuId: [],
    roleId:''
  };
  console.log(form.value);
}

watchEffect(() => {});

//暴露需要传递方法
defineExpose({
  drawer2,
  title,
  getRoleMsg,
  form,
});
</script>

<style lang="scss" scoped></style>
