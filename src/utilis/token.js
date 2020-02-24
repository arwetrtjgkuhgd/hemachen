const TOKEN = "token"
// 设置token
export function getItem(token) {
    window.localStorage.getItem(TOKEN,token)
}
// 获取token
export function setItem(token) {
    window.localStorage.setItem(TOKEN,token)
}
// 删除token
export function removeItem(token) {
    window.localStorage.removeItem(TOKEN,token)
}