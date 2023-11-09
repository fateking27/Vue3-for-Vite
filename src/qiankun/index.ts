/**
 * apps里面存放的就是子应用
 */
const apps: any = [];
import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  start,
} from "qiankun";
/**
 * 注册微应用
 */
registerMicroApps(apps, {
  // qiankun 生命周期钩子 - 微应用加载前
  beforeLoad: (app) => {
    console.log("before load", app.name);
    return Promise.resolve();
  },
  // qiankun 生命周期钩子 - 微应用挂载后
  afterMount: (app) => {
    console.log("after mount", app.name);
    return Promise.resolve();
  },
});
/**
 * 处理全局异常：子应用可能出现加载失败
 */
addGlobalUncaughtErrorHandler((event) => {
  console.error(event);
  const { message: msg } = event;
  // 加载失败时提示
  if (msg && msg.includes("died in status LOADING_SOURCE_CODE")) {
    alert("子应用加载失败");
  }
});
export default start;
