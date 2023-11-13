<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header" style="flex-wrap: wrap">
        <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
          >角色：</span
        >
        <el-input
          v-model="state.roleName"
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
          v-model="value2"
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

        <div style="width: 300px; padding-top: 20px">
          <el-button @click="isShow_" type="primary" plain>新增</el-button>
          <el-button>删除</el-button>
          <el-button @click="exportExcel(columns, state.tableData)"
            >导出Excel</el-button
          >
        </div>
      </div>
    </template>

    <!-- 表格 -->
    <el-table
      ref="multipleTableRef"
      :data="state.tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="roleName" label="角色" align="center" />
      <el-table-column prop="remark" label="描述" align="center" width="300" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column prop="modifyTime" label="修改时间" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-around;
              font-size: 18px;
            "
          >
            <el-icon color="#409EFC" @click="isShow_(scope.row)"
              ><Setting
            /></el-icon>
            <!-- <el-icon color="#409EFC" @click=""><View /></el-icon> -->
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="pageData.pageNum"
        v-model:page-size="pageData.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="state.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>

  <RoleAdd ref="RefChild" @getRole="getroles"></RoleAdd>
</template>

<script lang="ts" setup>
import { Setting, View, Search } from "@element-plus/icons-vue";
import { ElTable } from "element-plus";
import { getRoles } from "@/apis/roleApi";
import { exportExcel } from "@/utils/excel";

const RefChild = ref();
const value2 = ref("");
const isShow_ = async (data: any) => {
  console.log(data);
  if (data.roleName) {
    RefChild.value.title = "修改角色";
    //调用子组件方法
    // RefChild.value.userData.username = data.username;
    //异步调用子组件方法
    await RefChild.value.getRoleMsg(data);
    RefChild.value.drawer2 = true;
  } else {
    //调用子组件方法
    RefChild.value.drawer2 = true;
    RefChild.value.title = "新增角色";
  }
};

interface User {
  date: string;
  name: string;
  address: string;
}
const pageData = reactive({
  pageSize: 10,
  pageNum: 1,
});

const state = reactive({
  tableData: [],
  total: 0,
  roleName: "",
});

// onMounted(() => {
//   getUsers();
// });

const columns: any = [
  {
    title: "角色",
    key: "roleName",
  },
  {
    title: "描述",
    key: "remark",
  },
  {
    title: "创建时间",
    key: "createTime",
  },
  {
    title: "修改时间",
    key: "modifyTime",
  },
  {
    title: "操作",
    key: "action",
  },
];

const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
  console.log(multipleSelection.value);
};

const getroles = async () => {
  const res: any = await getRoles(pageData);
  console.log(res);
  state.tableData = res.data.rows;
  state.total = res.data.total;
  state.roleName = "";
  value2.value = "";
};

const searchRoles = async () => {
  const res: any = await getRoles({
    roleName: state.roleName,
    createTimeFrom: value2.value[0],
    createTimeTo: value2.value[1],
  });
  console.log(res);
  console.log(value2.value[0]);
  state.tableData = res.data.rows;
  state.total = res.data.total;
};

watchEffect(() => {
  if (!state.roleName) {
    getroles();
  }
});

const handleSizeChange = (val: number) => {
  pageData.pageSize = val;
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  pageData.pageNum = val;
  console.log(`current page: ${pageData.pageNum}`);
};
</script>

<style scoped>
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
