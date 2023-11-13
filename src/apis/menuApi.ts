import axios from "@/utils/axiosUtils";

export const getMenu = (data?: any) => {
  return axios.get("/menu", { params: data });
};

export const addMenu = (data: any) => {
  return axios.post("/menu", data);
};

export const delMenu = ({ id }: any) => {
  return axios.delete(`/menu/${id}`);
};

export const editMenu = (data: any) => {
  return axios.put("/menu", data);
};
