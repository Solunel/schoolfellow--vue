import {createRouter, createWebHashHistory} from 'vue-router'
// 导入组件
import Login from '../components/Login.vue'
import Regist from '../components/Regist.vue'
import ShowSchedule from '../components/ShowSchedule.vue'

import pinia from "../pinia.js"
import {defineUser} from "../store/userStore.js";

let sysUser = defineUser(pinia)

// 创建路由对象
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/ShowSchedule"
        },
        {
            path: "/login",
            component: Login
        }, {
            path: "/regist",
            component: Regist
        }, {
            path: "/ShowSchedule",
            component: ShowSchedule
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path == '/ShowSchedule') {
        if (sysUser.username == '') {
            next("/login")
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router