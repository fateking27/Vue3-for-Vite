import axios from "axios";

console.log(import.meta.env);

const newAxios = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 3000
})

newAxios.interceptors.request.use((req) => {
    // 配置前端发给后端的数据格式
    req.headers["Content-Type"] = 'application/x-www-form-urlencoded';
    const token = localStorage.token
    if (token) {
        req.headers.Authentication = token
    }

    return req;
})

export default newAxios