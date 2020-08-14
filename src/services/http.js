import axios from 'axios'
import qs from 'qs'
// import { Toast } from 'vant'
import store from 'store'
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response || {})
})

const http = (options, callback) => {
  let method = options.method ? options.method.toUpperCase() : 'POST'
  console.log('appKey', store.get('appKey'))
  let appKey = store.get('appKey') || 'fPEPQ6jig'
  let headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'appKey': appKey
  }
  options.params = options.params || {}
  if (options.type && options.type.toUpperCase() === 'FORMDATA') {
    // 处理请求头
    headers['Content-Type'] = 'multipart/form-data'
    // 处理请求数据
    let formData = new FormData()
    for (let key in options.params) {
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
    method: method,
    data: method === 'POST' ? options.params : '',
    params: method === 'GET' ? options.params : '',
    withCredentials: false,
    transformRequest: [function (data) {
      if (options.type && options.type.toUpperCase() === 'FILE') {
        console.log('是FILE')
        let submitData = qs.stringify(data)
        return submitData
      } else {
        return data
      }
    }],
    headers: headers,
    timeout: 500 * 1000
  }).then(res => {
    if (callback && typeof callback === 'function') {
      callback(res)
    }
  })
}
export {
  http
}
