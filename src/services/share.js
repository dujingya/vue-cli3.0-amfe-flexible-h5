import wx from 'weixin-js-sdk'
import store from 'store'
export default {
  install (Vue, opt) {
    console.log(opt)
    Vue.prototype.share = function (data) {
      if (!data.imgUrl) {
        data.imgUrl = 'https://lk-upload-pro.oss-cn-beijing.aliyuncs.com/b12e9d71-4908-4118-a7ec-76243eca70ca.jpg'
      }
      if (!data.title) {
        data.title = '智能评估'
      }
      if (!data.desc) {
        data.desc = '简单高效！一次测评，多种慢性病风险全掌握！'
      }
      wx.ready(function () {
        let url = data.url || store.get('indexUrl') || window.location.href
        // console.log(url, 90000000000)
        url = url.split('#')
        let url1 = url[1]
        let url0 = url[0]
        url0 = url0.split('?')[0]
        let resUrl = url0 + '#' + url1
        console.log('url------', data, data.url, url, resUrl)
        url = encodeURI(resUrl)
          /* 分享到朋友 圈 */
        wx.onMenuShareTimeline({
          imgUrl: data.imgUrl,
          title: data.title,
          desc: data.desc,
          link: url
        })
        wx.onMenuShareAppMessage({
          imgUrl: data.imgUrl,
          title: data.title,
          desc: data.desc,
          link: url,
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户点击了分享后执行的回调函数
          }
        })
      })
    }
    Vue.prototype.scrollYPosition = function (position) {
      let scrollPosition = 0
      if (position) {
        scrollPosition = position
      }
      setTimeout(() => {
        //  console.log('scrollPosition', scrollPosition)
        document.body.scrollTop = scrollPosition
        // 兼容google chrome
        document.documentElement.scrollTop = scrollPosition
      }, 5)
    }
  }
}
