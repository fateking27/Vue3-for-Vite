<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header" style="flex-wrap: wrap">
        <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
          >用户名：</span
        >
        <el-input
          v-model="state.username"
          class="w-50 m-2"
          placeholder="Pick a date"
          :prefix-icon="Search"
        />
        <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
          >部门：</span
        >
        <el-input
          v-model="state.deptName"
          class="w-50 m-2"
          placeholder="Type something"
          :prefix-icon="Search"
        />

        <div style="width: 300px">
          <el-button @click="getUsersByName" type="primary">查询</el-button>
          <el-button @click="getUsers">重置</el-button>
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
    <el-table
      ref="multipleTableRef"
      :data="state.tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="username" label="用户名" align="center" />
      <el-table-column label="性别" align="center">
        <template #default="scope">
          <div>
            <span v-if="scope.row.ssex !== null" style="margin-left: 10px">{{
              scope.row.ssex == "0"
                ? "男"
                : scope.row.ssex == "2"
                ? "保密"
                : "女"
            }}</span>
            <span v-else style="margin-left: 10px"></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" />
      <el-table-column prop="deptName" label="部门" align="center" />
      <el-table-column prop="mobile" label="电话" align="center" />
      <el-table-column label="状态" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.status !== '0'">有效</el-tag>
          <el-tag v-else type="danger">锁定</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" />
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
            <el-icon color="#409EFC" @click="view(scope.row)"><View /></el-icon>
          </div>
        </template>
      </el-table-column>
    </el-table>

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

  <el-dialog
    v-model="centerDialogVisible"
    title="用户信息"
    width="50%"
    align-center
  >
    <div class="content" style="display: flex; justify-content: space-around">
      <div class="image">
        <el-image
          style="width: 100px; height: 100px"
          :src="
            'http://xawn.x3322.net:8002/distremote/static/avatar/' +
            userMsg.avatar
          "
        ></el-image>
      </div>
      <div class="msg m1">
        <div>
          <el-icon><User /></el-icon>
          <span>账户：{{ userMsg.username }}</span>
        </div>
        <div>
          <el-icon><House /></el-icon>
          <span
            >部门：{{
              userMsg.deptName ? userMsg.deptName : "暂无部门信息"
            }}</span
          >
        </div>
        <div>
          <el-icon><Star /></el-icon>
          <span>角色：{{ userMsg.roleName }}</span>
        </div>
        <div>
          <el-icon><Male /></el-icon>
          <span
            >性别：{{
              userMsg.ssex == "0" ? "男" : userMsg.ssex == "2" ? "保密" : "女"
            }}</span
          >
        </div>
        <div>
          <el-icon><Message /></el-icon>
          <span>邮箱：{{ userMsg.email }}</span>
        </div>
      </div>
      <div class="msg m2">
        <div>
          <el-icon><Phone /></el-icon>
          <span>电话：{{ userMsg.mobile }}</span>
        </div>
        <div>
          <el-icon><Orange /></el-icon>
          <span
            >状态： <el-tag v-if="userMsg.status !== '0'">有效</el-tag>
            <el-tag v-else type="danger">锁定</el-tag></span
          >
        </div>
        <div>
          <el-icon><Clock /></el-icon>
          <span>创建时间：{{ userMsg.createTime }}</span>
        </div>
        <div>
          <el-icon><Clock /></el-icon>
          <span>最近登录：{{ userMsg.lastLoginTime }}</span>
        </div>
        <div>
          <el-icon><ChatDotRound /></el-icon>
          <span>描述：{{ userMsg.description }}</span>
        </div>
      </div>
    </div>
  </el-dialog>

  <UserAdd ref="RefChild" @getUser="getUsers"></UserAdd>
</template>

<script lang="ts" setup>
import {
  Setting,
  View,
  Search,
  User,
  Star,
  Male,
  Phone,
  Clock,
  ChatDotRound,
  Message,
  House,
  Orange,
} from "@element-plus/icons-vue";
import { ElTable } from "element-plus";
import { getAllUsers } from "@/apis/userApi";
import { exportExcel } from "@/utils/excel";

const RefChild = ref();
const isShow_ = async (data: any) => {
  if (data.username) {
    RefChild.value.title = "修改用户";
    //调用子组件方法
    RefChild.value.userData.username = data.username;
    //异步调用子组件方法
    await RefChild.value.getuserMsg({ username: data.username });
    RefChild.value.drawer2 = true;
  } else {
    //调用子组件方法
    RefChild.value.drawer2 = true;
    RefChild.value.title = "新增用户";
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
  username: "",
  deptName: "",
});

// onMounted(() => {
//   getUsers();
// });

const columns: any = [
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
    align: "center",
  },
  {
    title: "部门",
    dataIndex: "deptName",
    key: "deptName",
    align: "center",
  },
  {
    title: "电话",
    dataIndex: "mobile",
    key: "mobile",
    align: "center",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
    align: "center",
  },
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
    align: "center",
  },
  {
    title: "权限",
    key: "roleName",
    dataIndex: "roleName",
    align: "center",
  },
  {
    title: "操作",
    key: "action",
    align: "center",
  },
];

const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
  // console.log(multipleSelection.value)
};

const getUsers = async () => {
  const res: any = await getAllUsers(pageData);
  console.log(res);
  state.tableData = res.data.rows;
  state.total = res.data.total;
  state.username = "";
};
const getUsersByName = async () => {
  const res: any = await getAllUsers({ username: state.username });
  console.log(res);
  state.tableData = res.data.rows;
  state.total = res.data.total;
};

watchEffect(() => {
  if (!state.username) {
    getUsers();
  }
});

const centerDialogVisible = ref(false);
let userMsg = reactive({});
const view = (scope: any) => {
  console.log(scope);
  userMsg = scope;
  centerDialogVisible.value = true;
};
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
.msg {
  /* background-color: aqua; */
  > div {
    padding: 5px 0;
    display: flex;
  }
  .el-icon {
    padding-right: 10px;
    font-size: 18px;
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
