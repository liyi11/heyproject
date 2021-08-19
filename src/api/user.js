import request from '@/plugins/request.js'

//登录
export function pmsLogin(data) {
    return request({
        url: 'login',
        method: 'GET',
        data
    })
}
//注册
export function pmsRegister(data) {
    return request({
        url: 'login',
        method: 'POST',
        data
    })
}
//更新密码
export function updPassword(data) {
    return request({
        url: 'login',
        method: 'PUT',
        data
    })
}
//忘记密码
export function forgetPass(data) {
    return request({
        url: 'login',
        method: 'PATCH',
        data
    })
}
// export function pmsLogout(data) {
//     return request({
//         url: 'login',
//         method: 'POST',
//         data
//     })
// }

