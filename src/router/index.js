import Vue from "vue"
import VueRouter from "vue-router"
// 
import NProgress from "nprogress"
import "nprogress/nprogress.css"

// 注册页面的组件
import login from "../views/login/index.vue"
// 登录页面的组件
import index from "../views/index/index"
// 数据概览
import chart from "../views/index/chart/chart.vue"
// 用户列表
import user from "../views/index/user/user.vue"
// 题库列表
import question from "../views/index/question/question.vue"
// 企业列表
import enterprise from "../views/index/enterprise/enterprise.vue"
// 学科列表
import subject from "../views/index/subject/subject.vue"
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: login
        },
        {
            path: "/index",
            component: index,
            children: [
                // 数据概览
                { path: "chart", component: chart, },
                // 用户列表
                { path: "user", component: user, },
                // 题库列表
                { path: "question", component: question, },
                // 企业列表
                { path: "enterprise", component: enterprise, },
                // 学科列表
                { path: "subject", component: subject, },
            ]
        }
    ]
})

// 
router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

// 
router.afterEach(() => {
    NProgress.done()
})





export default router