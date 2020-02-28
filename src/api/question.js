import axios from "axios"
import { getToken } from "@/utilis/token.js";

// 克隆
let questionRequset = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})
// 添加请求拦截器
questionRequset.interceptors.request.use(function (config) {
    config.headers.token = getToken();
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

// 获取题库列表信息
export function questionList(params) {
    return questionRequset({
        url: "/question/list",
        method: "get",
        params
    })
}

// 修改题库状态。启用或者禁用账号
export function questionStatus(data) {
    return questionRequset({
        url: "/question/status",
        method: "post",
        data
    })
}

// 题库添加
export function questionAdd(data) {
    return questionRequset({
        url: "/question/add",
        method: "post",
        data
    })
}

// 题库编辑
export function questionEdit(data) {
    return questionRequset({
        url: "/question/edit",
        method: "post",
        data
    })
}

// 题库删除
export function questionRemove(data) {
    return questionRequset({
        url: "/question/remove",
        method: "post",
        data
    })
}