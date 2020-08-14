import { Toast } from 'vant'
import store from 'store'
import * as API from '../services/url'
// 1错误提示
export const toastMsg = (res, _this, url) => {
  let status = ''
  if (res && res.status) {
    status = res.status
  }
  if (res && res.data && (res.data.message || res.data.msg || res.data.m)) { // 因接口参数或是服务器错误导致的报错信息(带有message或msg的响应信息)
    let msg = res.data.message || res.data.msg || res.data.m
    sessionStorage.setItem('errUrl', url + ':' + status + ':' + msg)  // 缓存报错的接口
    Toast({
      // message: `${url}\ncode:` + status + ';' + msg,
      message: msg,
      duration: 3000
    })
  } else if (res && res.data) { // 缺少appkey或是appSecret或userId错误以及网关相关报错信息
    sessionStorage.setItem('errUrl', url + ':' + status + ':' + res.data) // 缓存报错的接口
    let msg = ''
    if (Object.keys(res.data).length > 0) {
      let code = ''
      if (res.data.c) {
        code = res.data.c
      } else if (res.data.code) {
        code = res.data.code
      }
      msg = code + '：接口请求失败'
    } else {
      msg = res.data
    }
    Toast({
      // message: `${url}\ncode:` + status + ';' + res.data,
      message: msg,
      duration: 3000
    })
  } else { // 其他未知报错信息
    console.log('出现断网提示界面=====================')
    _this.loadError = true
    // Toast({
    //   message: `${url}\ncode:` + status + '; 网络不给力，请点击重试',
    //   duration: 3000
    // })
  }
}
export const checkParam = (param) => {
  console.log(param)
  if (param && param !== null && param !== 'null' && param !== 'undefind') {
    return true
  } else {
    return false
  }
}
export const hasChangeService = (_this) => {
  // 是否切换了环境
  if (store.get('userId')) {
    let fetchService = store.get('fetchServiceUrl')
    if (fetchService && fetchService === API.fetchServiceUrl) {
      // 那就是当前环境
      _this.userId = store.get('userId')
      _this.share({}) // 重置分享
    } else {
      store.remove('userId')
      store.remove('fetchServiceUrl')
      _this.userId = ''
    }
  }
}

export const getUrlParam = (name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r !== null) return unescape(r[2])
  return null
}

export const getThemeColor = (_this) => {
  let theme = _this.$route.query.theme
  if (theme === '1') {
    // 白色
    return {
      titleColor: '#1C1C1C',
      keduColor: '#888888',
      zhizhenColor: '#A2A2A2'
    }
  } else if (theme === '2') {
    // 绿色
    return {
      titleColor: '#fff',
      keduColor: '#fff',
      zhizhenColor: '#fff'
    }
  } else {
    // 蓝色
    return {
      titleColor: '#fff',
      keduColor: '#fff',
      zhizhenColor: '#fff'
    }
  }
}
