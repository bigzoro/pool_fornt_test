import request from "@/utils/request";

// export const registerRequest = (data) =>{
//     return request({
//         url: '/user/register',
//         method: 'POST',
//         data:qs.stringify(data),
//         headers:{'Content-Type':'application/x-www-form-urlencoded'}
//     })
// }

export const registerRequest = (data) =>{
    return request({
        url: '/user/register',
        method: 'POST',
        data: data
    })
}