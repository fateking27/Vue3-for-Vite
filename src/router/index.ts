import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginVue from "@/views/Login.vue";
import HomeVue from "@/views/Home.vue";
import RegisterVue from "@/views/Register.vue";
import UserVue from "@/components/User/User.vue";
import JoinBusinessVue from "@/views/JoinBusiness.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    component: HomeVue,
  },
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
    path: "/system",
    component: HomeVue,
    children: [
      {
        path: "user",
        component: UserVue,
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
