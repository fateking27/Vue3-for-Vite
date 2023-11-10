import axios from "@/utils/axiosUtils";

export const getRoles = (data?: any) => {
    return axios.get("/role", { params: data });
  };