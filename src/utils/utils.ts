import shal from 'sha1'
import { Base64 } from 'js-base64'
import qs from 'qs'
// import { baseUrl } from './url'
import { Toast, Notify } from 'vant'
import store from 'store'
import { http } from '../axios/http'
import * as API from '../axios/api'
const util = {
    deep: (params: any) => {// 深拷贝
        if (params === '') { return ''; }
        let obj = {};
        obj = JSON.parse(JSON.stringify(params));
        return obj;
  },
};
// 1 接口请求添加签名加密
export const doSignToken = (url: string, appKey: string, appSecret: string, doSignTokenData: any) => {
    // 如果是GET 请求需要把参数也要拼到url后面
    if (doSignTokenData) {
        url = `${url}?${qs.stringify(doSignTokenData)}`
    }
    let date = new Date()
    let timestamp = date.getTime()
    let appkeyStr = appKey || ''
    let appSecretStr = appSecret || '' // 获取appSecret
    let sing = url + appSecretStr + timestamp
    let shalStr = shal(sing)
    let tokenStr = Base64.encode(`${appkeyStr}:${timestamp}:${shalStr}`)
    return `Bearer ${tokenStr}`
}
// 3.判断当前运行环境是不是微信
export const IsWX = () => {
    return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
}

// 4.获取参数
export const getUrlParam = (name: string) => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let regRewrite = new RegExp('(^|/)' + name + '/([^/]*)(/|$)', 'i')
    let r = window.location.search.substr(1).match(reg)
    let q = window.location.pathname.substr(1).match(regRewrite)
    if (r != null) {
        return unescape(r[2])
    } else if (q != null) {
        return unescape(q[2])
    } else {
        return null
    }
}

// 5.微信登录，后端调用微信API登录后，直接调用后端接口就行
export const wxLogin = (cb: any, that: any) => {
    let paramsCode = this.getUrlParam('code')
    const code = sessionStorage.getItem('code')
    let shareCode = this.$route.query.shareCode
    if (!paramsCode && !code) {
        let url = location.href.split('#')
        let url1 = url[1]
        let url0 = url[0]
        url0 = url0.split('?')[0]
        let resUrl = url0 + '#' + url1
        let encodUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a92fdf84e241fcf&redirect_uri=' + encodeURIComponent(resUrl) + '&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1 #wechat_redirect'
        window.location.replace(encodUrl)
    } else if (!code) {
        // if (_this.isLoading) {
        //   return
        // }
        this.isLoading = true
        sessionStorage.setItem('code', paramsCode)
        let params = JSON.stringify({
            logincode: paramsCode,
            ip: sessionStorage.getItem('ip'),
            shareCode
        })
        http({
            baseUrl: API.AuthorizeUrl,
            url: API.wxWebLogin,
            method: 'POST',
            params
        }, (res) => {
            console.log('请求结果=======')
            this.isLoading = false
            if (res && res.data && res.data.c === 2000) {
                let date = new Date()
                let oldTime = date.getTime()
                store.set('storeTime', oldTime)
                let resData = res.data.d
                this.userId = resData.userId
                this.userInfo = resData
                this.userId = resData.userId
                this.userToken = resData.UserToken
                this.avatarUrl = resData.wxheadImgUrl
                this.nickName = resData.nickName
                // this.gender = resData.gender || '2'
                store.set('userInfo', resData)
                store.set('userId', resData.userId)
                // store.set('gender', resData.gender + '')
                store.set('userToken', resData.UserToken)
                store.set('avatarUrl', resData.wxheadImgUrl)
                store.set('nickName', resData.nickName)
                // let url = `${window.location.host}${window.location.pathname}`
                store.set('fetchServiceUrl', API.fetchServiceUrl)
                this.getGender()
                if (cb && typeof cb === 'function') {
                    cb()
                }
            } else {
                toastMsg(res, this, API.wxWebLogin)
                sessionStorage.removeItem('code')
            }
        }, (err) => {
            console.log(err)
        })
    }
}

// 6.获取ul容器当前已滚动的高度
export const getScrollTop = (that: any) => {
    return that.$refs.viewBox.scrollTop
}

// 7.获取当前可视范围的高度
export const getClientHeight = () => {
    let clientHeight = 0
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
    }
    return clientHeight
}

// 8.获取ul容器的高度
export const getScrollHeight = (that: any) => {
    return that.$refs.viewBox.scrollHeight
}
// 9.微信config授权, 通过接口请求返回 获取授权所需要的相关信息
export const configWX = (axios: any, wx: any) => {
    let windowUrl = decodeURI(decodeURI(window.location.href))
    let isWX = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
    if (!isWX) {
        return
    }
    // 配置微信 config信息
    let data
    if (windowUrl.split('#')[0]) {
        data = {
            url: windowUrl.split('#')[0]
        }
    } else {
        data = {
            url: windowUrl
        }
    }
    data.url = encodeURIComponent(data.url)
    // 获取授权信息
    axios({
        url: API.AuthorizeUrl + '/ftdw/wxAuth/getAuth',
        method: 'get',
        params: data,
        headers: {
            appkey: store.get('appKey')
        }
    }).then((res: any) => {
        if (res && res.data && res.data.c === 200) {
            let resData = res.data.d
            // store.set('getAuth', resData)
            wx.config({
                debug: false,
                appId: resData.appId,
                timestamp: resData.timestamp, // 时间戳
                nonceStr: resData.nonceStr, // 随机串
                signature: resData.signature, // 必填，签名，
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ] // 必填，需要使用的JS接口列表
            })
        } else {
            toastMsg(res, this, '/wxpublic/ftdw/wxAuth/getAuth')
        }
    }).catch((err: any) => {
        console.log('err--getAuth', err)
    })
}
// 10 错误提示
export const toastMsg = (res: any, that: any, url: string) => {
    let status = ''
    if (res && res.status) {
        status = res.status
    }
    if (res && res.data && (res.data.message || res.data.msg || res.data.m)) {
        // 因接口参数或是服务器错误导致的报错信息(带有message或msg的响应信息)
        let msg = res.data.message || res.data.msg || res.data.m
        sessionStorage.setItem('errUrl', url + ':' + status + ':' + msg)  // 缓存报错的接口
        Toast({
            // message: `${url}\ncode:` + status + ';' + msg,
            message: msg,
            duration: 3000
        })
    } else if (res && res.data) { // 缺少appkey或是appSecret或userId错误以及网关相关报错信息
        sessionStorage.setItem('errUrl', url + ':' + status + ':' + res.data) // 缓存报错的接口
        Toast({
            // message: `${url}\ncode:` + status + ';' + res.data,
            message: res.data,
            duration: 3000
        })
    } else { // 其他未知报错信息
        console.log('出现断网提示界面=====================')
        that.loadError = true
        // Toast({
        //   message: `${url}\ncode:` + status + '; 网络不给力，请点击重试',
        //   duration: 3000
        // })
    }
}
export const notifyMsg = () => {
    Notify({
        type: 'success',
        message: '保存成功',
        duration: 1000,
        background: '#51B79C'
    })
}
export const requestUserInfo = (userId: string, that: any) => {
    return new Promise((resolve, reject) => {
        let param = {
            data: {},
            userId
        }
        http({
            baseUrl: API.baseUrl,
            url: API.getUserBaseInfo,
            method: 'POST',
            params: JSON.stringify(param)
        }, (res: any) => {
            that.isLoading = false
            let result = res && res.data || ''
            if (result && result.code === 20000) {
                let rData = result.data
                let gender = rData.gender
                resolve(gender)
            } else {
                toastMsg(res, that, API.getUserBaseInfo)
                reject(0)
            }
        }, (err: any) => {
            console.log(err, 1111111)
            reject(0)
        })
    })
}

export const getThemeColor = (that: any) => {
    let theme = that.$route.query.theme
    if (theme === '1') {
        // 蓝色
        return '#347FFF'
    } else if (theme === '2') {
        // 绿色
        return '#33C09B'
    } else {
        // 白色
        return '#33C09B'
    }
}
// 状态码的错误集合
// RequestNoAppkey        = 40001 // 请求缺失 appkey
// RequestInvalidAppkey   = 40002 // 请求 appkey 无效
// ServerStoped           = 40003 // 服务已停止
// NoMatchApi             = 40004 // 未找到匹配的接口
// NoServer               = 40005 // 未找到接口配置的服务
// RewriteNotMatch        = 40006 // 接口 URL 重写不匹配
// AuthSignMiss           = 40007 // 未找到签名信息
// AuthParseSignErr       = 40008 // 签名信息解析失败
// AuthSignTimeout        = 40009 // 签名信息失效
// AuthSignAppkeyNotMatch = 40010 // 签名 appkey 与请求头 appkey 不匹配
// AuthSignAppkeyInvalid  = 40011 // 签名 appkey 无效
// AuthSignInvalid        = 40012 // 签名信息无效
// UpstreamServerErr      = 40013 // 请求上游服务器错误
// TargetIPInBL           = 40014 // 请求 IP 命中黑名单
// CircuitClose           = 40015 // 熔断器：资源处于封闭状态
// CircuitHalfLimited     = 40016 // 熔断器：资源是电路的一半，流量限制
// QPSLimited             = 40017 // 最大 QPS 限制
// AppQPSLimited          = 40018 // App 最大 QPS 限制
// ValidationFailure      = 40019 // 验证失败
// TargetIPNoInWL         = 40020 // 请求 IP 不在白名单中

export default util;
