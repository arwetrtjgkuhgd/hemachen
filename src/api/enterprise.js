import requset from "../utilis/request.js"

// 获取企业列表信息
export function enterpriseList(params) {
    return requset({
        url: "/enterprise/list",
        method: "get",
        params
    })
}

// 修改企业状态。启用或者禁用账号
export function enterpriseStatus(data) {
    return requset({
        url: "/enterprise/status",
        method: "post",
        data
    })
}

// 企业添加
export function enterpriseAdd(data) {
    return requset({
        url: "/enterprise/add",
        method: "post",
        data
    })
}

// 企业编辑
export function enterpriseEdit(data) {
    return requset({
        url: "/enterprise/edit",
        method: "post",
        data
    })
}

// 企业删除
export function enterpriseRemove(data) {
    return requset({
        url: "/enterprise/remove",
        method: "post",
        data
    })
}