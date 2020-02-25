import axios from "axios";
import { getToken } from "@/utilis/token.js";

let indexRequest = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // headers: {
    //     token: getToken()
    // }
})
// 添加请求拦截器
indexRequest.interceptors.request.use(function (config) {
    config.headers.token = getToken();
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})
// 登录接口请求
export function info() {
    return indexRequest({
        url: "/info",
        method: "get"
    })
}
// 退出接口请求
export function logout() {
    return indexRequest({
        url: "/logout",
        method: "get"
    })
}