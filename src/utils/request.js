import axios from "axios";
import store from "@/store";
import qs from 'qs'

// axios.defaults.timeout = 180000
// axios.defaults.baseURL = process.env.VUE_APP_API_HOST
// axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = 'application/json'
const service = axios.create({
    baseURL: process.env.VUE_APP_API_HOST,
    // baseURL: 'http://47.99.105.64:8080/api/v1/plum',
    // timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // if(store.getters.token){
        //     // 如果 token 存在，就在这里注入 token
        //     config.headers.Authorization = `Bearer ${store.getters.token}`
        // }
        // if(config.method === 'post'){
        //     config.data = qs.stringify(config.data);
        // }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response) =>{
        console.log("abcn")
        const{success, message, data, code} = response.data
        console.log('success', success)
        console.log('message', message)
        console.log('data', data)
        console.log('code', code)
        if(success){
            return data
        }else{
            // 错误逻辑
            return Promise.reject(message)
        }
    },
    (error) => {
        console.log("adadboadbow", error)
        if(
            error.response &&
            error.response.data &&
            error.response.data.code === 401
        ){
            // 调用超时
            store.dispatch('user/logout')
        }
        // todo: 提示错误信息
        // $message('error', error.response.data.message)
        return Promise.reject(error)
    }
)

export default service