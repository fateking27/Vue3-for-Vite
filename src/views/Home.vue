<template>
  <div></div>
  <el-card class="box-card">
    <div class="countainer">
      <div class="header">
        <div class="users">
          <div class="image">
            <img
              :src="`http://xawn.x3322.net:8002/distremote/static/avatar/${avatar}`"
              alt=""
            />
          </div>
          <div class="name">
            <p class="p1">
              你好,<span>{{ username }}</span
              >{{ description }}
            </p>
            <p class="p2">{{ deptName }}||{{ roleName }}</p>
            <p class="p3">
              上次登录时间:<span>{{ lastLoginTime }}</span>
            </p>
          </div>
        </div>
        <div class="active">
          <div class="a1">
            <p class="p1">今日IP</p>
            <p class="p2">{{ visitDate.todayIp }}</p>
          </div>
          <div class="a1">
            <p class="p1">今日访问</p>
            <p class="p2">{{ visitDate.todayVisitCount }}</p>
          </div>

          <div class="a1">
            <p class="p1">总访问量</p>
            <p class="p2">{{ visitDate.totalVisitCount }}</p>
          </div>
        </div>
      </div>
      <div class="detalibox">
        <div class="left" id="box">
          <ECharts
            class="chart"
            :option="option"
            style="width: 500px; height: 300px"
          ></ECharts>
        </div>
        <div class="right">
          <table>
            <tr class="tr1" colspan="2">
              <td colspan="2" class="td1">
                <p>进行中的项目</p>
                <p class="p2">所有项目</p>
              </td>
            </tr>
            <tr>
              <td>
                <div class="boxs">
                  <div class="yuan">F</div>
                  <div class="text">
                    <p class="p1">RedRabbit-Shiro</p>
                    <p>spring Boot 2.04 & shiro1.4.0权限管理系统</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="boxs">
                  <div class="yuan">F</div>
                  <div class="text">
                    <p class="p1">RedRabbit-Shiro</p>
                    <p>spring Boot 2.04 & shiro1.4.0权限管理系统</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="boxs">
                  <div class="yuan">F</div>
                  <div class="text">
                    <p class="p1">RedRabbit-Shiro</p>
                    <p>spring Boot 2.04 & shiro1.4.0权限管理系统</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="boxs">
                  <div class="yuan">F</div>
                  <div class="text">
                    <p class="p1">RedRabbit-Shiro</p>
                    <p>spring Boot 2.04 & shiro1.4.0权限管理系统</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="boxs">
                  <div class="yuan">F</div>
                  <div class="text">
                    <p class="p1">RedRabbit-Shiro</p>
                    <p>spring Boot 2.04 & shiro1.4.0权限管理系统</p>
                  </div>
                </div>
              </td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </el-card>
  
</template>

<script lang="ts" setup>
import { getEcharts } from "@/apis/indexApi";

//最近七天日期
const senvenDay: any = ref([]);
const xdata = ref([0, 0, 0, 0, 0, 0]);
const xdata1 = ref([0, 0, 0, 0, 0, 0]);
const { username } = JSON.parse(localStorage.user);
const { description, deptName, roleName, lastLoginTime } = JSON.parse(
  localStorage.user
);
const avatar = ref();
avatar.value = JSON.parse(localStorage.user).avatar;

const visitDate = ref({
  lastSevenUserVisitCount: [],
  lastSevenVisitCount: [],
  todayIp: "",
  todayVisitCount: "",
  totalVisitCount: "",
});

const option = ref({
  tooltip: {},

  title: {
    text: "七天访问量",
  },
  xAxis: {
    type: "category",
    data: senvenDay,
  },
  yAxis: {
    type: "value",
  },
  series: [
    { name: "您", data: xdata, type: "bar" },
    { name: "总数", data: xdata1, type: "bar" },
  ],
});
onMounted(() => {
  getUserDatas();
  getRecentlySevenDays();
});

//得到数据
const getUserDatas = async () => {
  const res = await getEcharts(username);
  console.log("浏览数据", res);
  if (res.status == 200) {
    visitDate.value.lastSevenUserVisitCount =
      res.data.data.lastSevenUserVisitCount;
    visitDate.value.lastSevenVisitCount = res.data.data.lastSevenVisitCount;
    visitDate.value.todayIp = res.data.todayIp;
    visitDate.value.todayVisitCount = res.data.data.todayVisitCount;
    visitDate.value.totalVisitCount = res.data.data.totalVisitCount;

    console.log("数据99", visitDate.value.lastSevenUserVisitCount[0].count);
    xdata.value.push(visitDate.value.lastSevenUserVisitCount[0].count);
    xdata1.value.push(visitDate.value.lastSevenVisitCount[0].count);
  }
};
//获取最近七天的日期
function getRecentlySevenDays() {
  const now = Date.now(); //现在时刻的时间戳
  const dayMillionseconds = 24 * 60 * 60 * 1000; //每天的毫秒数
  const res = []; //保存最近七天的日期

  for (let i = 0; i < 7; i++) {
    //对应时间的日期实例对象
    const d = new Date(now - dayMillionseconds * i);
    const mon = d.getMonth() + 1; //获取月份
    const date = d.getDate(); //获取号数
    res.unshift(`${mon}-${date}`);
  }
  senvenDay.value = res;
  console.log(res);
  return res;
}
</script>

<style lang="scss" scoped>

.box-card {
  margin: 0 20px;
  margin-top: 20px;
  /* width: 83.5vw; */
  .w-50 {
    width: 300px;
  }
}
.countainer {
  width: 100%;
  height: 75vh;
  // background-color: aqua;
  // border: 1px solid #ccc;

  .header {
    width: 95%;
    margin: 0 auto;
    height: 150px;
    // background-color: pink;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ccc;

    .users {
      display: flex;
      margin-left: 30px;
      color: rgba(0, 0, 0, 0.65);

      .image {
        img {
          width: 80px;
          height: 80px;
          // background-color: aquamarine;
        }
      }

      .name {
        margin-left: 10px;

        .p1 {
          font-size: 20px;
        }

        .p2 {
          margin: 10px 0px;
        }
      }
    }

    .active {
      height: 100px;
      width: 240px;
      display: flex;
      margin-right: 25px;
      justify-content: space-between;
      color: #818181a8;

      .a1 {
        .p2 {
          margin-top: 20px;
          color: rgb(15, 146, 227);
        }
      }
    }
  }

  .detalibox {
    width: 95%;
    margin: 0 auto;
    margin-top: 15px;
    // background-color: pink;
    height: 320px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    #box {
      width: 49%;
      height: 300px;
      border: 1px solid #ccc;

      .title {
        margin-left: 25px;
        margin-top: 20px;
      }
    }

    .right {
      width: 49%;
      height: 300px;
      border: 1px solid #ccc;

      table {
        width: 100%;
        height: 100%;
        // background-color: chartreuse;
        border-collapse: collapse;
        border-spacing: 1cap;

        tr {
          height: 25%;

          // border: 1px solid #ccc;

          td {
            width: 50%;
            border: 1px solid #ccc;
          }
        }

        .tr1 {
          font-size: 15px;
          line-height: 60px;
        }

        .td1 {
          width: 200%;
          height: 100%;
          display: flex;
          justify-content: space-around;

          p {
            width: 100%;
          }

          .p2 {
            text-align: right;
          }
        }

        .boxs {
          display: flex;
          align-items: center;
          font-size: 10px;
          margin-top: 10px;

          .yuan {
            width: 40px;
            height: 40px;
            border-radius: 50% 50%;
            background-color: #d6f8b8;
            text-align: center;
            line-height: 40px;
            font-size: 30px;
            color: #62a626;
          }

          .text {
            margin-left: 5px;

            .p1 {
              font-size: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
