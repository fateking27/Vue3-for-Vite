import axios from "axios";

console.log(import.meta.env);

const newAxios = axios.create({
    baseURL:import.meta.env.VITE_APP_BASE_URL,
    timeout:5000
})

export default newAxios