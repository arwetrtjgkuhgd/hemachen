import requset from "../utilis/request.js"

// 获取题库列表信息
export function questionList(params) {
    return requset({
        url: "/question/list",
        method: "get",
        params
    })
}

// 修改题库状态。启用或者禁用账号
export function questionStatus(data) {
    return requset({
        url: "/question/status",
        method: "post",
        data
    })
}

// 题库添加
export function questionAdd(data) {
    return requset({
        url: "/question/add",
        method: "post",
        data
    })
}

// 题库编辑
export function questionEdit(data) {
    return requset({
        url: "/question/edit",
        method: "post",
        data
    })
}

// 题库删除
export function questionRemove(data) {
    return requset({
        url: "/question/remove",
        method: "post",
        data
    })
}