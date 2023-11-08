import { defineStore } from "pinia";


export const userStore = defineStore("userStore", {
  state: () => {
    return {
      username: "",
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
});
