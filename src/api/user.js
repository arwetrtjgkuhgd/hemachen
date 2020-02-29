import requset from "../utilis/request.js"

// 获取用户列表信息
export function userList(params) {
    return requset({
        url: "/user/list",
        method: "get",
        params
    })
}

// 修改用户状态。启用或者禁用账号
export function userStatus(data) {
    return requset({
        url: "/user/status",
        method: "post",
        data
    })
}

// 后台创建用户
export function userAdd(data) {
    return requset({
        url: "/user/add",
        method: "post",
        data
    })
}

// 用户编辑
export function userEdit(data) {
    return requset({
        url: "/user/edit",
        method: "post",
        data
    })
}

// 用户删除
export function userRemove(data) {
    return requset({
        url: "/user/remove",
        method: "post",
        data
    })
}

// 获取token
export function userToken(data) {
    return requset({
        url: "/token",
        method: "post",
        data
    })
}