import axios from "axios"
import { getToken } from "@/utilis/token.js";

let enterpriseRequset = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})
// 添加请求拦截器
enterpriseRequset.interceptors.request.use(function (config) {
    config.headers.token = getToken();
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

// 获取企业列表信息
export function enterpriseList(params) {
    return enterpriseRequset({
        url: "/enterprise/list",
        method: "get",
        params
    })
}

// 修改企业状态。启用或者禁用账号
export function enterpriseStatus(data) {
    return enterpriseRequset({
        url: "/enterprise/status",
        method: "post",
        data
    })
}

// 企业添加
export function enterpriseAdd(data) {
    return enterpriseRequset({
        url: "/enterprise/add",
        method: "post",
        data
    })
}

// 企业编辑
export function enterpriseEdit(data) {
    return enterpriseRequset({
        url: "/enterprise/edit",
        method: "post",
        data
    })
}

// 企业删除
export function enterpriseRemove(data) {
    return enterpriseRequset({
        url: "/enterprise/remove",
        method: "post",
        data
    })
}