import axios from "@/utils/axiosUtils";

export const getRoles = (data?: any) => {
  return axios.get("/role", { params: data });
};

export const getRoleById = (data: any) => {
  return axios.get("/role/menu/" + data);
};

export const addRole = (data: any) => {
  return axios.post("/role", data);
};

export const updataRole = (data: any) => {
  return axios.put("/role", data);
};
