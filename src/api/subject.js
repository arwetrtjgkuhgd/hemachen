import axios from "axios"
import { getToken } from "@/utilis/token.js";

let subjectRequset = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})
// 添加请求拦截器
subjectRequset.interceptors.request.use(function (config) {
    config.headers.token = getToken();
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

// 获取学科列表信息
export function subjectList(params) {
    return subjectRequset({
        url: "/subject/list",
        method: "get",
        params
    })
}

// 修改学科状态。启用或者禁用账号
export function subjectStatus(data) {
    return subjectRequset({
        url: "/subject/status",
        method: "post",
        data
    })
}