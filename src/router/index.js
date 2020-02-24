import Vue from "vue"
import VueRouter from "vue-router"

// 导入登录页面的组件
import login from "../views/login/index.vue"
import index from "../views/index/index.vue"
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: login
        },
        {
            path: "/index",
            component: index
        }
    ]
})

export default router