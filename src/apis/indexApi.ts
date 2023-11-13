import axios from "@/utils/axiosUtils";

export const getEcharts = (data?: any) => {
    return axios.get(`/index/${data}`);
  };