import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LayoutVue from "@/views/Layout.vue";
import LoginVue from "@/views/Login.vue";
import HomeVue from "@/views/Home.vue";
import RegisterVue from "@/views/Register.vue";
import UserVue from "@/components/User/User.vue";
import JoinBusinessVue from "@/views/JoinBusiness.vue";
import RoleVue from "@/components/Role/Role.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: LoginVue,
  },
  {
    path: "/register",
    component: RegisterVue,
  },
  {
    path: "/joinBusiness",
    component: JoinBusinessVue,
  },
  {
    path: "/",
    component: LayoutVue,
    children: [
      {
        path: "home",
        component: HomeVue,
      },
      {
        path: "/system/user",
        component: UserVue,
      },
      {
        path: "/system/role",
        component: RoleVue,
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

//全局前置路由守卫
router.beforeEach(async (to) => {
  if (to.path.includes("login")) {
    return true;
  }

  const username = localStorage.username;
  if (!username) {
    return "/login";
  }

  if (to.path == "/") {
    return "/home";
  }
});

export default router;
