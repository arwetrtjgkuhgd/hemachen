import requset from "../utilis/request.js"

// 获取学科列表信息
export function subjectList(params) {
    return requset({
        url: "/subject/list",
        method: "get",
        params
    })
}

// 修改学科状态。启用或者禁用账号
export function subjectStatus(data) {
    return requset({
        url: "/subject/status",
        method: "post",
        data
    })
}

// 学科添加
export function subjectAdd(data) {
    return requset({
        url: "/subject/add",
        method: "post",
        data
    })
}

// 学科编辑
export function subjectEdit(data) {
    return requset({
        url: "/subject/edit",
        method: "post",
        data
    })
}

// 学科删除
export function subjectRemove(data) {
    return requset({
        url: "/subject/remove",
        method: "post",
        data
    })
}