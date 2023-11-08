import axios from "@/utils/axiosUtils";

interface UserItem {
  username: string;
  password?: string;
}

export const findAllUser = (data: UserItem) => {
  return axios.post("/login", data);
};

export const getMenus = (username: string) => {
  return axios.get("/menu/"+ username);
};
