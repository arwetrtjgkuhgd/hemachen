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
// 暴露出去
export default [
    {
        path: "chart",
        component: chart,
        meta: {
            title: "数据概览",
            roles: ["超级管理员", "管理员"],
            icon: "el-icon-pie-chart"
        }
    },  // 数据概览
    {
        path: "user",
        component: user,
        meta: {
            title: "用户列表",
            roles: ["超级管理员", "管理员"],
            icon: "el-icon-user"
        }
    },  // 用户列表
    {
        path: "question",
        component: question,
        meta: {
            title: "题库列表",
            roles: ["超级管理员", "管理员", "老师", "学生"],
            icon: "el-icon-edit-outline"
        }
    },  // 题库列表
    {
        path: "enterprise",
        component: enterprise,
        meta: {
            title: "企业列表",
            roles: ["超级管理员", "管理员", "老师"],
            icon: "el-icon-office-building"
        }
    },  // 企业列表
    {
        path: "subject",
        component: subject,
        meta: {
            title: "学科列表",
            roles: ["超级管理员", "管理员", "老师", "学生"],
            icon: "el-icon-notebook-2"
        }
    },  // 学科列表
]