import axios from "axios"

// 用户验证码
export function sendSMS(data) {
    return axios({
        url: process.env.VUE_APP_URL + "/sendsms&t=" + Math.random() * 99,
        method: "post",
        data,
        withCredentials: true
    })
}

// 用户注册
export function register(data) {
    return axios({
        url: process.env.VUE_APP_URL + "/register",
        method: "post",
        data,
        withCredentials: true
    })
}