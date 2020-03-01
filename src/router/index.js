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
// 导入子组件
import children from "@/utilis/children.js"

Vue.use(VueRouter)

import { info } from "@/api/index.js";
import { removeToken } from "@/utilis/token.js";
import { Message } from 'element-ui';

const router = new VueRouter({
    routes: [
        { path: "/login", component: login, meta: { title: "登录", roles: ["超级管理员", "管理员", "老师", "学生"] } },
        { path: "/", redirect: login },
        {
            path: "/index",
            component: index,
            meta: { title: "首页", roles: ["超级管理员", "管理员", "老师", "学生"] },
            children
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
            // console.log(res);
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
                // 如果是启用,那么就放行
                if (res.data.data.status == 1) {
                    // 取出数据存到vuex
                    store.commit("changeUser", res.data.data.username)
                    store.commit("changeAvatar", process.env.VUE_APP_URL + "/" + res.data.data.avatar)
                    store.commit("changeRoles", res.data.data.role)
                    // 如果是从登陆页过来的就提示用户
                    if (from.path == "/login") {
                        Message.success("登录成功");
                    }
                    // 判断meta里的roles数组是否包含一个元素
                    if (to.meta.roles.includes(res.data.data.role)) {
                        next();  // 包含就放行
                    } else {
                        //代表没有权限访问，就从哪来的就回到哪
                        Message.warning('该页面，你无权访问！')
                        NProgress.done();
                        next(from.path)

                    }
                } else {
                    Message.warning('账号被禁用，请与管理员联系')
                    NProgress.done();
                    next('/login')
                }
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