<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header" style="flex-wrap: wrap">
        <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
          >角色：</span
        >
        <el-input
          class="w-50 m-2"
          placeholder="Pick a date"
          :prefix-icon="Search"
        />
        <span
          style="padding-left: 20px"
          class="ml-3 w-35 text-gray-600 inline-flex items-center"
          >创建时间：</span
        >
        <el-date-picker
          type="datetimerange"
          start-placeholder="Start date"
          end-placeholder="End date"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY/MM/DD ddd"
          time-format="A hh:mm:ss"
          style="width: 250px"
        />

        <div style="width: 300px; padding-left: 20px">
          <el-button @click="searchRoles" type="primary">查询</el-button>
          <el-button @click="getroles">重置</el-button>
        </div>
      </div>

      <div class="operation">
        <el-button @click="add">新增</el-button>
        <el-button @click="deleteMenu">删除</el-button>
        <div class="select">
          <el-select class="m-2" placeholder="更多操作">
            <el-option label="导出Excel" value="2" />
          </el-select>
        </div>
      </div>
    </template>

    <el-table
      :data="menuTableData"
      style="width: 100%; text-align: center"
      @selection-change="handleSelectionChange"
      :row-style="{ height: '80px' }"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'false' }"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="title" label="名称" width="150" />
      <el-table-column property="icon" label="图标" width="120">
        <template #default="scope">
          <el-icon :icon="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column property="type" label="类型" width="120">
        <template #default="scope">
          <el-tag v-if="scope.row.type == 0">菜单</el-tag>
          <el-tag type="danger" v-else-if="scope.row.type == 1">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column property="path" label="地址" width="120" />
      <el-table-column property="component" label="Vue组件" width="120" />
      <el-table-column property="name" label="权限" width="120" />
      <el-table-column property="order" label="排序" width="120" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-icon style="margin-right: 10px" @click="edit(scope.row)">
            <Setting />
          </el-icon>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- 编辑抽屉 -->
  <el-drawer v-model="drawer" direction="rtl">
    <template #header>
      <h4>修改角色</h4>
    </template>
    <template #default>
      <div>
        <el-form
          ref="ruleFormRef"
          label-position="right"
          size="large"
          :model="drawerFrom"
          :rules="rules"
          label-width="80px"
          class="demo-ruleForm"
          :default-expand-all="isExpand"
        >
          <el-form-item label="菜单名称:" prop="user">
            <el-input v-model.number="drawerFrom.menuName" />
          </el-form-item>
          <el-form-item label="菜单URL:" prop="user">
            <el-input v-model.number="drawerFrom.path" />
          </el-form-item>
          <el-form-item label="组件地址:" prop="user">
            <el-input v-model.number="drawerFrom.component" />
          </el-form-item>
          <el-form-item label="相关权限:" prop="user">
            <el-input v-model.number="drawerFrom.perms" />
          </el-form-item>
          <el-form-item label="菜单图标:" prop="user">
            <el-input
              v-model="drawerFrom.icon"
              placeholder="Please input"
              class="input-with-select"
            >
              <template #append>
                <el-button
                  :icon="Setting"
                  @click="centerDialogVisible = true"
                />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="菜单排序:" prop="user">
            <el-input v-model.number="drawerFrom.orderNum" />
          </el-form-item>
          <el-form-item label="上级菜单:" prop="user">
            <el-tree
              ref="treeRef"
              :props="props"
              :data="options"
              show-checkbox
              node-key="id"
              @check-change="handleCheckChange"
              :check-strictly="true"
            />
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div style="display: flex; justify-content: space-between">
        <div class="select" style="width: 100px">
          <el-select class="m-2" placeholder="更多操作">
            <el-option label="展开所有" value="1" @click="switchNodes(true)" />
            <el-option label="合并所有" value="2" @click="switchNodes(false)" />
            <el-option label="父子关联" value="1" />
            <el-option label="取消关联" value="2" />
          </el-select>
        </div>
        <div class="foot_btns">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >提交</el-button
          >
        </div>
      </div>
    </template>
  </el-drawer>
  <!-- 详情 -->
  <el-dialog v-model="centerDialogVisible" width="60%" align-center>
    <el-tabs class="demo-tabs" :stretch="true">
      <el-tab-pane label="方向性图标" name="1">
        <div class="box">
          <div class="row">
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="知识性图标" name="2">
        <div class="box">
          <div class="row">
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <div class="item">
              <el-icon>
                <Van />
              </el-icon>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="编辑类图标" name="3"> 3 </el-tab-pane>
      <el-tab-pane label="网站通用图标" name="4"> 4 </el-tab-pane>
      <el-tab-pane label="品牌和标识" name="5"> 5 </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>
<script setup lang="ts">
import { Setting } from "@element-plus/icons-vue";
import { ElMessageBox, FormInstance, FormRules } from "element-plus";
import { getMenu, addMenu, delMenu, editMenu } from "@/apis/menuApi";

/**
 * data
 */
const menuTableData = ref([]);
//表格数据
const options = ref([]);
const selectedData = ref([]); //表格选择数组
//树形控件数据
interface Tree {
  [x: string]: string;
  name: string;
}
const props = {
  label: "label",
  children: "children",
};
const isExpand = ref(false);
const treeRef = ref();
//分页数据
const total = ref(0); //表格总数
const currentPage = ref(1);
const pageSize = ref(10);
//抽屉数据
const operationType = ref("add");
const drawer = ref(false);
const drawerFrom = ref<DrawerForm>({
  menuName: "",
  path: "",
  component: "",
  parentId: "",
  icon: "",
  orderNum: "",
  perms: "",
  type: 0,
});
type DrawerForm = {
  menuName: string;
  path: string;
  component: string;
  parentId?: string;
  icon?: string;
  orderNum?: string;
  perms?: string;
  type: number;
  menuId?: string;
};
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<typeof drawerFrom>>({});
//dialog详情数据
const centerDialogVisible = ref(false);
/**
 *
 */
const handleSelectionChange = (val: any) => {
  selectedData.value = val;
};
/**
 * 分页
 */
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getMenuList();
};
const handleCurrentChange = () => {
  getMenuList();
};
/**
 * 抽屉
 */
function cancelClick() {
  drawer.value = false;
}
//表单提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (operationType.value === "add") {
        let addObj: DrawerForm = {
          menuName: drawerFrom.value.menuName,
          path: drawerFrom.value.path,
          component: drawerFrom.value.component,
          type: drawerFrom.value.type,
        };
        if (drawerFrom.value.parentId)
          addObj.parentId = drawerFrom.value.parentId;
        if (drawerFrom.value.icon) addObj.icon = drawerFrom.value.icon;
        if (drawerFrom.value.orderNum)
          addObj.orderNum = drawerFrom.value.orderNum;
        if (drawerFrom.value.perms) addObj.perms = drawerFrom.value.perms;
        addMenu(addObj).then((res) => {
          console.log("res", res);
          if (res.status === 200) {
            drawer.value = false;
            getMenuList();
            ElMessageBox({
              title: "提示",
              message: "添加成功",
              type: "success",
            });
          }
        });
      } else {
        let addObj: DrawerForm = {
          menuName: drawerFrom.value.menuName,
          path: drawerFrom.value.path,
          component: drawerFrom.value.component,
          type: drawerFrom.value.type,
          menuId: drawerFrom.value.menuId,
        };
        if (drawerFrom.value.parentId)
          addObj.parentId = drawerFrom.value.parentId;
        if (drawerFrom.value.icon) addObj.icon = drawerFrom.value.icon;
        if (drawerFrom.value.orderNum)
          addObj.orderNum = drawerFrom.value.orderNum;
        if (drawerFrom.value.perms) addObj.perms = drawerFrom.value.perms;
        editMenu(addObj).then((res) => {
          console.log("res", res);
          if (res.status === 200) {
            drawer.value = false;
            getMenuList();
            ElMessageBox({
              title: "提示",
              message: "修改成功",
              type: "success",
            });
          }
        });
        console.log("drawerFrom.value", drawerFrom.value);
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
/**
 * 树形控件
 */
const handleCheckChange = (data: Tree, isChecked: boolean) => {
  console.log("data", data);
  if (isChecked) drawerFrom.value.parentId = data.id;
  // const currentKeys = treeRef.value.getCurrentKey()
  // console.log('currentKeys', currentKeys)
  // treeRef.value.setCheckedNodes([data.id])
  // treeRef.value.setCheckedKeys([data.id])
  console.log("drawerFrom.value", drawerFrom.value);
};
const switchNodes = (status: boolean) => {
  console.log("status", status);
  isExpand.value = status;
};
/**
 * 获取表格数据
 */
//获取菜单列表
const getMenuList = async () => {
  const {
    data: {
      rows: { children: menuList },
    },
  } = await getMenu({});
  menuTableData.value = menuList;
  options.value = menuTransForm(menuList);
};
const add = () => {
  operationType.value = "add";
  drawer.value = true;
};
const edit = (row: any) => {
  console.log("row", row);
  operationType.value = "edit";
  drawerFrom.value = {
    menuName: row.title,
    path: row.path,
    component: row.component,
    parentId: row.parentId,
    icon: row.icon,
    orderNum: row.order,
    perms: row.perms,
    type: row.type,
    menuId: row.id,
  };
  // treeRef.value.setCheckedKeys([row.parentId])
  drawer.value = true;
};
//删除角色
const deleteMenu = () => {
  selectedData.value.forEach((item: any) => {
    delMenu({ id: item.id }).then((res) => {
      if (res.status === 200) {
        getMenuList();
      }
    });
  });
  ElMessage.success("删除成功");
};
//获取树形控件option
function menuTransForm(data: any, deptOption: any = []) {
  data.forEach((item: any) => {
    if (item.hasChildren) {
      let arr = { id: Number(item.id), label: item.title, children: [] };
      arr.children = menuTransForm(item.children);
      deptOption.push(arr);
    }
  });
  return deptOption;
}
/**
 * 生命周期
 */
onMounted(() => {
  getMenuList();
});
</script>
<style lang="scss" scoped>
.operation {
  margin-top: 20px;
  width: 280px;
  display: flex;
  justify-content: space-between;

  .select {
    width: 100px;
  }
}

.table {
  margin-top: 20px;

  .pagenation {
    margin-top: 20px;
  }

  // :deep(.el-dialog__header) {
  //     background-color: #141414;
  // }

  .info_img {
    height: 180px;

    img {
      width: 115px;
      height: 115px;
    }
  }

  .box {
    .row {
      margin-bottom: 20px;
      display: flex;

      .item {
        width: 32px;
        height: 32px;
        padding: 3px;
        text-align: center;
        line-height: 32px;
        border: 1px solid #f1f1f1;
        margin-right: 5px;
      }
    }
  }
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  margin: 0 20px;
  margin-top: 20px;
  /* width: 83.5vw; */
  .w-50 {
    width: 300px;
  }
}
.demo-pagination-block {
  /* background-color: aquamarine; */
  width: 660px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
