import axios from "@/utils/axiosUtils";

interface UserItem {
  username: string;
  password?: string;
}
interface getAllUsers {
  pageSize: string;
  pageNum: string;
}

export const findAllUser = (data: UserItem) => {
  return axios.post("/login", data);
};

export const getMenus = (username: string) => {
  return axios.get("/menu/" + username);
};

export const getDept = () => {
  return axios.get("/dept");
};

export const getAllUsers = (data?: any) => {
  return axios.get("/user", { params: data });
};

export const AddUsers = (data: any) => {
  return axios.post("/user", data);
};

export const EditUsers = (data: any) => {
  return axios.put("/user", data);
};
