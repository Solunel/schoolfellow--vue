import { createApp } from 'vue'

import App from './App.vue'
//导入路由对象
import router from "./router/router.js"
import pinia from "./pinia.js";
//应用路由
const app=createApp(App)
app.use(router)

app.use(pinia)
app.mount('#app')
