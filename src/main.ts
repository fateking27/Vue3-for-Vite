import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import {createPinia} from "pinia"
import i18n from "@/lang"
import piniaPersist from 'pinia-plugin-persist'
import startQuankun from "./qiankun"
import VueEcharts from 'vue-echarts'
import 'echarts'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(pinia)
app.use(i18n)
app.component('ECharts', VueEcharts)
app.mount("#app");

startQuankun()