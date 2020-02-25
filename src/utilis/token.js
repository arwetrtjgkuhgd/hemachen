const TOKEN = "token"
// 设置token
export function getToken() {
    return window.localStorage.getItem(TOKEN)
}
// 获取token
export function setToken(token) {
    return window.localStorage.setItem(TOKEN, token)
}
// 删除token
export function removeToken() {
    window.localStorage.removeItem(TOKEN)
}