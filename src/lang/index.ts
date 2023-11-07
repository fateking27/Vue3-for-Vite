import { createI18n } from "vue-i18n"
import enLocale from "./package/en"
import zhCnLocale from "./package/zh_cn"
const message = {
    "zh_cn": {
        ...zhCnLocale
    },
    en: {
        ...enLocale
    }
}
const i18n = createI18n({
    legacy:false,
    locale:"zh_cn",
    messages:message
})
export default i18n