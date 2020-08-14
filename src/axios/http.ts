import axios from 'axios'
import store from 'store'
import qs from 'qs'
import { doSignToken } from '@/utils/utils'
// import { Toast } from 'vant'
axios.interceptors.request.use((config: any) => {
    // loading
    return config
}, (error: any) => {
    return Promise.reject(error)
})

axios.interceptors.response.use((response: any) => {
    return response
}, (error: any) => {
    console.log(error.response, 'error=======')
    return Promise.resolve(error.response)
})

// function checkStatus (response) {
//   // 如果http状态码正常，则直接返回数据
//   // if (response && (response.status === 200 || response.status === 304 || response.status === 400 || response.status === 500)) {
//   return response
//     // 如果不需要除了data之外的数据，可以直接 return response.data
//   // }
//   // 异常状态下，把错误信息返回去
//   // return {
//   //   status: -404,
//   //   msg: '网络异常'
//   // }
// }
//
// function checkCode (res) {
//   // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
//   // if (res && res.data && res.data.c === 20020) {
//   // }
//   return res
// }

// options.type 定义文传输格式  formData file 默认是json， 复杂的请求可以使用http 请求，简单的可以用下面的server请求
const http = (options, callback, failBack) => {
    let method = options.method ? options.method.toUpperCase() : 'POST'
    let appKey = store.get('appKey') || ''
    let appSecret = store.get('appSecret') || ''
    let Authorization = doSignToken(options.url, appKey, appSecret, '') || ''
    // let appSecret = '78cb693c-8308-4674-88dd-6835ea6666ff'
    let headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'appkey': appKey,
        'Authorization': Authorization
    }
    options.params = options.params || {}
    if (options.type && options.type.toUpperCase() === 'FORMDATA') {
        // 处理请求头
        headers['Content-Type'] = 'multipart/form-data'
        // 处理请求数据
        let formData = new FormData()
        for (let key of options.params) {
            formData.append(key, options.params[key])
        }
        options.params = formData
    } else if (options.type && options.type.toUpperCase() === 'FILE') {
        // 处理请求头
        headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    if (options.headers) {
        headers = Object.assign(headers, options.headers)
    }
    axios({
        url: options.baseUrl + options.url,
        method,
        data: method === 'POST' ? options.params : '',
        params: method === 'GET' ? options.params : '',
        withCredentials: false,
        transformRequest: [(data) => {
            if (options.type && options.type.toUpperCase() === 'FILE') {
                console.log('是FILE')
                let submitData = qs.stringify(data)
                return submitData
            } else {
                console.log('不是---是FILE')
                return data
            }
        }],
        headers,
        timeout: 120 * 1000
    }).then((res: any) => {
        if (callback && typeof callback === 'function') {
            callback(res)
        }
    }).catch((ex: any) => {
        if (failBack && typeof failBack === 'function') {
            // failBack(ex)
            callback(ex)
        }
    })
}
export {
    http
}
