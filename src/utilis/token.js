const TOKENVALUE = "token"
// 设置token
export function getToken() {
    return window.localStorage.getItem(TOKENVALUE);
}
// 获取token
export function setToken(token) {
    window.localStorage.setItem(TOKENVALUE, token);
}
// 删除token
export function removeToken() {
    window.localStorage.removeItem(TOKENVALUE)
}