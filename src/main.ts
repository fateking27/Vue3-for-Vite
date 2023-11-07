import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import {createPinia} from "pinia"
import i18n from "@/lang"
const pinia = createPinia()

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(pinia)
app.use(i18n)
app.mount("#app");
