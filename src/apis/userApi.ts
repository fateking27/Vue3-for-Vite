import axios from '@/utils/axiosUtils'

export const findAllUser = ()=>{
    return axios.get("/users/getAccountList2")
}