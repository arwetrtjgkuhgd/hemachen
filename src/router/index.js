import Vue from "vue"
import VueRouter from "vue-router"

import store from "../store/store.js"

// 页面跳转的进度条
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

import { info } from "@/api/index.js";
import { removeToken } from "@/utilis/token.js";
import { Message } from 'element-ui';

const router = new VueRouter({
    routes: [
        { path: "/login", component: login, meta: { title: "登录" } },
        { path: "/", redirect: login },
        {
            path: "/index",
            component: index,
            meta: { title: "首页" } ,
            children: [
                { path: "chart", component: chart, meta: { title: "数据概览" } },  // 数据概览
                { path: "user", component: user, meta: { title: "用户列表" } },  // 用户列表
                { path: "question", component: question, meta: { title: "题库列表" } },  // 题库列表
                { path: "enterprise", component: enterprise, meta: { title: "企业列表" } },  // 企业列表
                { path: "subject", component: subject, meta: { title: "学科列表" } },  // 学科列表
            ]
        }
    ]
})
// 导航守卫
// 进入前
// to: 要到哪里去
// from：从哪里来
// next()：放行

router.beforeEach((to, from, next) => {
    // console.log(to, from);
    NProgress.start()
    if (to.path == "/login") {
        next();  // 放行
    } else {
        info().then(res => {
            // 判断token
            if (res.data.code == 206) {
                // 提示
                Message.error("登录有异常，请重新登录");
                // 删除token
                removeToken();
                // 手动结束进度条
                NProgress.done();
                next("/login");
            } else {

                store.commit("changeUser", res.data.data.username)
                store.commit("changeAvatar", process.env.VUE_APP_URL + "/" + res.data.data.avatar)

                next();
            }
        });
    }
})

// 进入后
router.afterEach((to) => {
    NProgress.done()

    // 取出要去的页面的标签，设置给title
    document.title = to.meta.title;
})

export default router