import { defineStore } from "pinia";

export const userStore = defineStore("userStore", {
  state: () => {
    return {
      username: "",
      userId: "",
      userMenus: [],
    };
  },
  getters: {
    fullName(state) {
      {
        const newName = state.username.toUpperCase;
        return newName;
      }
    },
  },
  actions: {
    changeUserName(val: string) {
      this.username = val;
    },
  },
  //状态机持久化配置
  persist: {
    enabled: true,
    strategies: [
      { key: "userStore", storage: sessionStorage, paths: ["username","userMenus"] },
    ],
  },
});
