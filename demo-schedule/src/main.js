import { createApp } from 'vue'

import App from './App.vue'
//导入路由对象
import router from "./router/router.js"
import pinia from "./pinia.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//应用路由
const app=createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')
