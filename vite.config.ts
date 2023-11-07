import vue from '@vitejs/plugin-vue'
import { UserConfig, ConfigEnv, loadEnv, defineConfig } from "vite";
//配置路径别名
import path from "path";
const pathSrc = path.resolve(__dirname, "src");
//自动导入插件
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  //加载env配置文件
  const env = loadEnv(mode,process.cwd())
  
  return {
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    plugins: [
      vue(), //官方配置插件，解析*.vue文件
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],
        eslintrc: {
          enabled: false, // 是否自动生成 eslint 规则，建议生成之后设置 false 
          filepath: "./.eslintrc-auto-import.json", // 指定自动导入函数 eslint 规则的文件
        },
        dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"), // 指定自动导入函数TS类型声明文件路径
      }),
      //指定components文件夹下面的组件，自动导入项目中
      Components({
        dts: path.resolve(pathSrc, "types", "components.d.ts"), // 指定自动导入组件TS类型声明文件路径
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    },
    // server:{
    //   port: Number(env.VITE_APP_PORT),
    //   open:true,
    //   //开启代理服务器 http://127.0.0.1:5173/users/getAccountList2
    //   //访问路径：http://127.0.0.1:5173/apis/users/getAccountList2
    //   proxy:{
    //     [env.VITE_APP_BASE_URL]:{
    //       target:env.VITE_APP_SERVER_PATH,
    //       changeOrigin:true,
    //       rewrite:path=>path.replace(new RegExp("^"+env.VITE_APP_BASE_URL),"")
    //     }
    //   }
    // }
  }
})

